import React, {useContext, useRef} from 'react';
import {
  Dimensions,
  useWindowDimensions,
  View,
  processColor,
} from 'react-native';
import {useElevation} from '../hooks/useElevation.hook';
import {LineChart} from 'react-native-charts-wrapper';
import {pathContext} from '../context/path.context';
import useGetCoordinates from '../utils/getCoordinatesFromDistance';
import getCoordinatesFromDistance from '../utils/getCoordinatesFromDistance';

export default function Chart({styles, sethightlightPoint}) {
  const {classicElevation} = useElevation();
  const {path} = useContext(pathContext);
  const {width} = useWindowDimensions();
  styles.chart.width = width;
  const chart = useRef();

  const data = {
    dataSets: [
      {
        label: 'Elevation',
        values: classicElevation,
        config: {
          colors: [processColor(styles.highLightColor)],

          drawCircles: false,
          circleRadius: 1,
          lineWidth: 3,
          circleColor: processColor('teal'),
        },
      },
    ],
  };

  function onSelect({nativeEvent}) {
    const data = nativeEvent.data;
    if (!data) {
      return;
    }

    const hightlightPoint = {
      coordinate: {
        latitude: data.x,
        longitude: data.y,
      },
    };

    const hightlightPointCoordinates = getCoordinatesFromDistance(
      hightlightPoint.coordinate.latitude,
      classicElevation,
      path,
    );

    sethightlightPoint(hightlightPointCoordinates);
  }

  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={styles.chart}
        data={data}
        drawGridBackground={false}
        drawBorders={false}
        ref={chart}
        onSelect={onSelect}
        legend={{enable: false}}
        chartDescription={{text: ''}}
        xAxis={{
          drawGridLines: false,
          textColor: processColor(styles.highLightColor),
        }}
        yAxis={{
          drawGridLines: false,
          textColor: processColor('teal'),
        }}
        dragDecelerationEnabled={false}
      />
    </View>
  );
}
