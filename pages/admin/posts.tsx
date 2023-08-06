import { NextPage } from "next";

import AdminNav from "../../Component/Common/AdminLayout";

interface PropsPosts {}

const posts: NextPage<PropsPosts> = () => {
  return <AdminNav>it post</AdminNav>;
};

export default posts;
