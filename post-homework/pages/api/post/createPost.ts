import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../middleware/database';
import Post from '../../../api/models/posts.schema';
import mongoose from 'mongoose';
import client, { Channel, Connection } from 'amqplib';
import User from '../../../api/models/users.schema';
import NextCors from 'nextjs-cors';

export default async function createPost(req: NextApiRequest, res: NextApiResponse){


    const { userId, text } = req.body;
    const userRef = userId;
    try {
        console.log("Connecting to DB...");
        await connectMongo();
        console.log("Connected to DB...");
    
        await Post.create({
            userRef: userRef,
            text: text
        })

        const loggedUser = await User.findOne({
            _id: userRef
        })

        const allUsers = await User.find({ _id: { $ne: userRef } })

        const connection: Connection = await client.connect(
            'amqp://guest:guest@host.docker.internal:5672'    
        )
        // Create a channel
        const channel: Channel = await connection.createChannel()

        // Makes the queue available to the client
        await channel.assertQueue('EmailQueue')

        const rabbitMqEmail = {
            sender: 1,
            recipients: allUsers.map(m => m.userRefId) ,
            emailSubject: `New post from ${loggedUser.name}` ,
            emailBody: `${loggedUser.name} just posted!`
        }

        //Send a message to the queue
        channel.sendToQueue('EmailQueue', Buffer.from(JSON.stringify(rabbitMqEmail)))
        console.log("Email sent!...");


        res.json(200);
    } catch (err: any) {
        res.json({err});
    }

}