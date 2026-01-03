import { apolloClient } from "@/apollo";
import { gql } from "@apollo/client/core";

const GET_CARDS_QUERY = gql`
	query GetCards($groupId: ID) {
		getCards(groupId: $groupId) {
			_id
			word
			meaning
			groupId
			createdAt
			updatedAt
		}
	}
`;

const CREATE_CARD_MUTATION = gql`
	mutation CreateCard($word: String!, $meaning: String!, $groupId: ID!) {
		createCard(word: $word, meaning: $meaning, groupId: $groupId) {
			_id
			word
			meaning
			groupId
			createdAt
			updatedAt
		}
	}
`;

const DELETE_CARD_MUTATION = gql`
	mutation DeleteCard($id: ID!) {
		deleteCard(id: $id)
	}
`;

export default {
	async getCards(groupId?: string) {
		const { data } = await apolloClient.query<any>({
			query: GET_CARDS_QUERY,
			variables: { groupId },
			fetchPolicy: "network-only",
		});
		return data.getCards;
	},

	async createCard(cardData: { word: string; meaning: string; groupId: string }) {
		const { data } = await apolloClient.mutate<any>({
			mutation: CREATE_CARD_MUTATION,
			variables: cardData,
		});
		return data.createCard;
	},

	async deleteCard(id: string) {
		await apolloClient.mutate({
			mutation: DELETE_CARD_MUTATION,
			variables: { id },
		});
	},
};
