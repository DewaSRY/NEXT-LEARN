import { useContext, useState } from "react";
import { GalleryContext } from "../Context/Gallery.context";

export function useGalleryContext() {
  const { images, uploading, handleImageUpload, showGallery, toggleGallery } =
    useContext(GalleryContext);
  return {
    images,
    uploading,
    handleImageUpload,
    onClose: toggleGallery,
    showGallery,
  };
}
