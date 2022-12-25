import { galleryItems } from "./gallery-items.js";

const ref = {
  gallery: document.querySelector(".gallery"),
};

ref.gallery.addEventListener("click", handleTargetImgClick);

function handleTargetImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalUrl = getUrlOriginalSizeImg(event);

  openModalOriginalSizeImg(originalUrl);
}

function getUrlOriginalSizeImg(event) {
  return event.target.dataset.source;
}

function openModalOriginalSizeImg(originalUrl) {
  document.addEventListener(
    "keydown",
    handleKeDownPressByCloseModalOriginalSizeImg
  );

  instance = basicLightbox.create(
    `
    <img src="${originalUrl}">
`
  );

  instance.show();
}

function handleKeDownPressByCloseModalOriginalSizeImg(event) {
  if (event.code === "Escape") {
    document.removeEventListener(
      "keydown",
      handleKeDownPressByCloseModalOriginalSizeImg
    );
    instance.close();
  }
}

function createGallaryElementMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
      `;
    })
    .join("");
}

const gallaryMarkup = createGallaryElementMarkup(galleryItems);
ref.gallery.innerHTML = gallaryMarkup;

let instance = "";
