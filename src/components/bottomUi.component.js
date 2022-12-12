import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
export default function BottomUi({styles, cardVisible, children}) {
  const yPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(yPosition, {
      toValue: cardVisible ? 0 : 200,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [cardVisible]);

  const AnimatedView = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
  );

  return (
    <AnimatedView style={{transform: [{translateY: yPosition}]}}>
      <View style={styles.bottomUi}>{children}</View>
    </AnimatedView>
  );
}
