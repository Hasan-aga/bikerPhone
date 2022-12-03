import {TouchableHighlight, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function TouchIcon({callback, iconName, style, size = 24}) {
  return (
    <TouchableHighlight onPress={callback}>
      <Ionicons style={style} name={iconName} size={size} />
    </TouchableHighlight>
  );
}
