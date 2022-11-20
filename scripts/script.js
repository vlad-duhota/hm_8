import images from './images.js';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = modal.querySelector('.lightbox__image');
const closeBtn = modal.querySelector('button[data-action="close-lightbox"]');
const modalOverlay = modal.querySelector('.lightbox__overlay');

let isModalOpen = false;
let activeIndex = -1;

document.addEventListener('keydown', (e) => {
  if (!isModalOpen) {
    return;
  }

  switch (e.code) {
    case 'Escape':
      closeModal();
      break;

    case 'ArrowLeft':
      prev();
      break;

    case 'ArrowRight':
      next();
      break;

    default:
      break;
  }
});

modalOverlay.addEventListener('click', (e) => {
  closeModal();
});

closeBtn.addEventListener('click', () => {
  closeModal();
});

gallery.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const originalUrl = e.target.dataset.source;
    const description = e.target.alt;
    openModal(originalUrl, description, Number(e.target.dataset.index));
  }
});

function prev() {
  if(activeIndex === 0){
    return;
  }

  const targetIndex = activeIndex - 1;
  const targetImg = images[targetIndex];
  openModal(targetImg.original, targetImg.description, targetIndex);
}

function next() {
  if(activeIndex === images.length - 1){
    return;
  }

  const targetIndex = activeIndex + 1;
  const targetImg = images[targetIndex];
  openModal(targetImg.original, targetImg.description, targetIndex);
}

function openModal(originalUrl, description, index) {
  modal.classList.add('is-open');
  modalImage.src = originalUrl;
  modalImage.alt = description;
  isModalOpen = true;
  activeIndex = index;
}

function closeModal() {
  modal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
  isModalOpen = false;
}

function createGalleryElem(preview, original, description, index) {
  const finalHtml = `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
      />
    </a>
  </li>
  `;

  return finalHtml;
}

function renderImages() {
  let finalImages = '';
  images.forEach((image, i) => {
    const imageHtml = createGalleryElem(
      image.preview,
      image.original,
      image.description,
      i
    );

    finalImages += imageHtml;
  });

  gallery.insertAdjacentHTML('afterbegin', finalImages);
}

renderImages();
