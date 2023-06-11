import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ image, setShowModal }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Escape") { setShowModal(false); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); };

  }, [setShowModal]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className={css.overlay} onClick={onBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={() => { setShowModal(false); }}
        ></button>
        <img src={image.largeImageURL} alt={"Tags: " + image.tags} />
      </div>
    </div>
  );
};

Modal.types = {
  image: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};
