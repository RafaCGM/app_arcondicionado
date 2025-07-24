import React from "react"
import { View, Text, TouchableOpacity} from "react-native"

import styles from '../global/GlobalStyles'

export default function ConfigScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Lista de Usuários')}>
                <Text style={styles.button}>Listar Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Lista de Espaços')}>
                <Text style={styles.button}>Listar Espaços</Text>
            </TouchableOpacity>
        </View>
    )
}