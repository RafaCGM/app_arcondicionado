import React from 'react';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

// Telas gerais
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import GeralScreen from './src/screens/GeralScreen';

// Telas CRUD
import ListarUsuariosScreen from './src/screens/admin/usuarios/ListarUsuariosScreen';
import CadastroScreen from './src/screens/admin/usuarios/CadastroScreen';
import DadosUsuarioScreen from './src/screens/admin/usuarios/DadosUsuarioScreen';

import ListarEspacosScreen from './src/screens/admin/espaco/ListarEspacosScreen';
import CadastroEspacoScreen from './src/screens/admin/espaco/CadastroEspacoScreen';
import DadosEspacoScreen from './src/screens/admin/espaco/DadosEspacoScreen';

import ListarEquipamentosScreen from './src/screens/admin/equipamento/ListarEquipamentosScreen';
import CadastroEquipamentoScreen from './src/screens/admin/equipamento/CadastroEquipamentoScreen';
import DadosEquipamentoScreen from './src/screens/admin/equipamento/DadosEquipamentoScreen';

import ListarMonitoramentosScreen from './src/screens/admin/monitoramento/ListarMonitoramentosScreen';
import CadastroMonitoramentoScreen from './src/screens/admin/monitoramento/CadastroMonitoramentoScreen';
import DadosMonitoramentoScreen from './src/screens/admin/monitoramento/DadosMonitoramentoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';  // Ícone de casa do Feather
              break;
            case 'Dashboard':
              iconName = focused ? 'activity' : 'activity';  // Ícone do Dashboard do Feather
              break;
            case 'Geral':
              iconName = focused ? 'list' : 'list';  // Ícone de lista do Feather
              break;
            case 'CRUD':
              iconName = focused ? 'settings' : 'settings';  // Ícone de CRUD do Feather
              break;
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Geral" component={GeralScreen} />
      <Tab.Screen name="Dashboard" component={PerfilScreen} />
      <Tab.Screen name="CRUD" component={ConfigScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={BottomTabsNavigator} />

        {/* Telas CRUD */}
        <Stack.Screen name="Cadastrar Usuário" component={CadastroScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Lista de Usuários" component={ListarUsuariosScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Dados do Usuário" component={DadosUsuarioScreen} options={{ headerShown: true }} />

        <Stack.Screen name="Lista de Espaços" component={ListarEspacosScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Cadastro de Espaço" component={CadastroEspacoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Dados do Espaço" component={DadosEspacoScreen} options={{ headerShown: true }} />

        <Stack.Screen name="Lista de Equipamentos" component={ListarEquipamentosScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Cadastro de Equipamento" component={CadastroEquipamentoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Dados do Equipamento" component={DadosEquipamentoScreen} options={{ headerShown: true }} />

        <Stack.Screen name="Lista de Monitoramentos" component={ListarMonitoramentosScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Cadastro de Monitoramento" component={CadastroMonitoramentoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Dados do Monitoramento" component={DadosMonitoramentoScreen} options={{ headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
