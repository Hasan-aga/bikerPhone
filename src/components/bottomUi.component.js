import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
export default function BottomUi({styles, cardVisible, children}) {
  const updatedStyle = {...styles.bottomUi, bottom: cardVisible ? 0 : -200};
  return <View style={updatedStyle}>{children}</View>;
}
