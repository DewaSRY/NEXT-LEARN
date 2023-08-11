import { NextApiHandler } from "next";

import { isAuth } from "../../../lib/utils";
import Post from "../../../Models/posts";

export const config = {
  api: { bodyParser: false },
};
const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getPostsLikeStatus(req, res);
    default:
      res.status(404).send("Not found!");
  }
};
const getPostsLikeStatus: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  const { postId } = req.query as { postId: string };
  if (!postId) return res.status(422).json({ error: "Invalid post Id" });
  const post = await Post.findById(postId).select("likes");
  if (!post) return res.status(404).json({ error: "Posts not found" });
  const postsLike = post.likes || [];
  if (!user) {
    return res.json({
      likesCount: postsLike.length,
      likedByOwner: false,
    });
  } else {
    return res.json({
      likesCount: postsLike.length,
      likedByOwner: postsLike.includes(user?.id as any),
    });
  }
};

export default handler;
