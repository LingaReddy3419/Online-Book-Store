import axios from 'axios';

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export const fetchBooks = async (query) => {
    try {
        const response = await axios.get(`${API_URL}${query?query:'forest'}`);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching books", error);
    }
};
