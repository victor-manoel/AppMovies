// src/context/AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      const favoriteMovies = await AsyncStorage.getItem('favorites');
      if (favoriteMovies) {
        setFavorites(JSON.parse(favoriteMovies));
      }
    };

    loadUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userData = await login(email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const addFavorite = async movie => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = async movieId => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <AuthContext.Provider
      value={{user, favorites, signIn, signOut, addFavorite, removeFavorite}}>
      {children}
    </AuthContext.Provider>
  );
};
