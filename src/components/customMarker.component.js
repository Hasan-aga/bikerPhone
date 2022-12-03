import {Marker} from 'react-native-maps';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import CustomCallout from './customCallout.component';

export default function CustomMarker({
  coordinate,
  title,
  description,
  useDarkTheme,
  styles,
}) {
  function onPress(input) {
    console.log(
      `marker was pressed at ${input.nativeEvent.coordinate.latitude}`,
    );
  }

  return (
    <View>
      <Marker
        coordinate={coordinate}
        title={title}
        description={description}
        onPress={onPress}
        calloutOffset={{
          x: 1,
          y: 0,
        }}>
        <CustomCallout useDarkTheme={useDarkTheme} styles={styles} />
      </Marker>
    </View>
  );
}
