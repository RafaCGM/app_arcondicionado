import Paho from 'paho-mqtt';
import axios from 'axios';
import { server } from '../global/GlobalVars';

import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";

import { Feather } from "@expo/vector-icons";
import styles from '../styles/PerfilScreenStyles';

const client = new Paho.Client('10.44.1.35', 9001, 'reactNativeClientId_' + parseInt(Math.random() * 100000));
const MAX_PONTOS = 60;

export default function PerfilScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const [numSalas, setNumSalas] = useState(0);
  const [labels, setLabels] = useState([]);
  const [ultimaTemp, setUltimaTemp] = useState(null);
  const [numArLigados, setNumArLigados] = useState(0);
  const [historicoTemp, setHistoricoTemp] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchSalas() {
        try {
          const res = await axios.post(`${server}/espaco/list`, {});
          if (res.data && res.data.res) {
            const todasSalas = res.data.res;

            setNumSalas(todasSalas.length);

            const arLigados = todasSalas.filter(sala => Boolean(sala.status));
            setNumArLigados(arLigados.length);
          }
        } catch (e) {
          console.log(e);
        }
      }
      fetchSalas();
      return () => { };
    }, [])
  );

  useEffect(() => {
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error('MQTT conexão perdida:', responseObject.errorMessage);
      }
    };

    client.onMessageArrived = (message) => {
      const temp = parseFloat(message.payloadString);
      if (!isNaN(temp)) {
        setUltimaTemp(temp);
        setHistoricoTemp(prev => {
          const novo = [...prev, temp];

          return novo.length > 15 ? novo.slice(novo.length - 15) : novo;
        });
      }
    };

    client.connect({
      onSuccess: () => {
        client.subscribe('ifrncang/temp/140');
      },
      onFailure: (error) => {
        console.error('MQTT falha ao conectar:', error);
      },
      useSSL: false,
      timeout: 3,
    });

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    setLabels(Array(historicoTemp.length).fill(""));
  }, [historicoTemp]);

  const dadosTemperatura = {
    labels: labels,
    datasets: [{
      data: historicoTemp,
      strokeWidth: 2
    }],
  };

  const mediaTemp = historicoTemp.length > 0
    ? (historicoTemp.reduce((a, b) => a + b, 0) / historicoTemp.length).toFixed(1)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <Text testID="dash" style={styles.title}>Dashboard</Text>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Feather name="home" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Salas Monitoradas</Text>
          <Text style={styles.boxValue}>{numSalas}</Text>
        </View>
        <View style={styles.box}>
          <Feather name="activity" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Ar Ligados</Text>
          <Text style={styles.boxValue}>{numArLigados}</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Feather name="thermometer" size={30} color="#4CAF50" />
          <Text style={styles.boxLabel}>Temp. Média</Text>
          <Text style={styles.boxValue}>{mediaTemp}°C</Text>
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
        withDots
        withShadow
        withInnerLines
        withOuterLines
        formatYLabel={yValue => `${parseInt(yValue)}°C`}
        fromZero={true}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 40 }}>
        <TouchableOpacity
          style={[styles.controlButton, { width: "45%" }]}
          onPress={() => setHistoricoTemp([])}
        >
          <Feather name="refresh-cw" size={20} color="#fff" />
          <Text style={[styles.powerText, { marginLeft: 8 }]}>Limpar Gráfico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { width: "45%" }]}
          onPress={() => navigation.navigate("CRUD")}
        >
          <Feather name="settings" size={20} color="#fff" />
          <Text style={[styles.powerText, { marginLeft: 8 }]}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
