import { ReactNode, FC } from "react";
import AdminNav, { NavOptions } from "../nav/AdminNav";

import AppHead from "../Common/AppHead";
import AdminSecondaryNav from "../nav/AdminSecondaryNav";
import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineMail,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineFileAdd,
} from "react-icons/ai";
enum AdminLayoutStyle {
  adminAnchor = "bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition",
  upperAdminLayout = "flex-1 p-4 dark:bg-primary-dark bg-primary",
}

const NavItems: NavOptions[] = [
  {
    href: "/admin",
    icon: AiOutlineDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/posts",
    icon: AiOutlineContainer,
    label: "Posts",
  },
  {
    href: "/admin/users",
    icon: AiOutlineTeam,
    label: "Users",
  },
  {
    href: "/admin/comments",
    icon: AiOutlineMail,
    label: "Comments",
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
        <AdminNav navItems={NavItems} />
        <div className={AdminLayoutStyle.upperAdminLayout}>
          <AdminSecondaryNav />
          {children}
        </div>
        {/* create button */}
        <Link href="/admin/posts/create">
          <a className={AdminLayoutStyle.adminAnchor}>
            <AiOutlineFileAdd size={24} />
          </a>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
