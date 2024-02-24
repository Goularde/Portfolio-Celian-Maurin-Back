import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
} from "../controller/projects";

const router = express.Router();

router.get("/", getProjects);

router.get("/:projectId", getProject);

router.post("/", createProject);

router.put("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

export default router;
