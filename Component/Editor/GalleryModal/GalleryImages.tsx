import { FC } from "react";
import Image from "next/image";
// import NextImage from "next/image";
import CheckMark from "../../Common/CheckMark";
type Props = {
  src: string;
  selected?: boolean;
  onClick?(): void;
};
const GalleryImages: FC<Props> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative rounded overflow-hidden cursor-pointer"
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt="gallery"
        objectFit="cover"
        className="bg-secondary-light hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default GalleryImages;
