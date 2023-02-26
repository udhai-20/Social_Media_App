import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import connect from "./Config/db.js";
import { fileURLToPath } from "node:url";
// import userRouter from "./Routers/User.Router.js";
import { register } from "./Controler/user.ctrls.js";
import userRouter from "./Routers/User.Router.js";
import router from "./Routers/post.js";
import { users, posts } from "./Data/data.js";
import UserModel from "./Model/user.js";
import PostModel from "./Model/post.js";
import postrouter from "./Routers/post.js";

const port = process.env.PORT || 5000;
//configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ poluicy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assests", express.static(path.join(__dirname, "public/assets")));

// setup file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api/v1", userRouter);
app.use("/api/v1", postrouter);
app.post("/api/v1/register", upload.single("picture"), register);

//port running
app.listen(port, async () => {
  try {
    await connect;
    // UserModel.insertMany(users);
    // PostModel.insertMany(posts);
    console.log("listening on port", port);
  } catch (e) {
    console.log("error connecting", e);
  }
});
