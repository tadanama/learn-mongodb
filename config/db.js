import mongoose from "mongoose";
import dotenv from "dotenv";

// Enable environment variables
dotenv.config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE_URI);
		console.log("Connected to MongoDB");
		console.log(conn.connection.host);
	} catch (error) {
		console.log(error.message);
		process.exit(1);	//stop code execution
	}
};

export default connectDB;
