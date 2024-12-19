import express from "express";
import {
	getAllNotes,
	createNewNote,
	updateNote,
	deleteNote,
} from "../controllers/notesController";

const router = express.Router();

// Getting all notes
router.get("/", getAllNotes);

// Creating a new note
router.post("/", createNewNote);

// Update a note
router.patch("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;
