import Image from "next/image";
import { FC, useCallback } from "react";
enum ProfileIconStyle {
  commonClasses = "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none ",
  lightProfile = "text-primary-dark bg-primary",
  DarkProfile = "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary ",
}
interface Props {
  avatar?: string;
  nameInitial?: string;
  lightOnly?: boolean;
}
const ProfileIcon: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? ProfileIconStyle.lightProfile
      : ProfileIconStyle.DarkProfile;
  }, [lightOnly]);
  return (
    <div className={ProfileIconStyle.commonClasses + getStyle()}>
      {avatar ? (
        <Image src={avatar} layout="fill" alt="profile" />
      ) : (
        nameInitial
      )}
    </div>
  );
};

export default ProfileIcon;
