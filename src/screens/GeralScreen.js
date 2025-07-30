import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from "react-native"
import { Feather } from "@expo/vector-icons"
import styles from "../styles/GeralScreenStyles"

export default function GeralScreen({ navigation }) {
  const salasIniciais = [
    { nome: "Sala 101", temperatura: 22, ligado: true, conectado: true },
    { nome: "Sala 102", temperatura: 24, ligado: false, conectado: false },
    { nome: "Sala 103", temperatura: 20, ligado: true, conectado: true },
    { nome: "Sala 104", temperatura: 26, ligado: true, conectado: true },
  ]

  const [salas, setSalas] = useState(salasIniciais)
  const [alertas, setAlertas] = useState([])
  const ondaAnim = new Animated.Value(0)

  const toggleAr = (index) => {
    const novasSalas = [...salas]
    novasSalas[index].ligado = !novasSalas[index].ligado
    setSalas(novasSalas)
  }

  const ajustarTemperatura = (index, delta) => {
    const novasSalas = [...salas]
    const novaTemp = Math.min(30, Math.max(16, novasSalas[index].temperatura + delta))
    novasSalas[index].temperatura = novaTemp
    setSalas(novasSalas)

    if (novaTemp > 28 || novaTemp < 18) {
      setAlertas((prev) => [...prev, `${novasSalas[index].nome} com temperatura crítica: ${novaTemp}°C`])
    }
  }

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

      {salas.map((sala, index) => (
        <View key={index} style={styles.card}>
          <Animated.View
            style={[styles.wave, { transform: [{ translateX }] }]}
          />
          <View style={styles.cardHeader}>
            <Feather name="monitor" size={20} color="#4B9CD3" />
            <Text style={styles.salaNome}>{sala.nome}</Text>
            <Feather
              name={sala.conectado ? "wifi" : "wifi-off"}
              size={18}
              color={sala.conectado ? "green" : "red"}
              style={{ marginLeft: 10 }}
            />
          </View>

          <View style={styles.statusRow}>
            <Feather name="thermometer" size={24} color="#1E90FF" />
            <Text style={styles.temp}>{sala.temperatura}°C</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.controlButton} onPress={() => ajustarTemperatura(index, -1)}>
              <Feather name="minus" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => ajustarTemperatura(index, 1)}>
              <Feather name="plus" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.powerButton, { backgroundColor: sala.ligado ? "#34D399" : "#EF4444" }]}
              onPress={() => toggleAr(index)}
            >
              <Feather name={sala.ligado ? "power" : "power"} size={20} color="#fff" />
              <Text style={styles.powerText}>{sala.ligado ? "Ligado" : "Desligado"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
