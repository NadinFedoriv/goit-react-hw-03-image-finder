import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li onClick={() => onClick(src, alt) } className='item' >
      <img className='item-image' src={src} alt={alt}  />
    </li>
  );
};

ImageGalleryItem.propType = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
