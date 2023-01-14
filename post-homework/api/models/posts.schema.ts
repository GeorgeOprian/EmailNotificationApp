// Require Mongoose
import { model, models, Schema } from 'mongoose';

// Define a schema
const postSchema = new Schema(
    {
        userRef: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' ,
            unique: false
        },
        text: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

const Post = models.Post || model('Post', postSchema);

export default Post;