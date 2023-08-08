import { useContext, useState } from "react";
import { GalleryContext } from "../Context/Gallery.context";

export function useGalleryContext() {
  const [showGallery, setShowGallery] = useState(false);

  const { images, uploading, handleImageUpload } = useContext(GalleryContext);

  const onClose = () => setShowGallery(false);

  return {
    images,
    uploading,
    handleImageUpload,
    onClose,
    showGallery,
  };
}
