import React from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";

import styles from '../styles/PerfilScreenStyles';

export default function PerfilScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width;

  const dadosTemperatura = {
    labels: ["8h", "10h", "12h", "14h", "16h", "18h"],
    datasets: [{ data: [22, 24, 23, 25, 26, 24], strokeWidth: 2 }],
  };

  const dadosEnergia = {
    labels: ["6h", "9h", "12h", "15h", "18h", "21h"],
    datasets: [
      {
        data: [30, 45, 40, 60, 55, 70],
        colors: [
          (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text testID="dash" style={styles.title}>Dashboard</Text>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Feather name="home" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Salas Monitoradas</Text>
          <Text style={styles.boxValue}>12</Text>
        </View>
        <View style={styles.box}>
          <Feather name="activity" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Ar Ligados</Text>
          <Text style={styles.boxValue}>7</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Feather name="thermometer" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Temp. Média</Text>
          <Text style={styles.boxValue}>23°C</Text>
        </View>
        <View style={styles.box}>
          <Feather name="clock" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Atualização</Text>
          <Text style={styles.boxValue}>há 2 min</Text>
        </View>
      </View>

      <Text style={styles.title}>Histórico de Temperatura</Text>
      <LineChart
        data={dadosTemperatura}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#E8F5E9",
          backgroundGradientTo: "#FFFFFF",
          color: () => "#4CAF50",
        }}
        bezier
        style={styles.chart}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 40 }}>
        <TouchableOpacity style={[styles.controlButton, { width: "45%" }]}>
          <Feather name="refresh-cw" size={20} color="#fff" />
          <Text style={[styles.powerText, { marginLeft: 8 }]}>Atualizar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { width: "45%" }]}
          onPress={() => navigation.navigate("Configurações")}
        >
          <Feather name="settings" size={20} color="#fff" />
          <Text style={[styles.powerText, { marginLeft: 8 }]}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
