import {View} from 'react-native';
import Input from './input.component';
import React from 'react';

export default function UI({styles}) {
  return (
    <View style={styles.ui}>
      <Input style={styles.input} />
    </View>
  );
}
