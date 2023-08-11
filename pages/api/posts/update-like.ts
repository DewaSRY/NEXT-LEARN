import { NextApiHandler } from "next";

import { isAuth } from "../../../lib/utils";
import Post from "../../../Models/posts";

export const config = {
  api: { bodyParser: false },
};
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      return updatePostLike(req, res);
    default:
      res.status(404).send("Not found!");
  }
};
const updatePostLike: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(401).json({ error: "you are no authorize" });
  const { postId } = req.query as { postId: string };
  if (!postId) return res.status(422).json({ error: "Invalid post Id" });
  const post = await Post.findById(postId).select("likes");
  if (!post) return res.status(404).json({ error: "Posts not found" });
  const oldLikes = post.likes || [];
  const likeBy = user.id as any;
  //unLike
  if (oldLikes.includes(likeBy)) {
    post.likes = oldLikes.filter(
      (like) => like.toString() !== likeBy.toString()
    );
  } else {
    //like posts
    post.likes = [...oldLikes, likeBy];
  }
  await post.save();
  return res.status(201).json({ newLikes: post.likes.length });
};

export default handler;
