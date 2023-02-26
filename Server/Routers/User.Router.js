import express from "express";
const userRouter = express.Router();
import { protection } from "../Middleware/protector.js";
import {
  addRemoveFriends,
  getFriend,
  getUser,
  login,
} from "../Controler/user.ctrls.js";
userRouter.route("/login").post(login);
userRouter.route("/user/:id").get(protection, getUser);
userRouter.route("/user/:id/friends").get(protection, getFriend);
userRouter.route("/user/:id/friendsId").patch(protection, addRemoveFriends);
export default userRouter;
