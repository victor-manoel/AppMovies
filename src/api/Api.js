// src/api/tmdbApi.js
import axios from 'axios';

const API_KEY = 'aaa0db2f38ae7f98ac1280e7d34cd5e3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
