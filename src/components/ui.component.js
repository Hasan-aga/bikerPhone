import {View} from 'react-native';
import Input from './input.component';
import React from 'react';
import IconButton from './iconButton.component';
import LocationButton from './locationButton.component';

export default function UI({styles, setcoords}) {
  return (
    <View style={styles.ui}>
      <View style={styles.horizontalContainer}>
        <Input styles={styles} setcoords={setcoords} />
        <LocationButton styles={styles} setCoords={setcoords} />
      </View>
    </View>
  );
}
