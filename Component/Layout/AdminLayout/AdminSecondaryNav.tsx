import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useDarkMode from "../../../Hooks/useDarkMode";
import DropdownOptions, { Option } from "../../Common/DropDownOption";

import ProfileHead from "../Nav-Utils/ProfileHead";
enum SearchBarStyle {
  inputStyle = "border-2 bg-transparent border-secondary-dark p-2 text-primary-dark dark:text-primary rounded focus:border-primary-dark dark:focus:border-primary outline-none transition",
}
const useOption = (): Option[] => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  return [
    {
      label: "Add new post",
      onClick: () => router.push("/admin/posts/create"),
    },
    {
      label: "Change theme",
      onClick: toggleTheme,
    },
    {
      label: "Log out",
      onClick: async () => await signOut(),
    },
  ];
};
interface SearchBarProps {}
interface AdminSecondaryNavProps {}

const SearchBar: FC<SearchBarProps> = (props): JSX.Element => {
  return (
    <input
      placeholder="search..."
      type="text"
      className={SearchBarStyle.inputStyle}
    />
  );
};

const AdminSecondaryNav: FC<AdminSecondaryNavProps> = (props): JSX.Element => {
  const options = useOption();
  return (
    <div className="flex items-center justify-between ">
      <SearchBar />
      <DropdownOptions
        Head={<ProfileHead nameInitial="J" />}
        option={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
