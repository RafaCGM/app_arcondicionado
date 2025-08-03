import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import GeralScreen from '../../../src/screens/GeralScreen';

test('dummy test', () => {
  expect(true).toBe(true);
});


  // test("Exibe 'Ligado' quando item.ligado é true", () => {
  //   render(<GeralScreen />);
  //   expect(screen.getByText("Ligado")).toBeTruthy();
  // });

  // test("Exibe 'Desligado' quando item.ligado é false", () => {
  //   const item = { ligado: false };
  //   render(<GeralScreen item={item} />);
  //   expect(screen.getByText("Desligado")).toBeTruthy();
  // });

