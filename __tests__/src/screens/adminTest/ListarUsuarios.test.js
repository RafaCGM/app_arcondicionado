import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ListarUsuarios from '../../../../src/screens/admin/usuarios/ListarUsuariosScreen';

// Função auxiliar para renderizar o componente com suporte à navegação
const renderWithNavigation = (navigateMock = jest.fn()) => {
  return render(
    <NavigationContainer>
      <ListarUsuarios navigation={{ navigate: navigateMock }} />
    </NavigationContainer>
  );
};

// Teste 1: Verifica se o botão "Cadastrar Usuário" aparece na tela
test('Renderiza botão "Cadastrar Usuário"', async () => {
  const { getByText } = renderWithNavigation();

  await waitFor(() => {
    expect(getByText('Cadastrar Usuário')).toBeTruthy();
  });
});

// Teste 2: Verifica se os botões "Editar" e "Excluir" são renderizados
test('Renderiza botões "Editar" e "Excluir"', async () => {
  const { findAllByText } = renderWithNavigation();

  const botoesEditar = await findAllByText('Editar');
  const botoesExcluir = await findAllByText('Excluir');

  expect(botoesEditar.length).toBeGreaterThan(0);
  expect(botoesExcluir.length).toBeGreaterThan(0);
});

// Teste 3: Verifica se o botão "Editar" funcionan e vai para os Dados do Usuário
test('Botão "Editar" chama navegação', async () => {
  const navigateMock = jest.fn();
  const { findAllByText } = renderWithNavigation(navigateMock);

  const botoesEditar = await findAllByText('Editar');
  fireEvent.press(botoesEditar[0]);

  expect(navigateMock).toHaveBeenCalled();
});

// Teste 4: Simula clique no botão "Excluir" 
test('Botão "Excluir" pode ser clicado', async () => {
  const { findAllByText } = renderWithNavigation();

  const botoesExcluir = await findAllByText('Excluir');

  // Simula o clique no primeiro botão "Excluir"
  fireEvent.press(botoesExcluir[0]);
});

//obs: Apenas está simulando o clique para saber se pode ser clicado, para saber se está funcioanal e excluindo precisa-se do backend
// Envolve outras maneiras de fazer o teste que eu desconheço