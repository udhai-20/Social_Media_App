import PostModel from "../Model/post.js";
import UserModel from "../Model/user.js";
//crete
export const createPosts = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await UserModel.findById(userId);
    const newPost = new PostModel({
      userId,
      firstName: user.firstname,
      lastName: user.lastname,
      location: user.location,
      description: description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await PostModel.find();
    res.status(201).json(post);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.find({ userId });
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const likedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await PostModel.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
