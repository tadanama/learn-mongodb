import Note from "../model/notes.model.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.find({}); // Returns an array of documents
		res.status(200).json({ success: true, data: allNotes });
	} catch (error) {
		console.log("Error when fething notes:", error.message);
		res.status(500).json({ success: true, message: "Internal server error" });
	}
};

export const createNewNote = async (req, res) => {
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
		res.status(201).json({ success: true, data: newNote });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateNote = async (req, res) => {
	// Get the id of the note we trying to update
	const { id } = req.params;

	// Data to updte the note
	const note = req.body;

	console.log(Object.keys(note));
	console.log(note.constructor);

	// Return error if the req.body returns an empty object
	//// if (!note && Object.keys(note.length === 0 && note.constructor === Object))
	if (Object.keys(note).length === 0 && note.constructor === Object)
		return res.status(400).json({
			success: false,
			message: "Must provide data to update the note",
		});

	// Check if id is valid
	if (!mongoose.Types.ObjectId.isValid(id))
		return res
			.status(404)
			.json({ success: false, message: "Note do not exist" });

	// Update the note by id
	try {
		const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
		res.status(200).json({ success: true, data: updatedNote });
	} catch (error) {
		console.log("Error when updating note");
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteNote = async (req, res) => {
	// Get the note id
	const { id } = req.params;

	// Check if the id is valid in database
	if (!mongoose.Types.ObjectId.isValid(id))
		return res
			.status(404)
			.json({ success: false, message: "Note with given id do not exist" });

	// Delete note from database
	try {
		const result = await Note.findByIdAndDelete(id); // returns the deleted note document
		console.log("Result from query delete:", result);
		res
			.status(200)
			.json({
				success: true,
				message: "Deleted note successfully",
				data: result,
			});
	} catch (error) {
		console.log("Error deleting note:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
