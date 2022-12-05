import {
  ActivityIndicator,
  Pressable,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import TouchIcon from './touchIcon.component';
import React from 'react';

export default function IconButton({
  buttonStyle,
  buttonContainer,
  iconStyle,
  isBusy,
  callback,
  iconName,
  children,
}) {
  return (
    <TouchableHighlight
      style={buttonStyle}
      onPress={callback}
      underlayColor="#999">
      <>
        {children}
        {isBusy ? (
          <ActivityIndicator />
        ) : (
          <TouchIcon style={iconStyle} iconName={iconName} />
        )}
      </>
    </TouchableHighlight>
  );
}
