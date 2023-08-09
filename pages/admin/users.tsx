import { NextPage } from "next";
import AdminLayout from "../../Component/Layout/AdminLayout";
interface PropsUsers {}

const users: NextPage<PropsUsers> = () => {
  return <AdminLayout>users</AdminLayout>;
};

export default users;
