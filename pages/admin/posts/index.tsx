import { NextPage } from "next";
import Editor from "../../../Component/Editor";
import AdminLayout from "../../../Component/Common/AdminLayout";
import { EditorProvider, GalleryProvider } from "../../../Context";
interface indexProps {}

const index: NextPage<indexProps> = () => {
  return (
    <EditorProvider>
      <GalleryProvider>
        <AdminLayout>
          <Editor />
        </AdminLayout>
      </GalleryProvider>
    </EditorProvider>
  );
};

export default index;
