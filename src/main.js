import {
  pixApi,
  perPage,
  setCurrentPage,
  getCurrentPage,
} from './js/pixabay-api.js';
import renderImages from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const input = document.querySelector('input[data-search]');
const loader = document.querySelector('.loader-div');
const list = document.querySelector('.list');
const moreBtn = document.querySelector('.show-more');

form.addEventListener('submit', async e => {
  e.preventDefault();

  loader.style.display = 'flex';
  localStorage.removeItem('search');
  const search = input.value.trim();
  list.innerHTML = '';

  setCurrentPage(1);
  moreBtn.style.visibility = 'hidden';

  try {
    const data = await pixApi(search);
    localStorage.setItem('search', search);
    const result = data.hits;
    const totalPages = Math.ceil(data.totalHits / perPage);

    if (result.length !== 0 && search !== '') {
      renderImages(result, list);

      totalPages > getCurrentPage()
        ? (moreBtn.style.visibility = 'visible')
        : (moreBtn.style.visibility = 'hidden');
    } else {
      iziToast.show({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        backgroundColor: '#E25757',
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Помилка при рендері картинок', error);
    moreBtn.style.visibility = 'hidden';
    iziToast.show({
      title: '',
      message: 'Sorry, check your internet connection!',
      messageColor: 'white',
      backgroundColor: '#E25757',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    loader.style.display = 'none';
    e.target.reset();
  }
});

//button more
moreBtn.addEventListener('click', async () => {
  loader.style.display = 'flex';
  const searchRemember = localStorage.getItem('search');

  setCurrentPage(getCurrentPage() + 1);

  try {
    const data = await pixApi(searchRemember);
    const result = data.hits;
    const card = document.querySelector('.card');
    const totalPages = Math.ceil(data.totalHits / perPage);

    renderImages(result, list);

    if (totalPages > getCurrentPage()) {
      moreBtn.style.visibility = 'visible';
    } else {
      iziToast.show({
        title: '❌',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'white',
        backgroundColor: '#E25757',
        position: 'topRight',
        timeout: 5000,
      });
      moreBtn.style.visibility = 'hidden';
    }

    const cardHeight = Math.floor(card.getBoundingClientRect().height);
    scrollBy(0, cardHeight * 2);
  } catch (error) {
    console.error('Помилка при рендері картинок', error);

    iziToast.show({
      title: '❌',
      message: 'Sorry, check your internet connection!',
      messageColor: 'white',
      backgroundColor: '#E25757',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    loader.style.display = 'none';
  }
});