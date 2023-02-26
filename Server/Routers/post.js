import express from "express";
import {
  getFeedPosts,
  createPosts,
  getUserPosts,
  likedPosts,
} from "../Controler/post.js";
import { protection } from "../Middleware/protector.js";

const router = express.Router();
//get
router.get("/", protection, getFeedPosts);

router.get("/:userId/posts", protection, getFeedPosts);
//update
router.patch("/:id/like", protection, likedPosts);

export default router;
