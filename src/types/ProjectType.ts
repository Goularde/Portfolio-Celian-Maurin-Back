import { Types } from "mongoose";

export type ProjectType = {
  imagePath: string;
  title: string;
  description: string;
  tags: Types.ObjectId[];
  image: Types.ObjectId;
};
