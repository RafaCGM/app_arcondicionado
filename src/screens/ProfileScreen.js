import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import styles from '../global/GlobalStyles'

export default function ProfileScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.card}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}