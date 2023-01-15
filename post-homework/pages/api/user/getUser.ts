import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../middleware/database';
import User from '../../../api/models/users.schema';
import NextCors from 'nextjs-cors';

export default async function getUser(req: NextApiRequest, res: NextApiResponse){

    const { email } = req.body;


    try {
        console.log("Connecting to DB...");
        await connectMongo();
        console.log("Connected to DB...");
    
        const foundUser = await User.findOne({
            email: email
        })

        res.json({foundUser});

    } catch (err: any) {
        console.log(err)
    }
    
}

