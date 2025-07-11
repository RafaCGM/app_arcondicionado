import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import styles from '../global/GlobalStyles'

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Sistema de Ar condicionado</Text>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input}/>
                <Text style={styles.label}>Password:</Text>
                <TextInput style={styles.input}/>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}