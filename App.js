import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';
import TelaPrincipal from './Components/TelaPrincipal/TelaPrincipal';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro}
          options={{ title: "Cadastro", headerShown: false }}
        />
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}
          options={{ title: "TelaPrincipal", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;