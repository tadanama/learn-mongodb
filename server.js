import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Enable environment variables
dotenv.config();

// Instantiate express
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
	connectDB();
	console.log(`Server running on port ${port}`);
});
