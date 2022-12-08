import {View} from 'react-native';
export default function HighlightChart({
  styles,
  children,
  startPoint,
  width,
  screenWidth,
}) {
  const updatedStyle =
    width >= 0
      ? {...styles.highlightChart, width, left: startPoint}
      : {
          ...styles.highlightChart,
          width: Math.abs(screenWidth - width),
          right: startPoint,
        };
  return (
    <View>
      {children}
      <View style={updatedStyle} />
    </View>
  );
}
