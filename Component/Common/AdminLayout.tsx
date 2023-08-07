import { ReactNode, FC } from "react";
import AdminNav from "./AdminNav";
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
}

const AdminLayout: FC<PropsAdminLayout> = ({ children }) => {
  return (
    <div className=" flex ">
      <AdminNav navItem={NavItems} />
      <div className="flex-1 p-4">{children}</div>
      <Link href="/admin/post/create">
        <a className="bg-colors-primary-light dark:bg-colors-secondary-dark text-colors-highlight-light dark:text-colors-highlight-dark fixed z-10  right-10 bottom-10  p-3 rounded-full hover:scale-95 shadow-sm transition">
          <AiOutlineFileAdd size={25} />
        </a>
      </Link>
    </div>
  );
};

export default AdminLayout;
