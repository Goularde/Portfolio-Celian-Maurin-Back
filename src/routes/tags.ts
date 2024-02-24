import express from "express";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  getTag,
} from "../controller/tags";

const router = express.Router();

router.get("/", getTags);

router.get("/:tagId", getTag);

router.post("/", createTag);

router.put("/:tagId", updateTag);

router.delete("/:tagId", deleteTag);

export default router;
