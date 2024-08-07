import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Login from '../Login'; // Ajuste o caminho conforme necessário
import {AuthContext} from '../../context/AuthContext';

// Mock do AuthContext
const mockSignIn = jest.fn();

describe('Tela de Login', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário de login', () => {
    // Renderiza o componente Login dentro do contexto AuthContext
    const {getByPlaceholderText, getByText} = render(
      <AuthContext.Provider value={{signIn: mockSignIn}}>
        <Login />
      </AuthContext.Provider>,
    );

    // Verifica se os campos e botões estão presentes na tela
    expect(getByPlaceholderText('Usuário')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Esqueci a Senha')).toBeTruthy();
  });

  it('deve exibir erros de validação', async () => {
    // Renderiza o componente Login
    const {getByPlaceholderText, getByText} = render(
      <AuthContext.Provider value={{signIn: mockSignIn}}>
        <Login />
      </AuthContext.Provider>,
    );

    // Simula a alteração de texto nos campos de entrada
    fireEvent.changeText(getByPlaceholderText('Usuário'), '');
    fireEvent.changeText(getByPlaceholderText('Senha'), '');

    // Simula o clique no botão "Entrar"
    fireEvent.press(getByText('Entrar'));

    // Aguarda a exibição do alerta de erro
    await waitFor(() => {
      expect(getByText('Both fields are required.')).toBeTruthy();
    });
  });

  it('deve exibir erro de senha numérica', async () => {
    // Renderiza o componente Login
    const {getByPlaceholderText, getByText} = render(
      <AuthContext.Provider value={{signIn: mockSignIn}}>
        <Login />
      </AuthContext.Provider>,
    );

    // Simula a alteração de texto nos campos de entrada
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password');

    // Simula o clique no botão "Entrar"
    fireEvent.press(getByText('Entrar'));

    // Aguarda a exibição do alerta de erro
    await waitFor(() => {
      expect(getByText('Password must be numeric.')).toBeTruthy();
    });
  });

  it('deve chamar signIn com entradas válidas', async () => {
    // Renderiza o componente Login
    const {getByPlaceholderText, getByText} = render(
      <AuthContext.Provider value={{signIn: mockSignIn}}>
        <Login />
      </AuthContext.Provider>,
    );

    // Simula a alteração de texto nos campos de entrada
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), '123456');

    // Simula o clique no botão "Entrar"
    fireEvent.press(getByText('Entrar'));

    // Aguarda a chamada da função signIn com os parâmetros corretos
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('user@example.com', '123456');
    });
  });
});
