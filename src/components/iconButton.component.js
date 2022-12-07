import {
  ActivityIndicator,
  Pressable,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import TouchIcon from './touchIcon.component';
import React from 'react';
import IconOrBusy from './IconOrBusy.component';

export default function IconButton({
  buttonStyle,
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
        <IconOrBusy isBusy={isBusy} iconStyle={iconStyle} iconName={iconName} />
      </>
    </TouchableHighlight>
  );
}
