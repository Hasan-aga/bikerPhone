import {View} from 'react-native';
import React from 'react';
export default function BottomUi({styles, children}) {
  return <View style={styles.bottomUi}>{children}</View>;
}
