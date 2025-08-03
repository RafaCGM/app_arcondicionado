import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import PerfilScreen from '../../../src/screens/PerfilScreen';

//falta add no documento
test("Verificando se", ()=>{
    render(<PerfilScreen />)
    expect(screen.getByText("Dashboard")).toBeTruthy();
    expect(screen.getByTestId("dash")).toBeTruthy(); 
})

