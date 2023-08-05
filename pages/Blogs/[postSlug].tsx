import {
  GetStaticProps,
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}
interface Posts {
  posts: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
}
export const getStaticProps: GetStaticProps<Posts> = async (context) => {
  const { params } = context;
  const { postSlug } = params as IStaticProps;
  try {
    const filePath = path.join(process.cwd(), "posts", postSlug + ".md");
    const blog = fs.readFileSync(filePath, { encoding: "utf-8" });
    const source = await serialize(blog, {
      parseFrontmatter: true,
    });
    const { title } = source.frontmatter;
    return {
      props: {
        posts: {
          content: source,
          title: title as string,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "posts");
  const dir = fs.readdirSync(filePath);
  const paths = dir.map((file) => {
    const filePath = path.join(process.cwd(), "posts/", file);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    return {
      params: {
        postSlug: matter(fileContent).data.slug,
      },
    };
  });
  //fall back options
  //false=> this will return 404 page for new unknow slug
  //blocking=> this will first see the slug it will try to
  //get the data and if there is the page it will hung the browser
  //first then try to generate ne page
  //true=>return the fake page for some time and once the data is
  //ready it will serve them page props
  return {
    paths,
    fallback: "blocking",
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading......</div>;
  }
  return (
    <div className="max-w-3xl mx-auto p-2">
      <h2 className="font-semibold text-2xl py-5"> {posts.title}</h2>
      <div className="prose pb-20">
        <MDXRemote {...posts.content} />
      </div>
    </div>
  );
};

export default SinglePage;
