import React from 'react';
import {Dimensions, useWindowDimensions, View} from 'react-native';
import {useModifiedElevation} from '../hooks/useModifiedElevation.hook';
import {LineChart} from 'react-native-charts-wrapper';

export default function Chart({styles}) {
  // const {classicElevation} = useModifiedElevation();
  // console.log(classicElevation);
  const {height, width} = useWindowDimensions();
  styles.chart.width = width;

  const testData = [
    {x: 0, y: 7},
    {x: 5, y: 7},
    {x: 146, y: 6},
    {x: 152, y: 6},
    {x: 158, y: 6},
    {x: 173, y: 6},
    {x: 294, y: 4},
    {x: 298, y: 4},
    {x: 303, y: 4},
    {x: 307, y: 4},
    {x: 472, y: 4},
    {x: 482, y: 4},
    {x: 518, y: 5},
    {x: 535, y: 5},
    {x: 541, y: 5},
  ];

  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={styles.chart}
        data={{dataSets: [{label: 'Elevation', values: testData}]}}
      />
    </View>
  );
}
