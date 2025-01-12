import { get } from "http";
import Location from "../models/Locations";
import axios from "axios";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const addLocation = async (data: {
  id: number;
  name: string;
  coordinates: { lat: number; lon: number };
  nickname?: string;
  notes?: string;
}) => {
  const newLocation = new Location({ ...data, _id: data.id });
  return await newLocation.save();
};

export const searchLocation = async (cityName?: string) => {
  let locations = [];
  if (!Boolean(cityName)) {
    locations = await Location.find();
  } else {
    locations = await Location.find({
      name: { $regex: cityName, $options: "i" },
    });
  }
  let locationNames = "";
  if (locations.length === 0) return [];
  for (const location of locations) {
    locationNames += location._id + ",";
  }
  locationNames = locationNames.slice(0, -1);
  const resp = await axios.get(
    `${process.env.OPEN_WEATHER_API_URL}${locationNames}&appid=${WEATHER_API_KEY}`
  );
  return resp.data.list.map((location: any, index: number) => ({
    id: locations[index]._id,
    name: location.name,
    coordinates: locations[index].coordinates,
    temperature: location.main.temp,
    condition: location.weather[0].main,
    nickname: locations[index].nickname,
    notes: locations[index].notes,
  }));
};

export const updateLocation = async (
  id: string,
  data: Partial<typeof Location>
) => {
  const updatedLocation = await Location.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedLocation) throw new Error("Location not found");
  return updatedLocation;
};

export const deleteLocation = async (id: string) => {
  const deletedLocation = await Location.findByIdAndDelete(id);
  if (!deletedLocation) throw new Error("Location not found");
};
