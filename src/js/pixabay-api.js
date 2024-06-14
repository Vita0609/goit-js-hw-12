import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const key = '44362939-998edb8f92844eab0dd18e81c';
export const per_page = 15;
    
export async function searchImage(userValue, page = 1) {

        const response = await axios.get(``, {
            params: {
                key,
                q: userValue,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page, 
                page,
                }
        });

        return response.data;
};
    