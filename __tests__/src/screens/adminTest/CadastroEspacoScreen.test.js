import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import CadastroEspacoScreen from '../../../../src/screens/admin/espaco/CadastroEspacoScreen';

// Testa se a tela de Cadastro de Espaço renderiza corretamente
test('Renderiza a tela de Cadastro de Espaço', () => {
  const { getByText } = render(<CadastroEspacoScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se o título está visível
  expect(getByText('Cadastro de Espaço')).toBeTruthy();
});

// Testa se os campos de entrada estão presentes
test('Renderiza os campos de Número da Sala e ID do Usuário', () => {
  const { getByText, getByTestId } = render(<CadastroEspacoScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se os rótulos dos campos estão visíveis
  expect(getByText('Informe o número da sala:')).toBeTruthy();
  expect(getByText('ID do usuário responsável:')).toBeTruthy();

  // Verifica se os campos estão visíveis e podem ser preenchidos
  expect(getByTestId('numEspacoInput')).toBeTruthy();
  expect(getByTestId('usuarioIdInput')).toBeTruthy();
});

// Testa se os campos podem ser preenchidos e o botão de cadastro funciona
test('Preenche os campos e clica no botão de cadastro', async () => {
  const { getByTestId } = render(<CadastroEspacoScreen navigation={{ goBack: jest.fn() }} />);

  // Preenche os campos de entrada
  fireEvent.changeText(getByTestId('numEspacoInput'), '101');
  fireEvent.changeText(getByTestId('usuarioIdInput'), '1');

  // Verifica se os valores foram preenchidos corretamente
  expect(getByTestId('numEspacoInput').props.value).toBe('101');
  expect(getByTestId('usuarioIdInput').props.value).toBe('1');

  // Simula o clique no botão de cadastro
  fireEvent.press(getByTestId('cadastrarButton'));

});