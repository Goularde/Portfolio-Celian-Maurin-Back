import express from "express";
import {
  getImages,
  getImage,
  createImage,
  updateImage,
  deleteImage,
  deleteImages,
} from "../controller/images";

const router = express.Router();

router.get("/", getImages);

router.get("/:imageId", getImage);

router.post("/", createImage);

router.put("/:imageId", updateImage);

router.delete("/:imageId", deleteImage);

router.delete("/", deleteImages);

export default router;
