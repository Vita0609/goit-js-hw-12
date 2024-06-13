import axios from 'axios';

const apiKey = '44362939-998edb8f92844eab0dd18e81c';

let currentPage = 1;
let perPage = 15;

const pixApi = async data => {
  try {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: perPage,
    });

    const response = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${data}&${searchParams}`
    );

    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних', error);
    throw error;
  }
};

function setCurrentPage(page) {
  currentPage = page;
}

function getCurrentPage() {
  return currentPage;
}

export { pixApi, perPage, setCurrentPage, getCurrentPage };