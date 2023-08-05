import { NextPage } from "next";
import { FC } from "react";
import Link from "next/link";
import Logo from "../../assets/Logo";
interface PropsAdminNav {
  navItem: InNavIcon[];
}

import { IconType } from "react-icons";

const AdminNav: NextPage<PropsAdminNav> = (props) => {
  return (
    <nav className="h-screen w-60 shadow-sm bg-colors-secondary-light dark:bg-colors-secondary-dark">
      {/* logo */}
      <Link href="/admin">
        <a className="flex items-center space-x-2 p-3">
          <Logo className="dark:fill-colors-highlight-dark fill-colors-highlight-light w-5 h-5" />
          <span className="dark:fill-colors-highlight-dark fill-colors-highlight-light text-xl font-semibold">
            Admin
          </span>
        </a>
      </Link>
      {/* nav items */}

      <div className="space-y-4 m-3">
        {props.navItem.map((nav) => (
          <NavIcon
            key={nav.desc}
            href={nav.href}
            Icon={nav.Icon}
            desc={nav.desc}
          />
        ))}
      </div>
      {/* nav toggler button */}
    </nav>
  );
};

export default AdminNav;

interface InNavIcon {
  href: string;
  Icon: IconType;
  desc: string;
}
const NavIcon: FC<InNavIcon> = ({ href, Icon, desc }): JSX.Element => {
  return (
    <Link href={href}>
      <a className="flex  items-center dark:fill-colors-highlight-dark fill-colors-highlight-light text-xl p-3 hover:scale-[0.98] transition">
        <Icon size={24} />
        <span className="">{desc}</span>
      </a>
    </Link>
  );
};
