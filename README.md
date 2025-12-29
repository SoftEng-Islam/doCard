# doCard 🎴

A modern, full-stack flashcard learning assistant built with a focus on speed, modularity, and a premium user experience.

## 🚀 Key Features

- **GraphQL API**: Powered by Apollo Server for efficient, typed data fetching.
- **Modern Frontend**: Built with Vue 3, Vite, and Apollo Client.
- **Feature-Based Architecture**: Modular frontend structure for high maintainability.
- **Secure Authentication**: JWT-based auth with `bcryptjs` password hashing.
- **Flashcard Management**: Create, view, and delete flashcards with a sleek UI.
- **Robust State Management**: Leveraging Pinia for reactive global state.

## 🛠️ Tech Stack

- **Frontend**: Vue 3, Apollo Client, Pinia, Vue Router, Tailwind CSS.
- **Backend**: Node.js, Express, Apollo Server (v3/v4).
- **Database**: MongoDB with Mongoose ODM.
- **Tools**: TypeScript, pnpm, Vite.

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd proj.doCard
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27018/docard  # Matches your local mongod port
    JWT_SECRET=your_super_secret_key
    ```

---

## 🏃 Running the Application

### 1. Start MongoDB
Ensure your MongoDB data and socket directories exist, then start the daemon:
```bash
mkdir -p mongodb-data mongodb-socket
mongod --dbpath ./mongodb-data --port 27018 --unixSocketPrefix ./mongodb-socket
```

### 2. Start the Development Server
In a new terminal window, run:
```bash
pnpm run dev
```
- **App**: [http://localhost:3000](http://localhost:3000)
- **Ruru GraphQL IDE**: [http://localhost:3000/ruru](http://localhost:3000/ruru)

---

## 📁 Project Structure

### Frontend (`src/client`)
The frontend follows a **Feature-Based Architecture** to keep the domain logic isolated and scalable.
- `features/auth`: Login, Registration, and User state.
- `features/cards`: Flashcard components and GraphQL services.
- `features/shared`: Reusable UI components (buttons, inputs), layout (header/footer), and global theme controllers.
- `pages`: Root view components (Dashboard, Home, Login).

### Backend (`src/server`)
- `graphql/`: Contains the GraphQL schema (`typeDefs.ts`), business logic (`resolvers.ts`), and Ruru setup (`index.ts`).
- `models/`: Mongoose schemas for Users and Cards.
- `middleware/`: Express middleware for authentication and logging.

---

## 🧪 Development Commands

- `pnpm run dev`: Starts Express and Vite in development mode (with HMR).
- `pnpm run build`: Compiles the frontend for production.
- `pnpm run lint`: Runs ESLint to check for code quality issues.

---

## 📜 Usage Tips

- **API Testing**: Use the Ruru IDE at `/ruru` to test queries like `getCards` or mutations like `login`. Set the endpoint to `/graphql` if not default.
- **Theme**: The application includes a premium theme controller found in `features/shared/themeController`.
- **Aliases**: Use `@/` to reference the `src/client` directory and `shared/` to reference the root shared folder.
