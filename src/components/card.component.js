import {Text, View} from 'react-native';
import React from 'react';
import IconButton from './iconButton.component';

export default function Card({styles}) {
  function addPoint({input}) {
    console.log(`adding a point in ${input}`);
  }

  return (
    <View style={styles.card}>
      <IconButton
        iconName="add-outline"
        callback={addPoint}
        buttonStyle={styles.textAndIconButton}
        iconStyle={styles.icon}>
        <Text style={styles.cardText}>Start here</Text>
      </IconButton>
      <IconButton
        iconName="add-outline"
        callback={addPoint}
        buttonStyle={styles.textAndIconButton}
        iconStyle={styles.icon}>
        <Text style={styles.cardText}>Set as destination</Text>
      </IconButton>
    </View>
  );
}
