import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
export default function BottomUi({styles, cardVisible, children}) {
  const [yPosition] = useState(new Animated.Value(10));

  useEffect(() => {
    Animated.timing(yPosition, {
      toValue: cardVisible ? 0 : 200,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [cardVisible]);

  return (
    <Animated.View style={{transform: [{translateY: yPosition}]}}>
      <View style={styles.bottomUi}>{children}</View>
    </Animated.View>
  );
}
