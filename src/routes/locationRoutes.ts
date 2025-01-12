import express from "express";
import {
  createLocation,
  editLocation,
  removeLocation,
  searchLocation,
} from "../controllers/locationController";

const router = express.Router();

router.get("/", searchLocation);
router.post("/", createLocation);
router.get("/search", searchLocation);
router.put("/:id", editLocation);
router.delete("/:id", removeLocation);

export default router;
