import mongoose, { Schema, Document } from "mongoose";

interface IWeatherHistory extends Document {
  locationId: mongoose.Types.ObjectId;
  weatherData: any; // Store the weather data as received from the API
  timestamp: Date;
}

const WeatherHistorySchema = new Schema<IWeatherHistory>(
  {
    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    weatherData: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IWeatherHistory>(
  "WeatherHistory",
  WeatherHistorySchema
);
