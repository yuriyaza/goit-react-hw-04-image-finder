import { useEffect, useState } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as API from "services/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import css from "./App.module.css";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === "") return;

    const handleGetData = async () => {
      try {
        setShowMoreButton(false);
        setShowLoader(true);

        const data = await API.getData(query, page, perPage);
        const { hits: appendImages, totalHits: total } = data;

        if (appendImages.length === 0) {
          toast.error("Images not found");
          return;
        }

        setImages((images) => [...images, ...appendImages]);
        setShowMoreButton(page < Math.ceil(total / perPage));
      } catch (error) {
        toast.error("An error has occurred");
      } finally {
        setShowLoader(false);
      }
    };

    handleGetData();
  }, [query, page]);

  const handleFormSubmit = (nextQuery) => {
    if (nextQuery !== query && nextQuery !== "") {
      setQuery(nextQuery);
      setImages([]);
      setPage(1);
    }
  };

  const handleMoreButtonClick = () => {
    setPage((page) => page + 1);
  };

  const handleModalOpen = (activeImage) => {
    setCurrentImage(activeImage);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleModalOpen} />

      {showMoreButton && <Button onClick={handleMoreButtonClick} />}
      {showLoader && <Loader />}
      {showModal && (
        <Modal image={currentImage} modalClose={handleModalClose} />
      )}

      <ToastContainer
        transition={Slide}
        theme="colored"
        autoClose={2500}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss
      />
    </div>
  );
};
