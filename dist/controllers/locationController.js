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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLocation = exports.editLocation = exports.searchLocation = exports.createLocation = void 0;
const locationService_1 = require("../services/locationService");
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationData = req.body;
    const newLocation = yield (0, locationService_1.addLocation)(locationData);
    res.status(201).json(newLocation);
});
exports.createLocation = createLocation;
const searchLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.query;
    const updatedLocation = yield (0, locationService_1.searchLocation)(city);
    res.json(updatedLocation);
});
exports.searchLocation = searchLocation;
const editLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const locationData = req.body;
    const updatedLocation = yield (0, locationService_1.updateLocation)(id, locationData);
    res.json(updatedLocation);
});
exports.editLocation = editLocation;
const removeLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, locationService_1.deleteLocation)(id);
    res.status(204).send();
});
exports.removeLocation = removeLocation;
