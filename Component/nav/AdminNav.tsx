import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import Logo from "../../assets/Logo";

enum AdminNavStyle {
  nav = "h-screen w-12 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0",
  logoAnchor = "flex items-center space-x-2 p-3 mb-10",
  logoIcon = "fill-highlight-light dark:fill-highlight-dark w-5 h-5",
  logoText = "text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none",
  navLinkIcon = "flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition",
  navToggleButton = "text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end",
}
export interface NavOptions {
  label: string;
  icon: IconType;
  href: string;
}
interface Props {
  navItems: NavOptions[];
}
interface NavItemProps extends NavOptions {
  visible: boolean;
}
const NavItem: FC<NavItemProps> = (props): JSX.Element => {
  return (
    <Link key={props.href} href={props.href}>
      <a className={AdminNavStyle.navLinkIcon}>
        <props.icon size={24} />
        {props.visible && (
          <span className="ml-2 leading-none">{props.label}</span>
        )}
      </a>
    </Link>
  );
};
const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
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
    <nav ref={navRev} className={AdminNavStyle.nav}>
      <div>
        <Link href="/admin">
          <a className={AdminNavStyle.logoAnchor}>
            <Logo className={AdminNavStyle.logoIcon} />
            {visible && <span className={AdminNavStyle.logoText}>Admin</span>}
          </a>
        </Link>
        <div className="space-y-6">
          {navItems.map((item, id) => {
            return (
              <NavItem
                key={id}
                icon={item.icon}
                visible={visible}
                href={item.href}
                label={item.label}
              />
            );
          })}
        </div>
      </div>
      <button
        onClick={handleNavigation}
        className={AdminNavStyle.navToggleButton}
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};
export default AdminNav;
