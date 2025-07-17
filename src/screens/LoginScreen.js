import axios from 'axios'
import { server } from '../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../global/GlobalStyles'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('123456')

    const signin = async () => {
        try {
            const res = await axios.post(`${server}/usuarios/signin`,
                {
                    email: email,
                    password: password
                }
            )

            if (res.data.num_erro == 0) {

                alert(res.data.msg)
                navigation.navigate('Home')
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}> Sistema de Ar condicionado </Text>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={(email => setEmail(email))}
                />

                <Text style={styles.label}> Password: </Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={signin}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text> Não possui uma conta? Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}