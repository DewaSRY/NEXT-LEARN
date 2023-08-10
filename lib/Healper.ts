// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { BlogData } from "../Utils";
// export const readPostInfo = () => {
//   const filePath = path.join(process.cwd(), "posts");
//   const dir = fs.readdirSync(filePath);
//   const data = dir.map((file) => {
//     const filePath = path.join(process.cwd(), "posts/", file);
//     const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
//     return matter(fileContent).data as BlogData;
//   });
//   return data;
// };
