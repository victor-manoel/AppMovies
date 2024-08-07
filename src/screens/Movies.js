// src/screens/Movies.js
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getPopularMovies} from '../api/Api';
import {AuthContext} from '../context/AuthContext';

const Movies = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const {signOut, addFavorite} = useContext(AuthContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getPopularMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>BRQ Movies</Text>
      <View style={styles.cards}>
        <FlatList
          numColumns={2}
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() =>
                navigation.navigate('MovieDetail', {movieId: item.id})
              }>
              <Image
                source={{uri: item.poster_path}}
                style={styles.movieImage}
              />
              {/* <Text style={styles.movieTitle}>{item.title}</Text> */}
              <Button
                title="Favoritar"
                color="#FFF"
                onPress={() => addFavorite(item)}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <Button title="Sair" color="#FFF" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16171B',
    flex: 1,
    padding: 10,
  },
  titleMain: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    margin: 10,
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
  },
  movieItem: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {
    width: 196,
    height: 266,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Movies;
