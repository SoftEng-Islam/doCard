# Questions & Answers

**Why PostgreSQL?**

DoCard's core entities have clear relationships: users own decks, decks contain cards, categories organize content, and users have learning progress. A relational database gives you foreign keys, constraints, and transactions that are useful for maintaining consistency.

MongoDB is still a valid option, but I would avoid supporting both PostgreSQL and MongoDB in the same initial backend unless you have a concrete requirement.
