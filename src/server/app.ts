import express from "express";
// import cors from "cors";
import cardsRoutes from "./routes/cards.routes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

// app.use(cors());
app.use(express.json());

app.use("/api/cards", cardsRoutes);

app.use(errorHandler);

export default app;
