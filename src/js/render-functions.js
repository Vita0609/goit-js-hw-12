import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.card-link', {
  inlineStyles: false,
  captionsData: 'alt',
  captionDelay: 250,
  disableScroll: true,
});

const renderImages = (resultData, list) => {
  const markup = resultData
    .map(
      ({
        largeImageURL,
        likes,
        comments,
        views,
        downloads,
        tags,
        webformatURL,
      }) => {
        return `<li class="card">
                <a class="card-link" href="${largeImageURL}">
                    <img  class="card-image" src="${webformatURL}" alt="${tags}" /> 
                </a>
                <div class="main-content">
                    <ul class="card-list">
                        <li class="card-list-li">
                            <h3>
                                likes
                            </h3>
                            <p>${likes}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                views
                            </h3>
                            <p>${views}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                comments
                            </h3>
                            <p>${comments}</p>
                        </li>
                        <li class="card-list-li">
                            <h3>
                                downloads
                            </h3>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </div>
            </li>`;
      }
    )
    .join('');

  list.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
};

export default renderImages;