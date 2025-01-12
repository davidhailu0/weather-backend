import mongoose, { Schema, Document } from "mongoose";

interface ILocation extends Document {
  _id: number;
  name: string;
  coordinates: { lat: number; lon: number };
  nickname?: string;
  notes?: string;
}

const LocationSchema = new Schema<ILocation>(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    nickname: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILocation>("Location", LocationSchema);
