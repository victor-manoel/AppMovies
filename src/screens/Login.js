// src/screens/Login.js
import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import NetInfo from '@react-native-community/netinfo';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const {signIn} = useContext(AuthContext);

//   const handleLogin = async () => {
//     try {
//       await signIn(email, password);
//     } catch (error) {
//       Alert.alert('Login Failed', 'Invalid email or password');
//     }
//   };

const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

const CustomTextInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Ionicons name={iconName} size={24} color="#fff" style={styles.icon} /> */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          {/* <Ionicons
            name="close-circle"
            size={24}
            color="#fff"
            style={styles.clearIcon}
          /> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro de validação', 'Ambos os campos são requiridos.');
      return;
    }

    if (!/^\d+$/.test(password)) {
      Alert.alert('Erro de validação', 'Senha deve ser numérica');
      return;
    }
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      Alert.alert('Network Error', 'No internet connection.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      if (error.response) {
        // Erro na resposta da API
        Alert.alert('API Error', `Error: ${error.response.status}`);
      } else if (error.request) {
        // Erro na solicitação
        Alert.alert('Request Error', 'Failed to connect to the server.');
      } else {
        // Outro erro
        Alert.alert('Error', error.message);
      }
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Erro de Login', 'Email ou Senha errados');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 20}>
        <Image
          style={styles.imageLogin}
          source={require('../../assets/brqlogo.png')}
        />
        <CustomTextInput
          // iconName="house"
          placeholder="Usuário"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          // iconName="house"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          keyboardType="numeric"
          secureTextEntry
        />
        <View style={styles.buttonLogin}>
          <Button title="Entrar" onPress={handleLogin} color="#2E2F33" />
        </View>
        <Button title="Esqueci a Senha" onPress={handleLogin} color="#FFF" />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16171B',
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    width: 355,
    height: 56,
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  clearIcon: {
    marginLeft: 10,
  },
  buttonLogin: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    width: 348,
    borderRadius: 100,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  imageLogin: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;
