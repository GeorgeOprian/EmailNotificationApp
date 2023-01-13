// Require Mongoose
import { model, models, Schema } from 'mongoose';

// Define a schema
const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            require: true,
            unique: true
        },
        userRefId: Number
    },
    { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;