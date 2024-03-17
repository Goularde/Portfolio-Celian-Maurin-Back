import { Schema, Types, model } from "mongoose";
import { ImageType } from "../types/ImageType";

const imageSchema = new Schema<ImageType>({
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  projects: [
    {
      type: Types.ObjectId,
      ref: "Project",
      required: false,
    },
  ],
});

const Image = model<ImageType>("Image", imageSchema);
export default Image;
