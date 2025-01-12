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
exports.deleteLocation = exports.updateLocation = exports.searchLocation = exports.addLocation = void 0;
const Locations_1 = __importDefault(require("../models/Locations"));
const axios_1 = __importDefault(require("axios"));
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const addLocation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newLocation = new Locations_1.default(Object.assign(Object.assign({}, data), { _id: data.id }));
    return yield newLocation.save();
});
exports.addLocation = addLocation;
const searchLocation = (cityName) => __awaiter(void 0, void 0, void 0, function* () {
    let locations = [];
    if (!Boolean(cityName)) {
        locations = yield Locations_1.default.find();
    }
    else {
        locations = yield Locations_1.default.find({
            name: { $regex: cityName, $options: "i" },
        });
    }
    let locationNames = "";
    if (locations.length === 0)
        return [];
    for (const location of locations) {
        locationNames += location._id + ",";
    }
    locationNames = locationNames.slice(0, -1);
    const resp = yield axios_1.default.get(`${process.env.OPEN_WEATHER_API_URL}${locationNames}&appid=${WEATHER_API_KEY}`);
    return resp.data.list.map((location, index) => ({
        id: locations[index]._id,
        name: location.name,
        coordinates: locations[index].coordinates,
        temperature: location.main.temp,
        condition: location.weather[0].main,
        nickname: locations[index].nickname,
        notes: locations[index].notes,
    }));
});
exports.searchLocation = searchLocation;
const updateLocation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLocation = yield Locations_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    if (!updatedLocation)
        throw new Error("Location not found");
    return updatedLocation;
});
exports.updateLocation = updateLocation;
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedLocation = yield Locations_1.default.findByIdAndDelete(id);
    if (!deletedLocation)
        throw new Error("Location not found");
});
exports.deleteLocation = deleteLocation;
