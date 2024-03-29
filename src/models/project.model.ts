import { Schema, Types, model } from "mongoose";
import { ProjectType } from "../types/ProjectType";

const projectSchema = new Schema<ProjectType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tag",
      required: false,
    },
  ],
  image: [{
    type: Types.ObjectId,
    ref: "Image",
    required: false,
  }],
});

const Project = model<ProjectType>("Project", projectSchema);
export default Project;
