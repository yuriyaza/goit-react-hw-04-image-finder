import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ image, modalClose }) => {

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Escape") {
        modalClose();
      }
    };
    
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); };
    
  }, [modalClose]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
 
  return (
    <div className={css.overlay} onClick={onBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={() => {
            modalClose();
          }}
        ></button>
        <img src={image.largeImageURL} alt={"Tags: " + image.tags} />
      </div>
    </div>
  );
};

Modal.types = {
  image: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
