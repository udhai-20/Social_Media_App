import express from "express";
import {
  getFeedPosts,
  createPosts,
  getUserPosts,
  likedPosts,
} from "../Controler/post.js";
import { protection } from "../Middleware/protector.js";

const postrouter = express.Router();
//get
postrouter.get("/getpost", protection, getFeedPosts);

postrouter.get("/:userId/posts", protection, getFeedPosts);

//update
postrouter.patch("/:id/like", protection, likedPosts);

export default postrouter;
