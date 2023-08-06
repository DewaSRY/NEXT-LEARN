import { NextPage } from "next";
import AdminLayout from "../../Component/Common/AdminLayout";
interface PropsComments {}

const comments: NextPage<PropsComments> = () => {
  return <AdminLayout>comments</AdminLayout>;
};

export default comments;
