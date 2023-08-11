import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import Editor, { FinalPost } from "../../../../Component/Editor";
import AdminLayout from "../../../../Component/Layout/AdminLayout";
import dbConnect from "../../../../lib/Mongooses";
import Post from "../../../../Models/posts";
import { generateFormData } from "../../../../Utils";

interface PostResponse extends FinalPost {
  id: string;
}
interface ServerSideResponse {
  post: PostResponse;
}
export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;
    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return { notFound: true };
    const { _id, meta, title, content, thumbnail, tags } = post;
    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          tags: tags.join(", "),
          thumbnail: thumbnail?.url || "",
          slug,
          meta,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }) => {
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (post: FinalPost) => {
    setUpdating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);
      // submit our post
      const { data } = await axios.patch("/api/posts/" + post.id, formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    setUpdating(false);
  };

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor
          initialValue={post}
          onSubmit={handleSubmit}
          busy={updating}
          btnTitle="Update"
        />
      </div>
    </AdminLayout>
  );
};

export default Update;
