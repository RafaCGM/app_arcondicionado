import Paho from 'paho-mqtt';
import axios from 'axios'
import { server } from '../global/GlobalVars';

import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList, ScrollView, Animated, Easing } from "react-native"
import { useFocusEffect } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons"
import styles from "../styles/GeralScreenStyles"

const client = new Paho.Client('broker.emqx.io', 8083, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

export default function GeralScreen({ navigation }) {

  const [msg, setMsg] = useState()
  const [topic, setTopic] = useState()

  const [temp, setTemp] = useState(0);
  const [salas, setSalas] = useState([]);
  const [alertas, setAlertas] = useState([]);

  const ondaAnim = new Animated.Value(0);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if (client.isConnected()) {
        list();
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {

    let tempTmp = new Array()
    console.log(salas)
    salas.map((e, i) => {
      console.log(e.nome)
      console.log(topic)
      console.log('ifrncang/temp/s' + e.nome)
      if (topic == 'ifrncang/temp/s' + e.nome) {
        tempTmp.push({
          'nome': e.nome,
          'temperatura': msg,
          'ligado': e.ligado,
          'conectado': e.conectado,
        })
      } else {
        tempTmp.push({
          'nome': e.nome,
          'temperatura': e.temperatura,
          'ligado': e.ligado,
          'conectado': e.conectado,
        })
      }
    }
    )
    console.log("Dados de Temp")
    console.log(tempTmp)
    setSalas(tempTmp)

  }, [msg]);



  useEffect(() => {
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error('Connection lost:', responseObject.errorMessage);
      }
    };

    client.onMessageArrived = (message) => {
      console.log('Message arrived:', message.payloadString, 'on topic:', message.destinationName);
      setTopic(message.destinationName)
      setMsg(message.payloadString)
    };

    client.connect({
      onSuccess: () => {
        list();
      },
      onFailure: (error) => {
        console.error('Connection failed:', error);
      },
      useSSL: false,
      timeout: 3,
    });

    return () => {
      client.disconnect();
    };
  }, []);


  const list = async () => {
    try {
      const dt = await axios.post(`${server}/espaco/list`, {});

      const listaSalas = dt.data.res.map(espaco => ({
        nome: `${espaco.num_espaco}`,
        temperatura: temp,
        ligado: true,
        conectado: true,
      }));

      setSalas(listaSalas);

      listaSalas.forEach(sala => {
        client.subscribe(`ifrncang/temp/s${sala.nome}`);
      });

    } catch (e) {
      console.log(e);
    }
  };

  Animated.loop(
    Animated.timing(ondaAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start()

  const translateX = ondaAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  })

  let index = 0
  return (
    <ScrollView style={styles.container}>

      {alertas.length > 0 && (
        <View style={styles.alertBox}>
          <Feather name="alert-triangle" size={20} color="#DC2626" />
          <View style={{ marginLeft: 10 }}>
            {alertas.map((msg, idx) => (
              <Text key={idx} style={styles.alertText}>{msg}</Text>
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={salas}
        keyExtractor={espaco => espaco.nome}
        renderItem={({ item }) => {

          return (
            <View key={index} style={styles.card}>
              <Animated.View
                style={[styles.wave, { transform: [{ translateX }] }]}
              />
              <View style={styles.cardHeader}>
                <Feather name="monitor" size={20} color="#4B9CD3" />
                <Text style={styles.salaNome}>{item.nome}</Text>
                <Feather
                  name={item.conectado ? "wifi" : "wifi-off"}
                  size={18}
                  color={item.conectado ? "green" : "red"}
                  style={{ marginLeft: 10 }}
                />
              </View>

              <View style={styles.statusRow}>
                <Feather name="thermometer" size={24} color="#1E90FF" />
                <Text style={styles.temp}>{item.temperatura}°C</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.controlButton} onPress={() => ajustarTemperatura(index, -1)}>
                  <Feather name="minus" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => ajustarTemperatura(index, 1)}>
                  <Feather name="plus" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: item.ligado ? "#34D399" : "#EF4444" }]}
                  onPress={() => toggleAr(index)}
                >
                  <Feather name={item.ligado ? "power" : "power"} size={20} color="#fff" />
                  <Text style={styles.powerText}>{item.ligado ? "Ligado" : "Desligado"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />



    </ScrollView>
  )
}
