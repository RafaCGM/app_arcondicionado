import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import GeralScreen from '../../../src/screens/GeralScreen';
import { NavigationContainer } from '@react-navigation/native';


test('Renderiza a tela GeralScreen sem falhas', () => {
  render(
    <NavigationContainer>
      <GeralScreen />
    </NavigationContainer>
  );
});

test('Exibe nome da sala se ela existir', async () => {
  const { findByText } = render(
    <NavigationContainer>
      <GeralScreen />
    </NavigationContainer>
  );
  // Se houver mock de uma sala com número "69"
  expect(await findByText('69')).toBeTruthy();
});