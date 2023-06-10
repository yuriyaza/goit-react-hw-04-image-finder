import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, ...restProps }) => {
  return (
    <ul className={css.imageGallery}>

      {images.map((image) => {
        return (
          <li className={css.imageGalleryItem} key={image.id}>
            <ImageGalleryItem image={image} {...restProps} />
          </li>
        );
      })}

    </ul>
  );
};

ImageGallery.types = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
