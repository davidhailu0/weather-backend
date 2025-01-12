import { Request, Response } from "express";
import {
  addLocation,
  updateLocation,
  deleteLocation,
  searchLocation as searchLocationService,
} from "../services/locationService";

export const createLocation = async (req: Request, res: Response) => {
  const locationData = req.body;
  const newLocation = await addLocation(locationData);
  res.status(201).json(newLocation);
};

export const searchLocation = async (req: Request, res: Response) => {
  const { city } = req.query;
  const updatedLocation = await searchLocationService(city as string);
  res.json(updatedLocation);
};

export const editLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const locationData = req.body;
  const updatedLocation = await updateLocation(id, locationData);
  res.json(updatedLocation);
};

export const removeLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteLocation(id);
  res.status(204).send();
};
