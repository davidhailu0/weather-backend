"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationController_1 = require("../controllers/locationController");
const router = express_1.default.Router();
router.get("/", locationController_1.searchLocation);
router.post("/", locationController_1.createLocation);
router.get("/search", locationController_1.searchLocation);
router.put("/:id", locationController_1.editLocation);
router.delete("/:id", locationController_1.removeLocation);
exports.default = router;
