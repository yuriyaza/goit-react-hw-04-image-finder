import React from 'react';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as API from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    images: [],
    currentImage: {},
    showMoreButton: false,
    showLoader: false,
    showModal: false,
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.handleGetData(query, page);
    }
  };

  handleGetData = async () => {
    const { query, page, perPage } = this.state;

    try {
      this.setState({ showMoreButton: false, showLoader: true });

      const data = await API.getData(query, page, perPage);
      const { hits: images, totalHits: total } = data;

      if (images.length === 0) {
        toast.error('Images not found');
        return;
      }

      const showMoreButton = page < Math.ceil(total / perPage);
      this.setState({ images: [...this.state.images, ...images], showMoreButton });
    }
    
    catch (error) {
      toast.error('An error has occurred');
    }
    
    finally {
      this.setState({ showLoader: false });
    }
  };

  handleFormSubmit = (query) => {
    if (query !== this.state.query) {
      this.setState({ query, images: [], page: 1 });
    }
  };

  handleMoreButtonClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = (currentImage) => {
    this.setState({ showModal: true, currentImage });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, currentImage, showMoreButton, showModal, showLoader } = this.state;
    const { handleFormSubmit, handleMoreButtonClick, handleModalOpen, handleModalClose } = this;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} onImageClick={handleModalOpen} />

        {showMoreButton && <Button onClick={handleMoreButtonClick} />}
        {showLoader && <Loader />}
        {showModal && <Modal image={currentImage} onModalClose={handleModalClose} />}

        <ToastContainer transition={Slide} theme='colored' autoClose={2500} closeOnClick pauseOnHover={false} pauseOnFocusLoss />
      </div>
    );
  }
}
