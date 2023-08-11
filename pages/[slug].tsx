import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import axios from "axios";
import parse from "html-react-parser";
import DefaultLayout from "../Component/Layout/DefaultLayout";
import dbConnect from "../lib/Mongooses";
import Post from "../Models/posts";
import Image from "next/image";
import dateFormat from "dateformat";
import Comments from "../Component/Comments";
import LikeHeart from "../Component/Comments/LikeHeart";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { signIn } from "next-auth/react";
import User from "../Models/User";
import AuthorInfo from "../Component/Common/AuthorInfo";
interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
    author: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: "/" } }],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const detailPost = await Post.findOne({ slug: params?.slug }).populate(
      "author"
    );
    if (!detailPost) return { notFound: true };
    const admin = await User.findOne({ role: "admin" });
    const authorInfo = (detailPost.author || admin) as any;
    const postsAuthor = {
      id: authorInfo._id,
      name: authorInfo?.name,
      avatar: authorInfo.avatar,
      message: `This posts is written by ${authorInfo.name} . ${
        authorInfo.name.split(" ")[0]
      } is an full stack JavaScript developer`,
    };

    return {
      props: {
        post: {
          ...detailPost,
          id: detailPost._id.toString(),
          thumbnail: detailPost.thumbnail?.url || "",
          createdAt: detailPost.createdAt.toString(),
          author: JSON.stringify(postsAuthor),
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const { id, title, content, tags, meta, thumbnail, createdAt } = post;
  const user = useAuth();

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;
    if (likedByOwner && count === 1) return "you ike this posts ";
    if (likedByOwner) return `you and ${count - 1} like this posts`;
    if (count === 0) return "like the posts";
    return count + "liked the posts";
  }, [likes]);
  const handleOnLikeClick = async () => {
    try {
      if (!user) return await signIn("github");
      const { data } = await axios.post(`/api/posts/update-like?postId={id}`);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios(`/api/posts/like-status?postId${id}`)
      .then(({ data }) =>
        setLikes({
          likedByOwner: data.likedByOwner,
          count: Number(data.likesCount),
        })
      )
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="lg:px-0 px-3">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail} alt={title} layout="fill" />
          </div>
        ) : null}
        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
          {title}
        </h1>
        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {tags.map((t, index) => (
            <span key={t + index}>#{t}</span>
          ))}
          <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
        <div className="py-10">
          <LikeHeart
            label={getLikeLabel()}
            onClick={handleOnLikeClick}
            liked={likes.likedByOwner}
          />
        </div>
        <div className="pt-10">
          <AuthorInfo profile={JSON.parse(post.author)} />
        </div>
        <Comments belongsTo={id} />
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;
