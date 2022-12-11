import IconOrBusy from './IconOrBusy.component';
import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
export default function ToggleArrow({styles, toggle, cardVisible}) {
  const [rotation] = useState(new Animated.Value(0));
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: cardVisible ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [cardVisible]);

  const updatedStyle = {
    ...styles.cardArrow,
    transform: [{rotate: rotateInterpolation}],
  };
  return (
    <Animated.View style={updatedStyle} onTouchEnd={() => toggle()}>
      <IconOrBusy iconName="chevron-down-outline" iconStyle={styles.icon} />
    </Animated.View>
  );
}
