import React from 'react';
import { Feather } from '@expo/vector-icons';  // Importando Feather
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas gerais
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import GeralScreen from './src/screens/GeralScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import MQTTTeste from './src/screens/mqtt/MQTTTeste';

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
            case 'Perfil':
              iconName = focused ? 'user' : 'user';  // Ícone de usuário do Feather
              break;
            case 'Geral':
              iconName = focused ? 'list' : 'list';  // Ícone de lista do Feather
              break;
            case 'Configurações':
              iconName = focused ? 'settings' : 'settings';  // Ícone de configurações do Feather
              break;
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Desabilita o cabeçalho no BottomTabs
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Geral" component={GeralScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Configurações" component={ConfigScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

        {/* Telas Gerais */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />

        {/* Telas CRUD */}
        <Stack.Screen
          name="Cadastrar Usuário"
          component={CadastroScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Lista de Usuários"
          component={ListarUsuariosScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Dados do Usuário"
          component={DadosUsuarioScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />

        <Stack.Screen
          name="Lista de Espaços"
          component={ListarEspacosScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Cadastro de Espaço"
          component={CadastroEspacoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Dados do Espaço"
          component={DadosEspacoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />

        <Stack.Screen
          name="Lista de Equipamentos"
          component={ListarEquipamentosScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Cadastro de Equipamento"
          component={CadastroEquipamentoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Dados do Equipamento"
          component={DadosEquipamentoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />

        <Stack.Screen
          name="Lista de Monitoramentos"
          component={ListarMonitoramentosScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Cadastro de Monitoramento"
          component={CadastroMonitoramentoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />
        <Stack.Screen
          name="Dados do Monitoramento"
          component={DadosMonitoramentoScreen}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />

        {/* Tela MQTTTeste */}
        <Stack.Screen
          name="MQTT Teste"
          component={MQTTTeste}
          options={{ headerShown: true }} // Habilita o header para essa tela
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
