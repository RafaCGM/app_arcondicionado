import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ListarEspacos from '../../../../src/screens/admin/espaco/ListarEspacosScreen';

// Função auxiliar com NavigationContainer
const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <ListarEspacos navigation={{ navigate: jest.fn() }} />
    </NavigationContainer>
  );
};

// Teste 1: Verifica se o botão "Cadastrar Espaço" aparece na tela
test('Renderiza botão "Cadastrar Espaço"', async () => {
  const { getByText } = renderWithNavigation();

  await waitFor(() => {
    expect(getByText('Cadastrar Espaço')).toBeTruthy();
  });
});

// Teste 2: Verifica se os botões "Editar" e "Excluir" aparecem
test('Renderiza botões "Editar" e "Excluir"', async () => {
  const { findAllByText } = renderWithNavigation();

  const editarBtns = await findAllByText('Editar');
  const excluirBtns = await findAllByText('Excluir');

  expect(editarBtns.length).toBeGreaterThan(0);
  expect(excluirBtns.length).toBeGreaterThan(0);
});
