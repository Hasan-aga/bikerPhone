import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

export default function Chart({styles, data}) {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={100}
        adjustToWidth={true}
        areaChart
        hideDataPoints
        isAnimated
        animationDuration={1200}
        startFillColor="#0BA5A4"
        startOpacity={1}
        endOpacity={0.3}
        initialSpacing={0}
        spacing={30}
        thickness={2}
        yAxisColor="#0BA5A4"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
    </View>
  );
}
