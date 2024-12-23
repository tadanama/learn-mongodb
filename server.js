import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoute.js";
import cors from "cors";

// Enable environment variables
dotenv.config();

// Instantiate express
const app = express();
const port = process.env.PORT || 5000;

// Parse json data to req.body
app.use(express.json());

// Allow request from different origin
app.use(cors());

// Notes routes
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
	connectDB();
	console.log(`Server running on port ${port}`);
});
