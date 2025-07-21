import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import styles from '../global/GlobalStyles'

export default function HomeScreen({navigation}) {
    return (
        <ImageBackground
            source={require('../../assets/autocooler.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <TouchableOpacity onPress={() => navigation.navigate('ListarUsuarios')}>
                <Text style={styles.card}>Listar Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.card}>Cadastrar Usuário</Text>
            </TouchableOpacity>

        </ImageBackground>
    )
}