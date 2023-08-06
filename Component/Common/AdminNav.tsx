import { NextPage } from "next";
import { FC, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../../assets/Logo";

import { IconType } from "react-icons";
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
interface PropsAdminNav {
  navItem: InNavIcon[];
}

const AdminNav: NextPage<PropsAdminNav> = (props) => {
  const [visible, setVisible] = useState(false);
  const navRev = useRef<HTMLElement | null>(null);
  const handleNavigation = () => {
    setVisible((prev) => {
      if (prev === false) {
        navRev.current?.classList.add("w-60");
        navRev.current?.classList.remove("w-12");
        return true;
      } else {
        navRev.current?.classList.remove("w-60");
        navRev.current?.classList.add("w-12");
        return false;
      }
    });
  };
  return (
    <nav
      ref={navRev}
      className="h-screen w-12 shadow-sm bg-colors-secondary-light dark:bg-colors-secondary-dark flex flex-col justify-between transition transition-width sticky top-0"
    >
      <div>
        {/* logo */}
        <Link href="/admin">
          <a className="flex items-center space-x-2 p-3">
            <Logo className="dark:fill-colors-highlight-dark fill-colors-highlight-light w-5 h-5" />
            <span className="dark:fill-colors-highlight-dark fill-colors-highlight-light text-xl font-semibold">
              {visible ? "Admin" : ""}
            </span>
          </a>
        </Link>
        {/* nav items */}
        <div className="space-y-4 mt-5 ">
          {props.navItem.map((nav) => (
            <NavIcon
              key={nav.desc}
              href={nav.href}
              Icon={nav.Icon}
              desc={nav.desc}
              toggle={visible}
            />
          ))}
        </div>
      </div>
      {/* nav toggler button */}
      <button
        onClick={handleNavigation}
        className="text-colors-highlight-light dark:text-colors-highlight-dark p-3 self-end min-w-fit"
      >
        {visible ? (
          <RiMenuFoldFill size={23} />
        ) : (
          <RiMenuUnfoldFill size={23} />
        )}
      </button>
    </nav>
  );
};
interface InNavIcon {
  href: string;
  Icon: IconType;
  desc: string;
  toggle?: boolean;
}
const NavIcon: FC<InNavIcon> = ({ href, Icon, desc, toggle }): JSX.Element => {
  return (
    <Link href={href}>
      <a className="flex  items-center dark:fill-colors-highlight-dark fill-colors-highlight-light text-xl p-3 hover:scale-[0.98] transition min-w-fit ">
        <Icon size={24} className="" />
        <span className="">{toggle ? desc : ""}</span>
      </a>
    </Link>
  );
};
export default AdminNav;
