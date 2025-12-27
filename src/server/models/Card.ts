import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
	{
		word: {
			type: String,
			required: true,
			trim: true,
		},
		meaning: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Flashcard", flashcardSchema);
