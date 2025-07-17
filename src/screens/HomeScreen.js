import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import styles from '../global/GlobalStyles'

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.card}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Text style={styles.card}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text style={styles.card}>Teste</Text>
            </TouchableOpacity>
        </View>
    )
}