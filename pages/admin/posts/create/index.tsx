import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Editor, { FinalPost } from "../../../../Component/Editor";
import AdminLayout from "../../../../Component/Layout/AdminLayout";
import { generateFormData } from "../../../../Utils";
interface CreateProps {}

const Create: NextPage<CreateProps> = () => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      const formData = generateFormData(post);
      const { data } = await axios.post("/api/posts", formData);
      router.push("/admin/posts/update/" + data.post.slug);
    } catch (error: any) {
      console.error(error.response.data);
    }
    setCreating(false);
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor btnTitle="Submit" onSubmit={handleSubmit} busy={creating} />
      </div>
    </AdminLayout>
  );
};

export default Create;
