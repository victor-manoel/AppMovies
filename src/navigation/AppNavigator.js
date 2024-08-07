// src/navigation/AppNavigator.js
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, AuthProvider} from '../context/AuthContext';
import Login from '../screens/Login';
import Movies from '../screens/Movies';
import FavoritesMovies from '../screens/FavoritesMovies';
import Details from '../screens/Details';
// import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: {backgroundColor: '#EC8B00'},
      tabBarLabelStyle: {fontSize: 14, color: '#FFF', fontWeight: 'bold'},
      tabBarStyle: {backgroundColor: '#16171B'},
      headerShown: false,
    }}>
    <Tab.Screen
      name="Todos os Filmes"
      component={Movies}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Filmes Favoritos"
      component={FavoritesMovies}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {user} = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: '#16171B'}}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name=" "
                component={TabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MovieDetail"
                component={Details}
                options={{
                  headerShown: true,
                  title: 'BRQ Filmes',
                  headerStyle: {
                    backgroundColor: '#16171B',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
