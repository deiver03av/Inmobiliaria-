import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3
    },

    city: {
      type: String,
      required: true,
      minlength: 2
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 1
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 1
    },

    type: {
      type: String,
      required: true,
      minlength: 2
    }
  },
  {
    timestamps: true
  }
);

export const PropertyModel = mongoose.model("Property", propertySchema);
