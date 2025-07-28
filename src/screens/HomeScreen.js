import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Onda superior */}
      <View style={styles.waveTop} />
   
      <Text style={styles.title}>Bem-vindo ao TechAir</Text>
      <Text style={styles.subtitle}>Sua experiência tecnológica começa aqui!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GeralScreen')} 
      >
        <Text style={styles.buttonText}>Explorar Agora</Text>
      </TouchableOpacity>

      {/* Onda inferior */}
      <View style={styles.waveBottom} />

      <Image
        source={require('../../assets/arcondicionado.png')} 
        style={styles.acImage}
      />
    </View>
  );
}
