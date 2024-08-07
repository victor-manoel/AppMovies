// src/screens/FavoritesMovies.js
import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const FavoritesMovies = ({navigation}) => {
  const {favorites, removeFavorite} = useContext(AuthContext);
  const {signOut, addFavorite} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>BRQ Movies</Text>
      <View style={styles.cards}>
        <FlatList
          numColumns={2}
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieDetail', {movieId: item.id})
              }
              style={styles.movieItem}>
              <Image
                source={{uri: item.poster_path}}
                style={styles.movieImage}
              />
              <Button
                title="Remover dos Favoritos"
                color="#FFF"
                onPress={() => removeFavorite(item.id)}
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
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default FavoritesMovies;
