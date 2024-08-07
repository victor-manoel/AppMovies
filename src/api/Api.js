// src/api/tmdbApi.js
import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // URL base para imagens de largura 500px

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results.map(movie => ({
      ...movie,
      poster_path: `${IMAGE_BASE_URL}${movie.poster_path}`,
    }));
  } catch (error) {
    console.error('Error fetching popular movies: ', error);
    throw error;
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
