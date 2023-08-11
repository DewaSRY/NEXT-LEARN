import Image from "next/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";
enum ProfileHeadStyle {
  profileContainer = "flex items-center flex-col",
  commonClasses = "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none ",
  lightProfile = "text-primary-dark bg-primary",
  DarkProfile = "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary ",
}
interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const ProfileHead: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? ProfileHeadStyle.lightProfile
      : ProfileHeadStyle.DarkProfile;
  }, [lightOnly]);

  return (
    <div className={ProfileHeadStyle.profileContainer}>
      {/* image / name initial */}
      <div className={ProfileHeadStyle.commonClasses + getStyle()}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="profile" />
        ) : (
          nameInitial
        )}
      </div>
      {/* down icon */}
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
