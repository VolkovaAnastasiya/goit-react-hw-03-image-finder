import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onClickItem,
}) {
  return (
    <li key={id} className={s.gallery_item}>
      <img
        className={s.gallery_item_image}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={() => {
          onClickItem(largeImageURL);
        }}
      />
    </li>
  );
}
