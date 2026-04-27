import mongoose from "mongoose";


const connectDB = async () => {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
        throw new Error("MONGODB_URI is missing. Set it in your environment variables.");
    }

    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        if (uri.startsWith("mongodb+srv://")) {
            console.error(
                "MongoDB SRV lookup failed. If your host blocks SRV DNS queries, use a non-SRV connection string (mongodb://...) from MongoDB Atlas."
            );
        }
        throw error;
    }
}

export default connectDB;