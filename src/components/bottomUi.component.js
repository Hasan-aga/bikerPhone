import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AnimatedView} from './animatedView.component';
export default function BottomUi({styles, cardVisible, children}) {
  const yPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(yPosition, {
      toValue: cardVisible ? 0 : 200,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [cardVisible]);

  const Test = Animated.createAnimatedComponent(AnimatedView);

  return (
    <Test style={{transform: [{translateY: yPosition}]}}>
      <View style={styles.bottomUi}>{children}</View>
    </Test>
  );
}
