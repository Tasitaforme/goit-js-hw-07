import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createGalleryImagesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("afterbegin", imagesMarkup);
galleryContainer.addEventListener("click", onGalleryImage);

function createGalleryImagesMarkup(el) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>
    `;
    }).join('');
}

function onGalleryImage(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    const imageUrl = e.target.dataset.source;
    showModalOriginalImage(imageUrl);
}

function showModalOriginalImage(el) {
  const instance = basicLightbox.create(`<img src="${el}" width="800" height="600">`);

  instance.show();

  const handleEscape = (e) => {
    if (e.code !== "Escape") {
      return;
    }
    
    window.removeEventListener("keydown", handleEscape);
    instance.close();
  };

  window.addEventListener("keydown", handleEscape);
}