import Image from "next/image";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ActionButton from "../../Common/ActionButton";
import ModalContainer, { ModalProps } from "../../Common/ModalContainer";
import Gallery from "./Gallery";
import { useToolbarUtils, useGalleryContext } from "../../../Hooks";
export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props {}

const GalleryModal: FC<Props> = ({}): JSX.Element => {
  const { editor } = useToolbarUtils();
  const { onClose, showGallery, handleImageUpload } = useGalleryContext();
  const [selectedImage, setSelectedImage] = useState("");
  console.log(selectedImage);
  const [altText, setAltText] = useState("");
  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };
  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    if (!file.type.startsWith("image")) return onClose();
    handleImageUpload(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return onClose();
    handleImageSelection({ src: selectedImage, altText });
    onClose();
  };

  return (
    <ModalContainer visible={showGallery} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-colors-primary-dark dark:bg-colors-primary rounded">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
            <Gallery
              selectedImage={selectedImage}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>

          {/* image selection and upload */}
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleOnImageChange}
                  hidden
                  type="file"
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-colors-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload className="text-colors-action" />
                    <span className="text-colors-primary">Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full bg-transparent rounded border-2 border-colors-secondary-dark focus:ring-1 text-colors-primary dark:text-colors-primary-dark h-32 p-1"
                    placeholder="Alt text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>

                  <ActionButton onClick={handleSelection} title="Select" />

                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      width={50}
                      height={50}
                      layout="fill"
                      objectFit="contain"
                      alt="hallo"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
