import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../middleware/database';
import User from '../../../api/models/users.schema';
import NextCors from 'nextjs-cors';

export default async function editUser(req: NextApiRequest, res: NextApiResponse){

    const { name, email } = req.body;
    
    try {
        console.log("Connecting to DB...");
        await connectMongo();
        console.log("Connected to DB...");
    
        await User.findOneAndUpdate(
            {
                email: email
            },
            {
                name: name
            }
        )
        
        res.json(200);
    } catch (err: any) {
        res.json({err})
    }

}