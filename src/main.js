import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { createMarkup } from './js/render-functions';
import { searchImage } from './js/pixabay-api';
import { per_page } from "./js/pixabay-api";

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const loader = document.querySelector(".loader");
const loaderTop = document.querySelector(".loader-top");
const loadBtn = document.querySelector(".load-more");

form.addEventListener("submit", handleSubmit);
loadBtn.addEventListener("click", () => handleClick(inputValue));

async function handleSubmit(event) {
    event.preventDefault();
    loaderTop.style.visibility = 'visible';

    const inputValue = input.value;

    page = 1;

    try {  
        const imageData = await searchImage(inputValue);
            
        if (imageData.hits.length === 0) {
            throw new Error;
        }

        list.innerHTML = "";
        
        createMarkup(imageData.hits, list);
            
        loadBtn.style.visibility = 'visible';
        
        if (per_page >= imageData.totalHits) {
            loadBtn.style.visibility = 'hidden';
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        }
        
    } catch (error) {
        list.innerHTML = '';
        iziToast.error({
            message: `Sorry, there are no images matching your search query. Please try again!`,
            theme: 'dark',
            messageColor: '#fff',
            messageSize: '16px',
            messageLineHeight: '1.5',
            backgroundColor: '#EF4040',
            position: 'topRight',
            progressBarColor: '#B51B1B',
        });
        loadBtn.style.visibility = 'hidden';
        
    } finally {
        loaderTop.style.visibility = 'hidden';
        form.reset();
    }

};

let inputValue = '';

input.addEventListener('input', (event) => {
    inputValue = event.target.value;
});

let page = 1;

async function handleClick(inputValue) {
    loadBtn.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
    
    page += 1;
    
    try {
        const response = await searchImage(inputValue, page);
        
        createMarkup(response.hits, list);

        loadBtn.style.visibility = 'visible';
        loader.style.visibility = 'hidden';

        scrolling();
        
        if (page * per_page >= response.totalHits || per_page >= response.totalHits) {
            loadBtn.style.visibility = 'hidden';
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        }

    } catch(error) {
        console.log(error.message);
    }
}

function scrolling() {

    const item = document.querySelector(".item");
    const itemHeight = item.getBoundingClientRect().height;

    window.scrollBy({
        top: itemHeight * 2,
        left: 0,
        behavior: "smooth",
    });
};