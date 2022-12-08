import {View} from 'react-native';
export default function HighlightChart({styles, children, startPoint, width}) {
  const updatedStyle =
    width > 0
      ? {...styles.highlightChart, width, left: startPoint}
      : {...styles.highlightChart, width: Math.abs(width), right: startPoint};
  return (
    <View>
      {children}
      <View style={updatedStyle} />
    </View>
  );
}
