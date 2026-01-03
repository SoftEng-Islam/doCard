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
		groupId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Flashcard", flashcardSchema);
