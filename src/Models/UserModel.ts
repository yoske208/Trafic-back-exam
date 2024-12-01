import mongoose, { Schema, Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  userId: ObjectId;
  userName: string;
  email: string;
  password: string;
  role: "admin" | "driver" | "passenger";
  createdAT: Date;
  updatedAT: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  userId: {
    type: String,
  },

  userName: {
    type: String,
    min: [6, "to shotrt"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    // תבנית בסיסית לבדיקת אימייל
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    min: [6, "password to short"],
  },
  role: {
    type: String,
    enum: ["admin", "driver", "passenger"],
  },

  createdAT: {
    type: Date,
  },

  updatedAT: {
    type: Date,
  },
});

UserSchema.pre<IUser>('save',async function(next) {
    if(!this.isModified('password')) return next()
  
    this.password = await bcrypt.hash(this.password,10)
    next()
  })
  UserSchema.index({userId : 1})
  
  UserSchema.methods.comparePassword = async function(userPassword:string) {
    return await bcrypt.compare(userPassword,this.password)
  }

  export default mongoose.model<IUser>("Users", UserSchema);

