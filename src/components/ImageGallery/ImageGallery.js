import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ arrayImage, toggleModal }) {
  return (
    <ul className={s.gallery}>
      {arrayImage.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImage={largeImageURL}
          onClickItem={() => {
            toggleModal(largeImageURL);
          }}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
