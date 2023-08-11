import { useState } from "react";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import InfiniteScrollPosts from "../Component/Common/InfiniteScrollPosts";
import { formatPosts, readPostsFromDb } from "../lib/utils";
import { PostDetail, filterPosts } from "../Utils";
import axios from "axios";
interface ServerSideResponse {
  posts: PostDetail[];
}
let pageNo = 0;
const limit = 9;
export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    const posts = await readPostsFromDb(limit, pageNo);
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Home: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(posts.length >= limit);
  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}`
      );
      if (data.posts.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return (
    <>
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls
        onPostRemoved={(post) =>
          setPostsToRender(filterPosts(postsToRender, post))
        }
      />
    </>
  );
};

export default Home;
