import { NextPage } from "next";
import AdminLayout from "../../Component/Common/AdminLayout";
interface Props {}
const index: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div> hallo its ad min</div>
    </AdminLayout>
  );
};

export default index;
