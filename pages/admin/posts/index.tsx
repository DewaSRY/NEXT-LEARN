import { NextPage } from "next";
import Editor from "../../../Component/Editor";
import AdminLayout from "../../../Component/Common/AdminLayout";
import { EditorProvider } from "../../../Context/Editor.context";
interface indexProps {}

const index: NextPage<indexProps> = () => {
  return (
    <EditorProvider>
      <AdminLayout>
        <Editor />
      </AdminLayout>
    </EditorProvider>
  );
};

export default index;
