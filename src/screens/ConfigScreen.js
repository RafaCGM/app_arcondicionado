import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from '../styles/ConfigScreenStyles';

export default function ConfigScreen({ navigation }) {
    const options = [
        { icon: "users", label: "Usuários", route: "Lista de Usuários" },
        { icon: "map", label: "Espaços", route: "Lista de Espaços" },
        { icon: "cpu", label: "Equipamentos", route: "Lista de Equipamentos" },
        { icon: "activity", label: "Monitoramentos", route: "Lista de Monitoramentos" },
        { icon: "wifi", label: "MQTT Teste", route: "MQTT Teste" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.waveContainer}></View>
            <View style={styles.waveContainerBottom}></View>

            <View style={styles.gridContainer}>
                {options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.gridItem}
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <Feather name={item.icon} size={32} color="#4CAF50" />
                        <Text style={styles.gridLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
