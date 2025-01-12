import { Request, Response } from "express";
import { getWeatherByLocation } from "../services/weatherService";

export const getWeather = async (req: Request, res: Response) => {
  const { locationId } = req.params;
  const weatherData = await getWeatherByLocation(locationId);
  res.json(weatherData);
};
