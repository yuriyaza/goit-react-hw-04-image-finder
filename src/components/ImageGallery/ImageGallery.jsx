import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>

      {images.map((image) => {
        return (
          <li className={css.imageGalleryItem} key={image.id}>
            <ImageGalleryItem image={image} />
          </li>
        );
      })}

    </ul>
  );
};

ImageGallery.types = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
