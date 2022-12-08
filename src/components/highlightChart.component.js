import {Text, View} from 'react-native';
export default function HighlightChart({
  styles,
  children,
  startPoint,
  width,
  screenWidth,
  text,
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
      {startPoint && (
        <View style={updatedStyle}>
          <Text style={styles.highlightText}>Inclination: {text}%</Text>
        </View>
      )}
    </View>
  );
}
