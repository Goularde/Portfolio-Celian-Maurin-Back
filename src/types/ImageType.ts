import { Types } from "mongoose";

export type ImageType = {
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  projects: Types.ObjectId;
};
