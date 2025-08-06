import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import ConfigScreen from '../../../src/screens/ConfigScreen';



//Simula o clique no botão 'Usuários' e verifica se a navegação para a tela Lista de Usuários foi bem sucedida
test('Teste para saber se o botão "Usuários" navega para a tela Lista de Usuários', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<ConfigScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Usuários'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Lista de Usuários');
    });
});

//Simula o clique no botão '' e verifica se a navegação para a tela Geral foi bem sucedida
test('Teste para saber se o botão "Espaços" navega para a tela Lista de Espaços', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<ConfigScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Espaços'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Lista de Espaços');
    });
});

test('Teste para saber se o botão "Equipamentos" navega para a tela Lista de Equipamentos', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<ConfigScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Equipamentos'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Lista de Equipamentos');
    });
});

test('Teste para saber se o botão "Monitoramentos" navega para a tela Lista de Monitoramentos', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<ConfigScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Monitoramentos'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Lista de Monitoramentos');
    });
});