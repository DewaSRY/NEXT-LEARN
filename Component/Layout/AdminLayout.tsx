import { ReactNode, FC } from "react";
import AdminNav from "../Common/AdminNav";
import AppHead from "../Common/AppHead";
import AdminSecondaryNav from "../Common/nav/AdminSecondaryNav";
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

const AdminLayout: FC<PropsAdminLayout> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex ">
        <AdminNav navItem={NavItems} />
        <div className="flex-1 p-4 dark:bg-primary-dark bg-primary">
          <AdminSecondaryNav />
          {children}
        </div>
        {/* create button */}
        <Link href="/admin/posts/create">
          <a className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition">
            <AiOutlineFileAdd size={24} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
