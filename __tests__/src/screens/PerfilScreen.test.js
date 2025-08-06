import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import PerfilScreen from '../../../src/screens/PerfilScreen';


//Teste para saber se o campo de 'Dashboard' está renderizado
test('Campo de "Dashboard" está presente', () => {
    const {getByText} = render (<PerfilScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Dashboard')).toBeTruthy();
});


//Simula o clique no botão 'Configurações' e verifica se a navegação para a tela Geral foi bem sucedida
test('Teste para saber se o botão "Configurações" navega para a tela Configurações', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<PerfilScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Configurações'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Configurações');
    });
});