import mongoose from "mongoose";

async function connectDB() {
    try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      const msg = 'MONGO_URL environment variable is not defined. Create a .env.local file with MONGO_URL=your_connection_string';
      console.error(msg);
      throw new Error(msg);
    }

    await mongoose.connect(uri);
    console.log("MONGO DB connected SUCCESSFULLY");

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

     } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default connectDB;