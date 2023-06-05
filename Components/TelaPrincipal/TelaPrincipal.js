import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Share, StyleSheet, Text, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import imageBackground from '../../assets/bg.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const TelaPrincipal = () => {
  const navigation = useNavigation();

  const [piada, setPiada] = useState('');
  const [botaoPressionado, setBotaoPressionado] = useState(false);

  const aumentarBotao = useRef(new Animated.Value(1)).current;

  const checarBotaoPressionado = (buttonScale) => {
    Animated.spring(buttonScale, {
      toValue: 1.3,
      useNativeDriver: true,
    }).start();
  };

  const checarBotaoSolto = (buttonScale) => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    pegarPiada();
  }, []);

  const pegarPiada = async () => {
    try {
      const response = await fetch('https://api-de-piadas.herokuapp.com/piadas');
      const data = await response.json();

      const pegarID = Math.floor(Math.random() * data.length);
      const randomJoke = data[pegarID];

      setPiada(randomJoke.piada);
    } catch (error) {
      console.error(error);
    }
  };

  const BotaoCompartilhar = async () => {
    try {
      await Share.share({
        message: piada,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const AnimPulso = useRef(new Animated.Value(1)).current;

  const startPulsatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(AnimPulso, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(AnimPulso, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  useEffect(() => {
    startPulsatingAnimation();
  }, []);

  return (
    <ImageBackground source={imageBackground} style={styles.imageBackground}>
      <View style={styles.header}>
        <StatusBar style="dark" backgroundColor="#33FFAD" />
        <Text style={styles.headerTitulo}>SorteiaJoke</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.homeIcon}>
          <Icon name="home" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloTexto}>Só as Piores das Piores ;)</Text>
      </View>
      <View style={styles.containerMain}>
        <View style={styles.containerJoke}>
          <Text style={styles.textoPiada}>{piada}</Text>
          <TouchableOpacity
            style={[
              styles.botaoGerar,
              { transform: [{ scale: AnimPulso }], backgroundColor: botaoPressionado ? '#00995C' : '#33FFAD' },
            ]}
            onPress={pegarPiada}
            onPressIn={() => setBotaoPressionado(true)}
            onPressOut={() => setBotaoPressionado(false)}
            activeOpacity={1}
          >
            <Text style={styles.textoBotao}>Gerar Piada</Text>
            <Icon name="refresh" size={20} color="#000000" style={styles.iconeBotao} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.botaoCompartilhar, { transform: [{ scale: aumentarBotao }] }]}
          onPress={BotaoCompartilhar}
          onPressIn={() => checarBotaoPressionado(aumentarBotao)}
          onPressOut={() => checarBotaoSolto(aumentarBotao)}
          activeOpacity={1}
        >
          <Text style={styles.textoBotao}>Compartilhar</Text>
          <Icon name="share" size={20} color="#000000" style={styles.iconeBotao} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#33FFAD',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 31,
  },
  headerTitulo: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginLeft: 40,
  },
  homeIcon: {
    marginRight: 15,
  },
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerJoke: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  textoPiada: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  botaoGerar: {
    backgroundColor: '#33FFAD',
    height: 40,
    marginTop: 10,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  botaoCompartilhar: {
    backgroundColor: '#33FFAD',
    width: '50%',
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginRight: 5,
  },
  iconeBotao: {
    marginRight: 5,
  },
  tituloContainer: {
    position: 'absolute',
    top: '30%',
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
});

export default TelaPrincipal;
