import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const protection = (req, res, next) => {
  try {
    let token = req.header("Authorization").split(" ");
    console.log("    token:", token[1]);
    if (!token) return res.status(403).send("Access Denied");
    console.log(" token:", token, process.env.SECERTE);
    const verified = jwt.verify(token[1], process.env.SECERTE);
    req.user = verified;
    // console.log(" user:", req.user);
    next();
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};
