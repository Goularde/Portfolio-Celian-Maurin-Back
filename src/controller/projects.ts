import Project from "../models/project.model";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find().populate("tags").populate("image");
  projects
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const id = req.params.projectId;
  try {
    const project = await Project.findById(id)
      .populate("tags")
      .populate("image");
    if (project === null) {
      throw "Project not found";
    }
    res.status(200).json(project);
  } catch {
    res.status(404).send("Project not found");
  }
};

export const createProject = (req: Request, res: Response) => {
  const newProject = new Project({
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    // tags: req.body.tags,
  });
  newProject.save().then((project) => res.json(project));
};

export const updateProject = async (req: Request, res: Response) => {
  const id = req.params.projectId;

  const updatedProject = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    image: req.body.image,
  };
  try {
    const project = await Project.findByIdAndUpdate(id, updatedProject, {
      returnNewDocument: true,
    })
      .populate("tags")
      .populate("image");

    //Ternary to check if there is one or many tags
    Array.isArray(req.body.tag)
      ? req.body.tags.forEach((tag: Types.ObjectId) => {
          project?.tags.push(tag);
        })
      : project?.tags.push(req.body.tags);
    res.status(200).json(project);
  } catch {
    res.status(404).json("Project Not Found");
  }
};

export const deleteProject = (req: Request, res: Response) => {
  const id = req.params.projectId;
  try {
    Project.deleteOne({ _id: id }).then(() =>
      res.status(200).json("Project deleted")
    );
  } catch {
    res.status(404).json("Can't find project to delete");
  }
};
