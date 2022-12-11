import {View, Animated} from 'react-native';
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
      <View onStartShouldSetResponder={event => true} style={styles.bottomUi}>
        {children}
      </View>
    </Animated.View>
  );
}
