export const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Flashcard {
    _id: ID!
    word: String!
    meaning: String!
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
    getCards: [Flashcard]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createCard(word: String!, meaning: String!): Flashcard
    deleteCard(id: ID!): Boolean
  }
`;
