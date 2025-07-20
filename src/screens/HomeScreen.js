import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import styles from '../global/GlobalStyles'

export default function HomeScreen({navigation}) {
    return (
        <ImageBackground
            source={require('../../assets/autocooler.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.card}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Text style={styles.card}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ListarUsuarios')}>
                <Text style={styles.card}>Listar Usuarios</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}