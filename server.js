import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoute.js";

// Enable environment variables
dotenv.config();

// Instantiate express
const app = express();
const port = process.env.PORT;

// Parse json data to req.body
app.use(express.json());

// Notes routes
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
	connectDB();
	console.log(`Server running on port ${port}`);
});
