"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const weatherHistory_1 = __importDefault(require("../models/weatherHistory"));
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const getWeatherByLocation = (locationId) => __awaiter(void 0, void 0, void 0, function* () {
    const location = yield weatherHistory_1.default.findById(locationId).populate("locationId");
    if (!location)
        throw new Error("Location not found");
    const { coordinates } = location;
    const { lat, lon } = coordinates;
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const response = yield axios_1.default.get(weatherAPIUrl);
    const weatherData = response.data;
    // Save weather history
    const weatherHistory = new weatherHistory_1.default({
        locationId,
        weatherData,
    });
    yield weatherHistory.save();
    return weatherData;
});
exports.getWeatherByLocation = getWeatherByLocation;
