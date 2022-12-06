import React from 'react';
import {Dimensions, View} from 'react-native';
import {useModifiedElevation} from '../hooks/useModifiedElevation.hook';
import {LineChart} from 'react-native-charts-wrapper';

export default function Chart({styles}) {
  const {classicElevation} = useModifiedElevation();
  console.log(classicElevation);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={styles.chart}
        data={{dataSets: [{label: 'Elevation', values: classicElevation}]}}
      />
    </View>
  );
}
