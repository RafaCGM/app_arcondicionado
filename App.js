import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './src/screens/LoginScreen'
import CadastroScreen from './src/screens/CadastroScreen'
import HomeScreen from './src/screens/HomeScreen'
import PerfilScreen from './src/screens/PerfilScreen'
import ListarUsuariosScreen from './src/screens/ListarUsuariosScreen'
import DadosUsuarioScreen from './src/screens/DadosUsuarioScreen'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Login'>
        <Drawer.Screen name="Login"
          component={LoginScreen} 
          options={{ headerShown: false, drawerItemStyle: { display: 'none' }}}
        />
        <Drawer.Screen name="Cadastro"
          component={CadastroScreen}
          options={{ drawerItemStyle: { display: 'none' }}}

        />
        <Drawer.Screen name="Home" 
          component={HomeScreen}
          
        />
        <Drawer.Screen name="Perfil"
         component={PerfilScreen}

        />
        <Drawer.Screen name="ListarUsuarios"
         component={ListarUsuariosScreen}
         options={{ drawerItemStyle: { display: 'none' }}}

        />
        <Drawer.Screen name="DadosUsuario"
         component={DadosUsuarioScreen}
         options={{ drawerItemStyle: { display: 'none' }}}

        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}