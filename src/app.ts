import express from "express";
import cors from "cors";
import "dotenv/config";
import locationRoutes from "./routes/locationRoutes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/v1/locations", locationRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
