import axios from "axios";
import WeatherHistory from "../models/weatherHistory";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const getWeatherByLocation = async (locationId: string) => {
  const location = await WeatherHistory.findById(locationId).populate(
    "locationId"
  );
  if (!location) throw new Error("Location not found");

  const { coordinates } = location as any;
  const { lat, lon } = coordinates;

  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const response = await axios.get(weatherAPIUrl);
  const weatherData = response.data;

  // Save weather history
  const weatherHistory = new WeatherHistory({
    locationId,
    weatherData,
  });

  await weatherHistory.save();
  return weatherData;
};
