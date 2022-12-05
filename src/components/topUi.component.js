import {View} from 'react-native';
import Input from './input.component';
import React from 'react';
import TouchIcon from './touchIcon.component';
import LocationButton from './locationButton.component';
import IconButton from './iconButton.component';

export default function TopUi({
  styles,
  setcoords,
  useDarkTheme,
  setuseDarkTheme,
  children,
}) {
  return (
    <View style={styles.ui}>
      <Input styles={styles} setcoords={setcoords} placeholder="Search..." />
      <LocationButton styles={styles} setCoords={setcoords} />
      <IconButton
        buttonStyle={
          useDarkTheme ? styles.darkCircleButton : styles.circleButton
        }
        iconStyle={useDarkTheme ? styles.yellowIcon : styles.icon}
        callback={setuseDarkTheme}
        iconName={useDarkTheme ? 'sunny' : 'moon'}
      />
      {children}
    </View>
  );
}
