import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  correo: string;
  password: string;
  rol: "admin" | "usuario";
}

const userSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: true,
      minlength: 2
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario"
    }
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);