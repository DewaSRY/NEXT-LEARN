import { FC } from "react";
import { BsCardImage } from "react-icons/bs";
import GalleryImages from "./GalleryImages";
import { useGalleryContext } from "../../../Hooks";

interface Props {
  selectedImage?: string;
  onSelect(src: string): void;
}

const Gallery: FC<Props> = ({ selectedImage, onSelect }): JSX.Element => {
  const { images, uploading } = useGalleryContext();
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="basis-1/4 p-2 aspect-square flex flex-col items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse">
          <BsCardImage size={60} />
          <p>Uploading</p>
        </div>
      )}
      {images.map((img, index) => {
        return (
          <div key={index} className="basis-1/4 p-2">
            <GalleryImages
              src={img.src}
              selected={selectedImage === img.src}
              onClick={() => onSelect(img.src)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
