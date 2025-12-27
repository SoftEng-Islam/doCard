const BASE = "http://localhost:3000/api/cards";

export default {
	async getCards() {
		const res = await fetch(BASE);
		return res.json();
	},

	async createCard(data) {
		const res = await fetch(BASE, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return res.json();
	},

	async deleteCard(id) {
		await fetch(`${BASE}/${id}`, { method: "DELETE" });
	},
};
