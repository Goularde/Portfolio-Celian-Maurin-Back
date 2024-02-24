import Tag from "../models/tag.model";
import { Request, Response } from "express";
import { TagType } from "../types/TagType";

export const getTags = async (req: Request, res: Response) => {
  const tags = await Tag.find();
  res.json(tags);
};

export const getTag = async (req: Request, res: Response) => {
  const id = req.params.tagId;
  try {
    const tag = await Tag.findById(id);
    res.send(tag);
    console.log(`sucessfully found tag with id : ${id}`);
  } catch {
    return res.status(404).send("Tag not found");
  }
  // res.json(tag);
};

export const createTag = (req: Request, res: Response) => {
  console.log(req.body);

  const newTag = new Tag<TagType>({
    color: req.body.color,
    title: req.body.title,
    // projects: req.body.projects,
  });
  console.log(newTag);

  // const newTag = new Tag<TagType>({
  //   color: "e8e8e8",
  //   title: "Greyact",
  //   projects: [],
  // });
  newTag.save().then((tag) => res.json(tag));
};

export const updateTag = (req: Request, res: Response) => {
  const id = req.params.tagId;
  const tag = Tag.findById(id);
  const updatedTag = {
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  };

  res.status(200).json("Tag updated");
};

export const deleteTag = (req: Request, res: Response) => {
  const id = req.params.tagName;
  Tag.deleteOne({ _id: id }).exec();
  res.status(200).json("Tag deleted");
};
