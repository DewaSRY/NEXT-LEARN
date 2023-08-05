import { FC } from "react";
import Link from "next/link";
interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<Props> = (props): JSX.Element => {
  return (
    <>
      <Link href={`/Blogs/${props.slug}`}>
        <div className="p-5 rounded m-20 bg-green-100 cursor-pointer">
          <h1 className="text-gray-900 text-3xl font-semibold">
            {props.title}
          </h1>
          <p className="text-gray-500">{props.desc}</p>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
