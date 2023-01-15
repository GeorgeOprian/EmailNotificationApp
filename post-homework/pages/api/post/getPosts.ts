import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../middleware/database';
import Post from '../../../api/models/posts.schema';
import NextCors from 'nextjs-cors';

export default async function getPosts(req: NextApiRequest, res: NextApiResponse){


    try {
        console.log("Connecting to DB...");
        await connectMongo();
        console.log("Connected to DB...");
    
        const posts = await Post
        .find()
        .sort({createdAt: -1})
        .populate('userRef');

        res.json({posts});

    } catch (err: any) {
        res.json({err});
    }
    
}

