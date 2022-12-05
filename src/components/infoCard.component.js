import {View} from 'react-native';
import React from 'react';

export default function InfoCard({isVisible, styles, message}) {
  if (isVisible) {
    console.log('informationnnnn!!!!');
    return <View style={styles.infoCard}>{message}</View>;
  }
  return <></>;
}
