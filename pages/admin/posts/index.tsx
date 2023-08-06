import { NextPage } from "next";
import Editor from "../../../Component/Editor";
import AdminLayout from "../../../Component/Common/AdminLayout";
interface indexProps {}

const index: NextPage<indexProps> = () => {
  return (
    <AdminLayout>
      <Editor />
    </AdminLayout>
  );
};

export default index;
