import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, ImageBackground, Alert } from 'react-native';

import imageBackground from '../../assets/bg.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const aumentarBotao = useRef(new Animated.Value(1)).current;
  const animPulso = useRef(new Animated.Value(1)).current;

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

  return (
    <ImageBackground source={imageBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#504379" />
        <View style={styles.titleContainer}>
          <Animated.View style={[styles.tituloMain, { transform: [{ scale: animPulso }] }]}>
            <Text style={styles.tituloSorteia}>Sorteia</Text>
            <Text style={styles.tituloJoke}>Joke</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Text style={styles.titulo}>Faça seu Login</Text>
          <TextInput
            style={styles.inputForm}
            placeholder="Informe seu Email..."
            value={email}
            onChangeText={value => setEmail(value)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputForm}
            placeholder="... e a sua Senha ;)"
            value={senha}
            onChangeText={value => setSenha(value)}
            maxLength={8}
            autoCapitalize="none"
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={[styles.botao, { transform: [{ scale: aumentarBotao }] }]}
            onPress={() => navigation.navigate('TelaPrincipal')}
            onPressIn={botaoPressionado}
            onPressOut={botaoSolto}
            activeOpacity={1}
          >
            <Text style={styles.tituloBotao}>ENTRAR</Text>
          </TouchableOpacity>

          <Text style={styles.linkNav}>
            <Text style={styles.linkText} onPress={() => navigation.navigate('RecuperarSenha')}>
              Esqueceu sua senha?
            </Text>
            <Text style={styles.separador}> | </Text>
            <Text style={styles.linkText} onPress={() => navigation.navigate('Cadastro')}>
              Não tem uma conta?
            </Text>
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  tituloMain: {
    flexDirection: 'row',
  },
  tituloSorteia: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#504379',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 5,
    paddingRight: 2,
    paddingLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tituloJoke: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#504379',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderWidth: 1.2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#504379',
    width: '50%',
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
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
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 12,
    color: '#333333',
  },
  separador: {
    marginHorizontal: 5,
    color: '#333333',
  },
});
