import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Group", groupSchema);
