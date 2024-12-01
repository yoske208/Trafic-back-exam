import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

export interface IRoutes extends Document {
  routesID: ObjectId;
  lineNumber: string;
  name: string;
  stations: "station a" | "station b" | "station c";
  schedule: {
    departureTime: string;
    arrivalTime: string;
    station: string;
  };
  createdAT: Date;
  updatedAT: Date;
}

export const RoutesSchema = new Schema<IRoutes>({
  routesID: {
    type: String,
  },
  lineNumber: {
    type: String,
  },
  name: {
    type: String,
  },
  stations: {
    type: String,
    enum: ["station a", "station b", "station c"],
  },
  schedule: [
    {
      departureTime: {
        type: String,
      },
      arrivalTime: {
        type: String,
      },
      station: {
        type: String,
      },
    },
  ],
  createdAT: {
    type: Date,
  },

  updatedAT: {
    type: Date,
  },
});

RoutesSchema.index({routesID : 1})
export default mongoose.model<IRoutes>("Routes", RoutesSchema);

