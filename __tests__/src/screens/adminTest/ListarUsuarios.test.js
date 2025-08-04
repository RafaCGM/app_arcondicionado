import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ListarUsuarios from '../../../../src/screens/admin/ListarUsuariosScreen';

import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

const mockUsers = [
  { idusuario: 1, nome: 'Euller', matricula: '123' },
  { idusuario: 2, nome: 'Rafa', matricula: '456' },
];

describe('ListarUsuarios', () => {
  beforeEach(() => {
    axios.post.mockImplementation((url) => {
      if (url.includes('/usuarios/list')) {
        return Promise.resolve({ data: { res: mockUsers } });
      }
      if (url.includes('/usuarios/rem')) {
        return Promise.resolve({ data: { num_erro: 0 } });
      }
    });
  });

  it('renderiza os botões e executa ações básicas', async () => {
    const { getByText, findByText } = render(
      <NavigationContainer>
        <ListarUsuarios navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Espera o texto de um usuário aparecer
    expect(await findByText('Nome: Euller')).toBeTruthy();

    // Verifica se os botões estão lá
    expect(getByText('Editar')).toBeTruthy();
    expect(getByText('Excluir')).toBeTruthy();
    expect(getByText('Cadastrar Usuário')).toBeTruthy();

    // Simula clique no botão de cadastro
    fireEvent.press(getByText('Cadastrar Usuário'));
    expect(mockNavigate).toHaveBeenCalledWith('Cadastrar Usuário');
  });
});
