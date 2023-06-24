import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, ImageBackground, Alert } from 'react-native';

import imageBackground from '../../assets/bg.png';

export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState(null);

  const aumentarBotao = useRef(new Animated.Value(1)).current;
  const animPulso = useRef(new Animated.Value(1)).current;

  const isEmail = (email) => {
    const check = /\S+@\S+\.\S+/;
    return check.test(email);
  };

  React.useEffect(() => {
    setBackgroundColorAsync("#000000");
  });

  useEffect(() => {
    const pulso = Animated.loop(
      Animated.sequence([
        Animated.timing(animPulso, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animPulso, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulso.start();

    return () => pulso.stop();
  }, [animPulso]);

  const botaoPressionado = () => {
    Animated.spring(aumentarBotao, {
      toValue: 1.3,
      useNativeDriver: true,
    }).start();
  };

  const botaoSolto = () => {
    Animated.spring(aumentarBotao, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const alertaRecuperar = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const validarEmail = () => {
    if (!email) {
      alertaRecuperar('Erro', 'Campo vazio');
    } else if (!isEmail(email)) {
      alertaRecuperar('Erro', 'Email inválido');
    } else {
      alertaRecuperar('Recuperar Senha', 'Algo vai aqui :)');
    }
  };

  return (
    <ImageBackground source={imageBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#0080FF" />
        <View style={styles.tituloContainer}>
          <Text style={styles.tituloTexto}>ESQUECEU SUA SENHA?</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.titulo}>Informe o seu Email</Text>
          <TextInput
            style={styles.inputForm}
            placeholder="Informe seu Email aqui..."
            onChangeText={email => setEmail(email)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={[styles.botao, { transform: [{ scale: aumentarBotao }] }]}
            onPress={validarEmail}
            onPressIn={botaoPressionado}
            onPressOut={botaoSolto}
            activeOpacity={1}
          >
            <Text style={styles.tituloBotao}>CONFIRMAR</Text>
          </TouchableOpacity>

          <Text style={styles.linkNav} onPress={() => navigation.navigate('Login')}>
            Voltar à Página Inicial
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloContainer: {
    bottom: '5%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tituloTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10
  },
  content: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    top: '2%',
    padding: 20,
    borderWidth: 1.2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#333333',
    marginBottom: 20,
  },
  inputForm: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
  },
  botao: {
    backgroundColor: '#0080FF',
    width: '50%',
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tituloBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  linkNav: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#333333',
  },
});
