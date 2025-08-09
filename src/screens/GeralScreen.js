import Paho from 'paho-mqtt';
import axios from 'axios';
import { server } from '../global/GlobalVars';

import React, { useState, useEffect} from "react"
import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native"
import { useFocusEffect } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons"
import styles from "../styles/GeralScreenStyles"

const client = new Paho.Client('10.44.1.35', 9001, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

export default function GeralScreen({ navigation }) {

  const [msg, setMsg] = useState()
  const [topic, setTopic] = useState()

  const [temp, setTemp] = useState(0);
  const [umid, setUmid] = useState(0);
  const [salas, setSalas] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [lastToggleTimes, setLastToggleTimes] = useState({});
  const [lastTempChangeTimes, setLastTempChangeTimes] = useState({});

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
    if (topic && topic.startsWith('ifrncang/temp/')) {
      let tempTmp = [];
      salas.forEach((e) => {
        if (topic === 'ifrncang/temp/' + e.num_espaco) {
          tempTmp.push({
            ...e,
            temperatura: msg
          });
        } else {
          tempTmp.push({ ...e });
        }
      });
      setSalas(tempTmp);
    }
  }, [msg, topic]);

  useEffect(() => {
    if (topic && topic.startsWith('ifrncang/umid/')) {
      setSalas(prevSalas =>
        prevSalas.map(e =>
          topic === 'ifrncang/umid/' + e.num_espaco
            ? { ...e, umidade: msg }
            : e
        )
      );
    }
  }, [msg, topic]);

  useEffect(() => {
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error('Connection lost:', responseObject.errorMessage);
      }
    };

    client.onMessageArrived = (message) => {
      setTopic(message.destinationName)
      setMsg(message.payloadString)

      if (message.destinationName.startsWith("ac/control/")) {
        const num_espaco = message.destinationName.split("/")[2];
        setSalas((prevSalas) =>
          prevSalas.map((sala) =>
            sala.num_espaco === num_espaco
              ? { ...sala, ligado: message.payloadString === "on" }
              : sala
          )
        );
      }
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
      const listaSalas = dt.data.res.map(espaco => {
        return {
          num_espaco: `${espaco.num_espaco}`,
          temperatura: temp,
          umidade: umid,
          ligado: Boolean(espaco.status),
          conectado: true,
        };
      });

      setSalas(listaSalas);

      listaSalas.forEach(sala => {
        client.subscribe(`ifrncang/temp/${sala.num_espaco}`);
        client.subscribe(`ifrncang/umid/${sala.num_espaco}`);
        client.subscribe(`ac/control/${sala.num_espaco}`);
      });

    } catch (e) {
      console.log(e);
    }
  };

  const togglePower = (sala) => {
    const now = Date.now();
    const lastTime = lastToggleTimes[sala.num_espaco] || 0;
    if (now - lastTime < 1500) {
      return;
    }
    setLastToggleTimes(prev => ({
      ...prev,
      [sala.num_espaco]: now
    }));

    const comando = sala.ligado ? "off" : "on";
    const mqttMessage = new Paho.Message(comando);
    mqttMessage.destinationName = `ac/control/${sala.num_espaco}`;
    client.send(mqttMessage);

    try {
      axios.post(`${server}/equipamento/updateStatus`, {
        num_espaco: sala.num_espaco,
        ligado: !sala.ligado
      });
    } catch (e) {
      console.log("Erro ao atualizar status no banco:", e);
    }

  };

  const aumentar = (sala) => {
    const now = Date.now();
    const lastTime = lastTempChangeTimes[sala.num_espaco] || 0;
    if (now - lastTime < 1000) {
      return;
    }
    setLastTempChangeTimes(prev => ({
      ...prev,
      [sala.num_espaco]: now
    }));

    const mqttMessage = new Paho.Message("up");
    mqttMessage.destinationName = `ac/control/${sala.num_espaco}`;
    client.send(mqttMessage);
  };

  const diminuir = (sala) => {
    const now = Date.now();
    const lastTime = lastTempChangeTimes[sala.num_espaco] || 0;
    if (now - lastTime < 1000) {
      return;
    }
    setLastTempChangeTimes(prev => ({
      ...prev,
      [sala.num_espaco]: now
    }));

    const mqttMessage = new Paho.Message("down");
    mqttMessage.destinationName = `ac/control/${sala.num_espaco}`;
    client.send(mqttMessage);
  };

  let index = 0;

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
        keyExtractor={espaco => espaco.num_espaco}
        renderItem={({ item }) => {

          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Feather name="monitor" size={20} color="#4B9CD3" />
                <Text style={styles.salaNome}>{item.num_espaco}</Text>
                <Feather
                  name={item.conectado ? "wifi" : "wifi-off"}
                  size={18}
                  color={item.conectado ? "green" : "red"}
                  style={{ marginLeft: 10 }}
                />
              </View>

              <View style={styles.statusRow}>
                <View style={styles.statusIcon1}>
                  <Feather name="thermometer" size={24} color="#1E90FF" />
                  <Text style={styles.temp}>{item.temperatura}°C</Text>
                </View>
                <View style={styles.statusIcon2}>
                  <Feather name="droplet" size={24} color="#1E90FF" />
                  <Text style={styles.temp}>{item.umidade}%</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => diminuir(item)}
                >
                  <Feather name="minus" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => aumentar(item)}
                >
                  <Feather name="plus" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.powerButton,
                    { backgroundColor: item.ligado ? "#34D399" : "#EF4444" }
                  ]}
                  onPress={() => togglePower(item)}
                >
                  <Feather name="power" size={20} color="#fff" />
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