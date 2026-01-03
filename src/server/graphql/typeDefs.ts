export const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Group {
    _id: ID!
    name: String!
    description: String
    cardCount: Int
    createdAt: String!
    updatedAt: String!
  }

  type Flashcard {
    _id: ID!
    word: String!
    meaning: String!
    groupId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String
    user: User
    success: Boolean!
    message: String
  }

  type Query {
    me: User
    getGroups: [Group]
    getGroup(id: ID!): Group
    getCards(groupId: ID): [Flashcard]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    createGroup(name: String!, description: String): Group
    updateGroup(id: ID!, name: String, description: String): Group
    deleteGroup(id: ID!): Boolean

    createCard(word: String!, meaning: String!, groupId: ID!): Flashcard
    deleteCard(id: ID!): Boolean
  }
`;
