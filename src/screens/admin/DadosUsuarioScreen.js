import React from "react";
import axios from 'axios'
import { server } from '../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"

import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

import styles from '../../global/GlobalStyles'

export default function DadosUsuarioScreen({navigation}) {
    const [idusuario, setIdUsuario] = useState('')
    const [matricula, setMatricula] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            //alert('OK ' + route.params.idusuario)
            getUsuario()
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                //setLoad(true)
                route.params = null
            };
        }, [route.params.idusuario])
    );

    let getUsuario = async () => {
        console.log('Id: ' + route.params.idusuario)
        try {
            console.log(`${server}/usuarios/get`)
            const user = await axios.post(`${server}/usuarios/get`, {
                idusuario: route.params.idusuario,
            })
            setIdUsuario(user.data.res.idusuario)
            setMatricula(user.data.res.matricula)
            setNome(user.data.res.nome)
            setEmail(user.data.res.email)
        } catch (e) {
            //showError(e)
            // @TODO
            // Colocar msg erro com Modal
            console.log(e)
        }
    }

    const update = async () => {
        try {
            console.log(`${server}/usuarios/update`)
            const res = await axios.post(`${server}/usuarios/update`, {
                idusuario: idusuario,
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
            //showError(e)
            console.log(e)
            alert(e)
        }
    }

    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Dados de Usuário</Text>
                <Text style={styles.label}>Id. Usuário:</Text>
                <TextInput style={styles.input}
                    value={idusuario}
                />
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
                <Text style={styles.label}>Password:</Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={update}
                >
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}