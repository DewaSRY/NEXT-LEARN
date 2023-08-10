import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useDarkMode from "../../../Hooks/useDarkMode";
import DropdownOptions, { Option } from "../../DropDownOption";

import ProfileHead from "../ProfileHead";
import SearchBar from "../SearchBar";

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push("/admin/posts/create");
  const handleLogOut = async () => await signOut();

  const options: Option[] = [
    {
      label: "Add new post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Change theme",
      onClick: toggleTheme,
    },
    {
      label: "Log out",
      onClick: handleLogOut,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <SearchBar />
      {/* options / profile head */}
      <DropdownOptions
        Head={<ProfileHead nameInitial="J" />}
        option={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
