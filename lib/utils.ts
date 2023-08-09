import formidable from "formidable";
import { NextApiRequest } from "next";

interface FormidablePromise {
  files: formidable.Files;
  body: formidable.Fields;
  filePath: string;
}

export const readFile = (req: NextApiRequest): Promise<FormidablePromise> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log(err);
      if (err) reject(err);

      const imageFile = files.image[0] as any;
      const filePath = imageFile["filepath"];
      resolve({ files, body: fields, filePath });
    });
  });
};
