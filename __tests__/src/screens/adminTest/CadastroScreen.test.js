import { render, fireEvent } from '@testing-library/react-native';
import CadastroScreen from '../../../../src/screens/admin/usuarios/CadastroScreen';

// Testa para verificar se a tela de cadastro renderiza corretamente viu :D
test('Renderiza a tela de cadastro', () => {
  const { getByText } = render(<CadastroScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se o título está visível
  expect(getByText('Cadastro de Usuário')).toBeTruthy();
});


// Testa se os campos de entrada estão presentes
test('Renderiza os campos de matrícula, nome, email e senha', () => {
  const { getByText } = render(
    <CadastroScreen navigation={{ goBack: jest.fn() }} />
  );

  // Verifica se os textos dos rótulos estão na tela
  expect(getByText('Matrícula:')).toBeTruthy();
  expect(getByText('Nome:')).toBeTruthy();
  expect(getByText('E-mail:')).toBeTruthy();
  expect(getByText('Senha:')).toBeTruthy();
});


// Testa se é possível digitar nos campos do formulário
test('Permite preencher os campos do formulário', () => {
  const { getAllByDisplayValue } = render(
    <CadastroScreen navigation={{ goBack: jest.fn() }} />
  );

  // Pega todos os campos que estão vazios (os inputs iniciam com value='')
  const matriculaInput = getAllByDisplayValue('')[0];
  const nomeInput = getAllByDisplayValue('')[1];
  const emailInput = getAllByDisplayValue('')[2];
  const senhaInput = getAllByDisplayValue('')[3];

  // Simula o preenchimento dos campos como se o usuário estivesse digitando
  fireEvent.changeText(matriculaInput, '12345');
  fireEvent.changeText(nomeInput, 'Pedro Henrique');
  fireEvent.changeText(emailInput, 'pedro@example.com');
  fireEvent.changeText(senhaInput, '123456');

  // Verifica se os valores foram realmente inseridos nos campos
  expect(matriculaInput.props.value).toBe('12345');
  expect(nomeInput.props.value).toBe('Pedro Henrique');
  expect(emailInput.props.value).toBe('pedro@example.com');
  expect(senhaInput.props.value).toBe('123456');
});

test('Renderiza o botão de cadastro', () => {
  const { getByText } = render(
    <CadastroScreen navigation={{ goBack: jest.fn() }} />
  );

  // Verifica se o botão de cadastro está presente
  const botaoCadastro = getByText('Cadastrar');
  expect(botaoCadastro).toBeTruthy();

  fireEvent.press(botaoCadastro); // Simula o clique no botão

});

//Obs: o teste desse arquivo dará um aviso, não um erro. Pesquisei
//e o que encontrei foi a seguinte explçicação:

// O aviso é apenas informativo e ocorre porque a função alert foi chamada dentro de
//uma função assíncrona (signup) após o Jest ter terminado a execução dos testes.
//Isso é um comportamento esperado quando não se
// mocka o alert e quando há chamadas assíncronas.