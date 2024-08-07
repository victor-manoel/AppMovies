// src/screens/Details.js
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, Button, StyleSheet, ScrollView} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {getMovieDetails} from '../api/Api';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {Ionicons} from '@expo/vector-icons';

const Details = () => {
  const [movie, setMovie] = useState(null);
  const {addFavorite, removeFavorite, favorites} = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const {movieId} = route.params; // Obtém o ID do filme passado como parâmetro

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  console.log(movie.poster_path);

  return (
    <ScrollView style={styles.container}>
      {/* <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      /> */}
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
        style={styles.banner}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.titleSinopse}>SINOPSE</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.rating}>Avaliação: {movie.vote_average}</Text>
      </View>
      {/* <Button
        color="#EC8B00"
        title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        onPress={() => {
          if (isFavorite) {
            removeFavorite(movie.id);
          } else {
            addFavorite(movie);
          }
        }}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16171B',
  },
  banner: {
    height: 526,
    resizeMode: 'stretch',
  },
  containerText: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  titleSinopse: {
    fontSize: 24,
    color: '#EC8B00',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  overview: {
    fontSize: 16,
    marginVertical: 8,
    color: '#FFF',
  },
  rating: {
    fontSize: 16,
    marginVertical: 8,
    color: '#FFF',
  },
  backIcon: {
    marginVertical: 10,
  },
});

export default Details;
