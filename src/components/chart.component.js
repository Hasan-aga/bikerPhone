import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

export default function Chart({styles, data}) {
  return (
    <View style={styles.chartContainer}>
      <LineChart data={data} adjustToWidth={true} />
    </View>
  );
}
