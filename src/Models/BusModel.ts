import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IUser } from "./UserModel";
import { IRoutes } from "./RoutesModel";

export interface IBus extends Document {
  busId: ObjectId;
  licencePlate: string;
  busModel: string;
  capacity: number;
  status: "in service" | "out of service" | "maintenance";
  driverID: IUser["_id"];
  routeID: IRoutes["_id"];

  createdAT: Date;
  updatedAT: Date;
}

const BusSchema = new Schema<IBus>(
  {
    busId: {
      type: String,
    },
    licencePlate: {
      type: String,
    },
    busModel: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["in service", "out of service", "maintenance"],
    },
    driverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAT: {
      type: Date,
    },

    updatedAT: {
      type: Date,
    },
  },
  { timestamps: true }
);

BusSchema.index({ busId: 1 });

export default mongoose.model<IBus>("Buses", BusSchema);
