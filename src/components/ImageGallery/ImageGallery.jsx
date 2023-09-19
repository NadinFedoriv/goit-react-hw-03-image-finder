import './ImageGallery.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images, handleImageClick }) => {
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.id}
          onClick={handleImageClick}
        />
      ))}
    </ul>
  );
};
