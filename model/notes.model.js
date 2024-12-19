import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		text: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

const Note = new mongoose.model("Note", noteSchema);

export default Note;
