import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect("mongodb+srv://alexbnicolae:Googlechrome1090@cluster0.m7cqcio.mongodb.net/?retryWrites=true&w=majority")

export default connectMongo;