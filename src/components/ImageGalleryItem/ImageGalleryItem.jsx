import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <img
      className={css.galleryItemImage}
      src={image.webformatURL}
      alt={'Tags: ' + image.tags}
      onClick={() => { onImageClick(image); }}
    />
  );
};

ImageGalleryItem.types = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
