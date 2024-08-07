// src/api/authApi.js
import axios from 'axios';

const BASE_URL = 'https://example.com/api'; // substitua pelo URL da sua API de autenticação

export const login = async (email, password) => {
  // Credenciais de teste
  const testEmail = 'user';
  const testPassword = '123';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === testEmail && password === testPassword) {
        resolve({
          userId: 1,
          email: testEmail,
          token: '1234567890abcdef',
        });
      } else {
        reject('Invalid email or password');
      }
    }, 1000);
  });
};
