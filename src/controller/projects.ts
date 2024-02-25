import Project from "../models/project.model";
import { Request, Response } from "express";
import { Types } from "mongoose";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find().populate("tags");
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const id = req.params.projectId;
  try {
    const project = await Project.findById(id).populate("tags");
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
  // const newProject = new Project({
    //   imagePath: "images/project-placeholder.svg",
  //   title: "EBT App",
  //   description:
  //     "Une application mobile faciliant l'ajout de billets pour le site eurobilltracker.com",
  //   tags: [{ color: "346fe1", title: "ReactJS" }],
  // });
  newProject.save().then((project) => res.json(project));
};

export const updateProject = async (req: Request, res: Response) => {
  const id = req.params.projectId;
  
  const updatedProject = {
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  };
  console.log(updatedProject);
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      updatedProject,
      { upsert: true, returnNewDocument: true }
    );

    //Ternary to check if there is one or many tags
    Array.isArray(req.body.tag)
      ? req.body.tags.forEach((tag: Types.ObjectId) => {
          project?.tags.push(tag);
          console.log(tag);
        })
      : project?.tags.push(req.body.tags);
    
  } catch {
    res.status(400).json("Project Not Found");
  }

};

export const deleteProject = (req: Request, res: Response) => {
  const id = req.params.projectId;
  try {
    Project.deleteOne({ _id: id }).then(() =>
      res.status(200).json("Project deleted")
    );
  } catch {
    res.status(400).json("Can't find project to delete");
  }
};
