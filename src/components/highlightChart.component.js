import {View} from 'react-native';
import React from 'react';
export default function HighlightChart({
  styles,
  children,
  startPoint,
  width,
  screenWidth,
}) {
  const updatedStyle =
    width > 0
      ? {...styles.highlightChart, width, left: startPoint}
      : {
          ...styles.highlightChart,
          width: -width,
          right: screenWidth - startPoint,
        };
  return (
    <View>
      {children}
      <View style={updatedStyle} />
    </View>
  );
}
