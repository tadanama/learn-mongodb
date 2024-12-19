import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Note from "./model/notes.model.js";

// Enable environment variables
dotenv.config();

// Instantiate express
const app = express();
const port = process.env.PORT;

// Parse json data to req.body
app.use(express.json());

// Route to get all notes
app.get("/api/notes", async (req, res) => {
	try {
		const allNotes = await Note.find({}); // Returns an array of documents
		res.status(200).json({ success: true, data: allNotes });
	} catch (error) {
		console.log("Error when fething notes:", error.message);
		res.status(500).json({ success: true, message: "Internal server error" });
	}
});

// Route to create notes
app.post("/api/notes", async (req, res) => {
	// Get the new note data
	const note = req.body;
	// Destructure the new note data to check if it is empty
	const { title, text } = note;

	if (!title || !text)
		return res
			.status(400)
			.json({ success: false, message: "All fields required." });

	// Create a new note document
	const newNote = new Note(note);
	console.log("note outside trc:", newNote); // returns the new note data with its _id

	// Save the new note to the database
	try {
		await newNote.save();
		console.log("note inside trc:", newNote); // returns the new note data with _id + createdAt and updatedAt timestamps
		res
			.status(201)
			.json({ success: true, message: "Successfully create new note" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

app.listen(port, () => {
	connectDB();
	console.log(`Server running on port ${port}`);
});
