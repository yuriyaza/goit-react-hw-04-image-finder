import { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "components/Modal/Modal";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <img
        className={css.galleryItemImage}
        src={image.webformatURL}
        alt={"Tags: " + image.tags}
        onClick={() => { handleModalOpen(image); }}
      />
      {showModal && ( <Modal image={selectedImage} modalClose={handleModalClose} /> )}
    </>
  );
};

ImageGalleryItem.types = {
  image: PropTypes.object.isRequired,
};
