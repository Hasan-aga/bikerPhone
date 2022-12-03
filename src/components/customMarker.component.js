import {Marker} from 'react-native-maps';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomMarker({
  coordinate,
  title,
  description,
  useDarkTheme,
}) {
  return (
    <Marker coordinate={coordinate} title={title} description={description} />
  );
}
