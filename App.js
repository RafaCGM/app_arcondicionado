import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas gerais
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import PerfilScreen from './src/screens/PerfilScreen'
import GeralScreen from './src/screens/GeralScreen';
import ConfigScreen from './src/screens/ConfigScreen';

// Telas de CRUD
import CadastroScreen from './src/screens/admin/CadastroScreen'
import ListarUsuariosScreen from './src/screens/admin/ListarUsuariosScreen'
import DadosUsuarioScreen from './src/screens/admin/DadosUsuarioScreen'

const Stack = createNativeStackNavigator(); 
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Geral':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Configurações':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" 
        component={HomeScreen}
      />
      <Tab.Screen name="Geral" 
        component={GeralScreen}
      />
      <Tab.Screen name="Perfil" 
        component={PerfilScreen}
      />
      <Tab.Screen name="Configurações" 
        component={ConfigScreen} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

        <Stack.Screen name="Login"
          component={LoginScreen} 
          options={{ headerShown: false}}
        />
        <Stack.Screen name="Main" 
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />



        <Stack.Screen name="Cadastrar Usuário"
          component={CadastroScreen}

        />
        <Stack.Screen name="Lista de Usuários"
         component={ListarUsuariosScreen}

        />
        <Stack.Screen name="Dados do Usuário"
         component={DadosUsuarioScreen}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}