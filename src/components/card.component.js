import {Text, View} from 'react-native';
import React from 'react';

export default function Card({styles}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Start here</Text>
    </View>
  );
}
