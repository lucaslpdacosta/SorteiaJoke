import React from 'react';
import { View, Text, Button } from 'react-native';

const Piadas = ({ piada, Compartilhar }) => {
    return (
        <View>
            <Text>{piada}</Text>
            <Button title="Compartilhar" onPress={Compartilhar} />
        </View>
    );
};

export default Piadas;
