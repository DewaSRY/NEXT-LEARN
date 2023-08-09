import { ReactNode, FC } from "react";
import AdminNav from "../Common/AdminNav";
import AppHead from "../Common/AppHead";
import Link from "next/link";

import {
  AiOutlineDashboard,
  AiOutlineMail,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineFileAdd,
} from "react-icons/ai";
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
interface PropsAdminLayout {
  children: ReactNode;
  title?: string;
}

const AdminLayout: FC<PropsAdminLayout> = ({ children, title }) => {
  return (
    <>
      <AppHead title={title} />
      <div className=" flex ">
        <AdminNav navItem={NavItems} />
        <div className="flex-1 p-4">{children}</div>
        <Link href="/admin/posts/create">
          <a className="bg-primary-light dark:bg-secondary-dark text-highlight-light dark:text-highlight-dark fixed z-10  right-10 bottom-10  p-3 rounded-full hover:scale-95 shadow-sm transition">
            <AiOutlineFileAdd size={25} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
