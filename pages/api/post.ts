// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
export const readPostInfo = () => {
  const filePath = path.join(process.cwd(), "posts");
  const dir = fs.readdirSync(filePath);
  const data = dir.map((file) => {
    const filePath = path.join(process.cwd(), "posts/", file);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    return matter(fileContent).data;
  });
  return data;
};
const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      const data = readPostInfo();
      return res.json({
        post: data,
      });
    }
    default:
      return res.status(404).send(`${method} is invalid`);
  }
};

export default handler;
