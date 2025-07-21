import React from "react"
import { View, Text, TouchableOpacity} from "react-native"

import styles from '../global/GlobalStyles'

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ListarUsuarios')}>
                <Text style={styles.card}>Listar Usuários</Text>
            </TouchableOpacity>
        </View>
    )
}