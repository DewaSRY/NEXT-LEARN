import { FC } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
interface Props {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}
const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
  busy,
}): JSX.Element => {
  const LikeIcon = liked ? <BsHeartFill color="#4790FD" /> : <BsHeart />;
  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex items-center space-x-2 outline-none"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" size={20} /> : LikeIcon}
      <span className="hover:underline">{label}</span>
    </button>
  );
};

export default LikeHeart;
