import {ActivityIndicator, View} from 'react-native';
import TouchIcon from './touchIcon.component';
import React from 'react';

export default function IconButton({
  buttonStyle,
  iconStyle,
  isBusy,
  callback,
  iconName,
}) {
  return (
    <View style={buttonStyle}>
      {isBusy ? (
        <ActivityIndicator />
      ) : (
        <TouchIcon style={iconStyle} callback={callback} iconName={iconName} />
      )}
    </View>
  );
}
