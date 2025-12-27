import Flashcard from "../models/Flashcard.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export const getCards = asyncHandler(async (req, res) => {
	const cards = await Flashcard.find().sort({ createdAt: -1 });
	res.json(cards);
});

export const createCard = asyncHandler(async (req, res) => {
	const { word, meaning } = req.body;

	if (!word || !meaning) {
		return res.status(400).json({
			error: "Word and meaning are required",
		});
	}

	const card = await Flashcard.create({ word, meaning });
	res.status(201).json(card);
});

export const deleteCard = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const card = await Flashcard.findByIdAndDelete(id);
	if (!card) {
		return res.status(404).json({ error: "Card not found" });
	}

	res.status(204).end();
});
