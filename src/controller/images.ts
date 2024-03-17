import Image from "../models/image.model";
import { Request, Response } from "express";

export const getImages = async (req: Request, res: Response) => {
  const images = await Image.find().populate("projects");
  res.json(images);
};

export const getImage = async (req: Request, res: Response) => {
  const id = req.params.imagesId;
  try {
    const images = await Image.findById(id).populate("tags");
    if (images === null) {
      throw "Image not found";
    }
    res.status(200).json(images);
  } catch {
    res.status(404).send("Image not found");
  }
};

export const createImage = (req: Request, res: Response) => {


  const newImage = new Image({
    originalname: req.body.originalname,
    encoding: req.body.encoding,
    mimetype: req.body.mimetype,
    destination: req.body.destination,
    filename: req.body.filename,
    path: req.body.path,
    size: req.body.size,
    projects: req.body.projects,
  });
  newImage.save().then((image) => res.json(image));
};

export const updateImage = async (req: Request, res: Response) => {
  const id = req.params.imagesId;

  const updatedImage = {
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  };
  try {
    const images = await Image.findByIdAndUpdate(id, updatedImage, {
      returnNewDocument: true,
    });
  } catch {
    res.status(404).json("Image Not Found");
  }
};

export const deleteImage = (req: Request, res: Response) => {
  const id = req.params.imagesId;
  try {
    Image.deleteOne({ _id: id }).then(() =>
      res.status(200).json("Image deleted")
    );
  } catch {
    res.status(404).json("Can't find images to delete");
  }
};

export const deleteImages = (req: Request, res: Response) => {
  try {
    Image.deleteMany().then(() => res.status(200).json("Images deleted"));
  } catch {
    res.status(404).json("Can't find images to delete");
  }
};
