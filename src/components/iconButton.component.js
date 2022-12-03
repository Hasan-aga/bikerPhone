import {TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function IconButton({callback, iconName, styles, size = 24}) {
  return (
    <TouchableHighlight onPress={callback}>
      <Ionicons style={styles.icon} name={iconName} size={size} />
    </TouchableHighlight>
  );
}
