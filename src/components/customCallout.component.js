import {Callout} from 'react-native-maps';
import React from 'react';
import {Text, View} from 'react-native';
import IconButton from './iconButton.component';

export default function CustomCallout({useDarkTheme, styles}) {
  return (
    <Callout tooltip={true}>
      <View style={styles.callout}>
        <Text style={styles.calloutText}>Start here</Text>
        {/* <IconButton
          buttonStyle={styles.circleButton}
          iconStyle={styles.icon}
          iconName={'checkmark-circle'}
          callback={() => console.log('start point selected.')}
        /> */}
      </View>
    </Callout>
  );
}
