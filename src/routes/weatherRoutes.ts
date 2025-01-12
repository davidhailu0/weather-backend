import express from "express";
import { getWeather } from "../controllers/weatherController";

const router = express.Router();

router.get("/:locationId", getWeather);

export default router;
