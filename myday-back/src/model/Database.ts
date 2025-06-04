import mongoose from "mongoose";

export const connectToMongo = async () => {
    try {
        if (!process.env.MONGODB_URI) throw new Error("MONGO_URI manquant");
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DBNAME,
            user: process.env.MONGODB_USERNAME,
            pass: process.env.MONGODB_PASSWORD
        });
        console.log("Link to mongodb etablished");
    } catch (err) {
        console.error("Fail to connection mongodb", err);
        process.exit(1);
    }
};