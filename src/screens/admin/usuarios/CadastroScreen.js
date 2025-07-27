import React from 'react';
import axios from 'axios'
import { server } from '../../../global/GlobalVars';

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";

import styles from '../../../global/GlobalStyles'

export default function CadastroScreen({ navigation }) {
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
                password: password
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
            {/* Container das ondas */}
            <View style={styles.waveContainer}>
                <View style={styles.wave}></View>
                <View style={styles.waveSecond}></View>
            </View>

            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Cadastro de Usuário</Text>

                {/* Campos de entrada */}
                <Text style={styles.label}>Matrícula:</Text>
                <TextInput style={styles.input} value={matricula} onChangeText={setMatricula} />

                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome} />

                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                <Text style={styles.label}>Senha:</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true} />

                <TouchableOpacity onPress={signup}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}