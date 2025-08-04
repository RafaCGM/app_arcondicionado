import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CadastroMonitoramentoScreen from '../../../../src/screens/admin/monitoramento/CadastroMonitoramentoScreen';

// Testa se a tela de Cadastro de Monitoramento renderiza corretamente
test('Renderiza a tela de Cadastro Monitoramento', () => {
  const { getByText } = render(<CadastroMonitoramentoScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se o título está visível
  expect(getByText('Cadastro de Monitoramento')).toBeTruthy();
});

// Testa se os campos de entrada estão presentes
test('Renderiza os campos de Informar data e hora e ID de monitoramento', () => {
  const { getByText, getByTestId } = render(<CadastroMonitoramentoScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se os rótulos dos campos estão visíveis
  expect(getByText('Informe a data e hora:')).toBeTruthy();
  expect(getByText('ID do Monitoramento:')).toBeTruthy();

  // Verifica se os campos estão visíveis e podem ser preenchidos
  expect(getByTestId('dataHoraInput')).toBeTruthy();
  expect(getByTestId('equipamentoIdInput')).toBeTruthy();
});

// Testa se os campos podem ser preenchidos e o botão de cadastro funciona
test('Preenche os campos e clica no botão de cadastro', async () => {
  // Mock do alert
  const mockAlert = jest.fn();
  global.alert = mockAlert;

  // Mock do console.log
  const mockConsoleLog = jest.fn();
  global.console.log = mockConsoleLog;

  const { getByTestId } = render(<CadastroMonitoramentoScreen navigation={{ goBack: jest.fn() }} />);

  // Preenche os campos de entrada
  fireEvent.changeText(getByTestId('dataHoraInput'), '2025-08-04 10:00');
  fireEvent.changeText(getByTestId('equipamentoIdInput'), '123');

  // Verifica se os valores foram preenchidos corretamente
  expect(getByTestId('dataHoraInput').props.value).toBe('2025-08-04 10:00');
  expect(getByTestId('equipamentoIdInput').props.value).toBe('123');

  // Simula o clique no botão de cadastro
  fireEvent.press(getByTestId('cadastrarButton'));

  // Verifica se o alert foi chamado após pressionar o botão
  await waitFor(() => expect(mockAlert).toHaveBeenCalled());

  // Verifica se o console.log foi chamado
  expect(mockConsoleLog).toHaveBeenCalled();
});
