import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../middleware/database';
import User from '../../../api/models/users.schema';
import client, { Channel, Connection } from 'amqplib'
import NextCors from 'nextjs-cors';

export default async function createUser(req: NextApiRequest, res: NextApiResponse){

    const { name, email } = req.body;

    try {
        console.log("Connecting to DB...");
        await connectMongo();
        console.log("Connected to DB...");

        const newId = await User
        .find({})
        .count() + 1

        const resUser = await User.create({
            email: email,
            name: name,
            userRefId: newId
        })

        const connection: Connection = await client.connect(
            'amqp://guest:guest@host.docker.internal:5672'    
        )
        // Create a channel
        const channel: Channel = await connection.createChannel()

        // Makes the queue available to the client
        await channel.assertQueue('UserChangesQueue')

        const rabbitMqUser = {
            operation: 1,
            id: resUser.userRefId,
            userName: resUser.name,
            emailAddress: resUser.email
        }

        //Send a message to the queue
        channel.sendToQueue('UserChangesQueue', Buffer.from(JSON.stringify(rabbitMqUser)))

        res.json({resUser});
    } catch (err: any) {
        console.log({err})
    }

}