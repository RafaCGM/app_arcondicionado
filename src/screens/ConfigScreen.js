import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

import styles from '../styles/ConfigScreenStyles'

export default function ConfigScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.waveContainer}></View>
            <View style={styles.waveContainerBottom}></View>
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity onPress={() => navigation.navigate('Lista de Usuários')} style={styles.button}>
                    <Text style={styles.buttonText}>Listar Usuários</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Lista de Espaços')} style={styles.button}>
                    <Text style={styles.buttonText}>Listar Espaços</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Lista de Equipamentos')} style={styles.button}>
                    <Text style={styles.buttonText}>Equipamentos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Lista de Monitoramentos')} style={styles.button}>
                    <Text style={styles.buttonText}>Monitoramentos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}