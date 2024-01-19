import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ showModal, items }) => {
  return items.map((item, index) => (
    <li
      onClick={() => showModal({ largeImageURL: item.largeImageURL })}
      className={css.gallery_item}
      key={item.id || index}
    >
      <img
        className={css.gallery_item_image}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  ));
  // return items.map(({ id, webformatURL, tags, largeImageURL }) => (
  //   <li
  //     onClick={() => showModal({ largeImageURL })}
  //     className={css.gallery_item}
  //     key={id}
  //   >
  //     <img className={css.gallery_item_image} src={webformatURL} alt={tags} />
  //   </li>
  // ));
};

export default ImageGalleryItem;
