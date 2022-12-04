import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function TouchIcon({callback, iconName, style, size = 24}) {
  return <Ionicons style={style} name={iconName} size={size} />;
}
