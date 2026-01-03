import { apolloClient } from "@/apollo";
import { gql } from "@apollo/client/core";

const GET_GROUPS_QUERY = gql`
	query GetGroups {
		getGroups {
			_id
			name
			description
			cardCount
			createdAt
			updatedAt
		}
	}
`;

const GET_GROUP_QUERY = gql`
	query GetGroup($id: ID!) {
		getGroup(id: $id) {
			_id
			name
			description
			cardCount
			createdAt
			updatedAt
		}
	}
`;

const CREATE_GROUP_MUTATION = gql`
	mutation CreateGroup($name: String!, $description: String) {
		createGroup(name: $name, description: $description) {
			_id
			name
			description
			cardCount
			createdAt
			updatedAt
		}
	}
`;

const DELETE_GROUP_MUTATION = gql`
	mutation DeleteGroup($id: ID!) {
		deleteGroup(id: $id)
	}
`;

export default {
	async getGroups() {
		const { data } = await apolloClient.query<any>({
			query: GET_GROUPS_QUERY,
			fetchPolicy: "network-only",
		});
		return data.getGroups;
	},

	async getGroup(id: string) {
		const { data } = await apolloClient.query<any>({
			query: GET_GROUP_QUERY,
			variables: { id },
			fetchPolicy: "network-only",
		});
		return data.getGroup;
	},

	async createGroup(groupData: { name: string; description?: string }) {
		const { data } = await apolloClient.mutate<any>({
			mutation: CREATE_GROUP_MUTATION,
			variables: groupData,
		});
		return data.createGroup;
	},

	async deleteGroup(id: string) {
		await apolloClient.mutate({
			mutation: DELETE_GROUP_MUTATION,
			variables: { id },
		});
	},
};
