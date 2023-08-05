import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import BlogCard from "../../Component/BlogCard";
import { BlogPost } from "../../Utils";
import { readPostInfo } from "../../lib/Healper";
export const getStaticProps = async () => {
  // const { post }: PostApi = await fetch("http://localhost:3000/api/post").then(
  //   (res) => res.json()
  // );
  const post = readPostInfo();
  return {
    props: {
      post: post,
    },
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;
const Blogs: NextPage<Props> = ({ post }) => {
  return (
    <div className="max-w-3xl mx-auto  space-y-5">
      {post.map((blog, id) => {
        return (
          <BlogCard
            key={id}
            title={blog.title}
            desc={blog.meta}
            slug={blog.slug}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
