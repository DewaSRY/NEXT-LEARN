import { NextPage } from "next";
import AdminNav from "../../Component/Common/AdminNav";
import {
  AiOutlineDashboard,
  AiOutlineMail,
  AiOutlineContainer,
  AiOutlineTeam,
} from "react-icons/ai";
interface Props {}
const NavItems = [
  {
    href: "/admin",
    Icon: AiOutlineDashboard,
    desc: "Dashboard",
  },
  {
    href: "/admin/posts",
    Icon: AiOutlineContainer,
    desc: "Posts",
  },
  {
    href: "/admin/users",
    Icon: AiOutlineTeam,
    desc: "Users",
  },
  {
    href: "/admin/comments",
    Icon: AiOutlineMail,
    desc: "Comments",
  },
];
const index: NextPage<Props> = () => {
  return (
    <div className="dark">
      <AdminNav navItem={NavItems} />
      hallo
    </div>
  );
};

export default index;
