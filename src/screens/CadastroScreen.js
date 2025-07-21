import axios from 'axios'
import { server } from '../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../global/GlobalStyles'

export default function CadastroScreen({navigation}) {
    const [idUsuario, setIdUsuario] = useState('')
    const [matricula, setMatricula] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signup = async () => {
        try {
            console.log(`${server}/usuarios/signup`)
            const res = await axios.post(`${server}/usuarios/signup`, {
                matricula: matricula,
                nome: nome,
                email: email,
                password: password,
            })

            if (res.data.num_erro == 0) {

                alert(res.data.msg)
                navigation.goBack()
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Cadastro de Usuário</Text>
                <Text style={styles.label}>Matrícula:</Text>
                <TextInput style={styles.input}
                    value={matricula}
                    onChangeText={(matricula => setMatricula(matricula))}
                />
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input}
                    value={nome}
                    onChangeText={(nome => setNome(nome))}
                />
                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={(email => setEmail(email))}
                />
                <Text style={styles.label}>Senha:</Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={signup}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text> Já possui uma conta? Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}