import { render, fireEvent } from '@testing-library/react-native';
import CadastroScreen from '../../../../src/screens/admin/usuarios/CadastroScreen';


// Testa para verificar se a tela de cadastro renderiza corretamente viu :D
test('Renderiza a tela de cadastro', () => {
  const { getByText } = render(<CadastroScreen navigation={{ goBack: jest.fn() }} />);

  // Verifica se o título está visível
  expect(getByText('Cadastro de Usuário')).toBeTruthy();
});


test('Renderiza os campos de matrícula, nome, email e senha', () => {
  const { getByDisplayValue, getByText } = render(
    <CadastroScreen navigation={{ goBack: jest.fn() }} />
  );

  // Verifica se os textos estão na tela
  expect(getByText('Matrícula:')).toBeTruthy();
  expect(getByText('Nome:')).toBeTruthy();
  expect(getByText('E-mail:')).toBeTruthy();
  expect(getByText('Senha:')).toBeTruthy();
});



