import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Ondas coloridas no topo */}
      <View style={styles.waveLayer1} />
      <View style={styles.waveLayer2} />
      <View style={styles.waveLayer3} />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao TechAir</Text>
        <Text style={styles.subtitle}>
          Sua experiência tecnológica começa aqui!
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Geral')}
        >
          <Text style={styles.buttonText}>Explorar Agora</Text>
        </TouchableOpacity>
      </View>

      {/* Onda grande na parte inferior */}
      <View style={styles.bottomWaveContainer}>
        <View style={styles.bottomWave} />
        <Image
          source={require('../../assets/arcondicionado.png')}
          style={styles.acImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
