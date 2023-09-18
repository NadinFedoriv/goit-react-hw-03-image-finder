import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '36084705-51b248dff385c7068eea210ac'; 
const perPage = 12;

export const fetchImages = (query, page) => {
  return axios
    .get('', {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        per_page: perPage,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
};