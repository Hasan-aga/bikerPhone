import {
  ActivityIndicator,
  Pressable,
  TouchableHighlight,
  View,
} from 'react-native';
import TouchIcon from './touchIcon.component';
import React from 'react';

export default function IconButton({
  buttonStyle,
  iconStyle,
  isBusy,
  callback,
  iconName,
  children,
}) {
  return (
    <Pressable onPress={callback}>
      <View style={buttonStyle}>
        {children}
        {isBusy ? (
          <ActivityIndicator />
        ) : (
          <TouchIcon style={iconStyle} iconName={iconName} />
        )}
      </View>
    </Pressable>
  );
}
