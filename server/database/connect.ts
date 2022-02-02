import mongoose from "mongoose";
import { mongo } from "../config";

const mongoURL: string = mongo.full_url;

const connectToMongoDB = async () => {
    try {
        console.log("connecting to mongoDB:", mongoURL);
        console.log(mongoURL);
        await mongoose.connect(mongoURL);
    } catch (err) {
        console.log(err);
    }
};

export default connectToMongoDB;
