import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../../../src/screens/HomeScreen';

//Obs: Se quiser ver todas as mensagens de teste sendo exibidas, rode esse comando "yarn test --verbose"

//Teste para saber se o campo de 'Explorar agora' está renderizado
test('Campo de "Explorar agora" está presente', () => {
    const {getByText} = render (<HomeScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Explorar Agora')).toBeTruthy();
});


//Simula o clique no botão 'Explorar agora' e verifica se a navegação para a tela Geral foi bem sucedida
test('Botão "Explorar Agora" navega para a tela Geral', async () => {
    const mockNavigate = jest.fn();

    const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(getByText('Explorar Agora'));

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Geral');
    });

});