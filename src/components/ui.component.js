import {View} from 'react-native';
import Input from './input.component';
import React from 'react';
import IconButton from './iconButton.component';

export default function UI({styles, setcoords}) {
  return (
    <View style={styles.ui}>
      <Input styles={styles} setcoords={setcoords} />
    </View>
  );
}
