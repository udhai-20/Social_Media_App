import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Model/user.js";

// RegisterUser
export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturepath,
      friends,
      location,
      occuption,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: passwordHash,
      location,
      occuption,
      picturepath,
      friends,
      viewedProfiles: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    console.log("    savedUser:", savedUser);
    res.status(200).send(savedUser);
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ error: e.message });
    throw new Error();
  }
};
//login user
export const login = async (req, res) => {
  try {
    const { emaill, password } = req.body;
    const user = await UserModel.findOne({ emaill });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECERTE);
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
//user get
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
// get friends
export const getFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => UserModel.findById(id))
    );
    const formatedfrnd = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id, firstname, lastname, occupation, location, picturepath };
      }
    );
    res.status(200).json(formatedfrnd);
  } catch (e) {
    req.status(400).json({ error: e });
  }
};
// update friends
export const addRemoveFriends = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    const user = await UserModel.findById(id);
    const friend = await UserModel.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => UserModel.findById(id))
    );
    const formatedfrnd = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturepath }) => {
        return { _id, firstname, lastname, occupation, location, picturepath };
      }
    );
    res.status(200).json(formatedfrnd);
  } catch (e) {
    req.status(400).json({ error: e });
  }
};
