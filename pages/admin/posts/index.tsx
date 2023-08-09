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
          <Editor
            onSubmit={(post) => {
              console.log(post);
            }}
          />
        </AdminLayout>
      </GalleryProvider>
    </EditorProvider>
  );
};

export default index;
