import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/LoginScreen';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { num_erro: 0 } }))
}));

// 1) Verifica se os campos Email, senha e login estão na tela
test('email e senha estão presentes :D', () => {
    const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('E-mail:')).toBeTruthy();
    expect(getByText('Senha:')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
});

// 2) Verifica os valores padrão dos campos
test('preenche os campos de e-mail e senha corretamente :D', () => {
    const { getByDisplayValue } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByDisplayValue('admin@gmail.com')).toBeTruthy();
    expect(getByDisplayValue('123456')).toBeTruthy();
});

// 3) Simula clique no botão e navegação para a tela Main/HomeScreen
test('botão de login navega para a tela Main', async () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Main');
    });
});
