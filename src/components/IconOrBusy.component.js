import {ActivityIndicator, View} from 'react-native';
import TouchIcon from './touchIcon.component';
import React from 'react';

export default function IconOrBusy({isBusy, iconStyle, iconName}) {
  const component = isBusy ? (
    <ActivityIndicator size="large" />
  ) : (
    <TouchIcon style={iconStyle} iconName={iconName} />
  );

  return component;
}
