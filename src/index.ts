import express, { Express, Request, Response, json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import projects from "./routes/projects";
import tags from "./routes/tags";
import mongoose from "mongoose";
import multer from "multer";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/"});

app.use(cors());
app.use(urlencoded());
app.use(json());
app.use("/projects", projects);
app.use("/tags", tags);

app.post("/upload", upload.single("thumbnail"), (req, res) => {
  console.log(req.file);
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
