import express, { Express, Request, Response, json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import projects from "./routes/projects";
import tags from "./routes/tags";
import images from "./routes/images";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(urlencoded());
app.use(json());
app.use("/projects", projects);
app.use("/tags", tags);
app.use("/images", images);
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("thumbnail"), (req, res) => {
  if (req.file === undefined) {
    return res.status(500).json({
      status: "error",
      message: "No file found in the request",
    });
  }
  return res.json(req.file);
});

mongoose
  // .connect("mongodb://127.0.0.1:27017/portfolio")
  .connect("mongodb://mongodb/portfolio")
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
