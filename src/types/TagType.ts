import { Types } from "mongoose";

export type TagType = {
  color: String;
  title: String;
  projects?: Types.ObjectId[];
};
