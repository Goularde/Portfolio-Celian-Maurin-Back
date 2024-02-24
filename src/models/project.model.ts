import { Schema, Types, model } from "mongoose";
import { ProjectType } from "../types/ProjectType";

const projectSchema = new Schema<ProjectType>({
  imagePath: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tag",
      required: false,
    },
  ],
});

const Project = model<ProjectType>("Project", projectSchema);
export default Project;
