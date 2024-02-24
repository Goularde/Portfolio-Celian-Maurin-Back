import express, { Express, Request, Response, json,urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import projects from "./routes/projects";
import tags from "./routes/tags";
import mongoose from "mongoose";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(urlencoded());
app.use(json());
app.use("/projects", projects);
app.use("/tags", tags);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

console.log("try to");

mongoose
  // .connect("mongodb://127.0.0.1:27017/portfolio")
  .connect("mongodb://mongodb/portfolio")
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
