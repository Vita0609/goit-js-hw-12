import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function createMarkup(arr, listElement) {
    const markup = arr
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="item">
        <a class="item-link" href="${largeImageURL}">
        <img class="item-img" src="${webformatURL}" alt="${tags}" />
        <div class="wrapper">
        <div class="span-wrapper">
        <span class="span-name">Likes</span>
        <span class="span-value">${likes}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Views</span>
        <span class="span-value">${views}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Comments</span>
        <span class="span-value">${comments}</span>
        </div>
        <div class="span-wrapper">
        <span class="span-name">Downloads</span>
        <span class="span-value">${downloads}</span>
        </div>
        </div>
        </a>
        </li>
        `)
        .join("");
    listElement.insertAdjacentHTML("beforeend", markup);
    gallery.refresh();
}

let gallery = new SimpleLightbox('.list a', { 
    sourceAttr: "href",
    captionsData: "alt",
    captionDelay: 250
 });