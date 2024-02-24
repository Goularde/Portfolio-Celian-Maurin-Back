import { Schema, model } from "mongoose";
import { TagType } from "../types/TagType";

const tagSchema = new Schema<TagType>({
  color: { type: String },
  title: { type: String },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
  ],
});

const Tag = model<TagType>("Tag", tagSchema);
export default Tag;
