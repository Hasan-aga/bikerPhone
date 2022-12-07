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
          drawCircles: false,
        },
      },
    ],
  };

  function onSelect({nativeEvent}) {
    const data = nativeEvent.data;
    if (!data) {
      return;
    }

    console.log('data:', data);

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
        borderColor={processColor('red')}
        borderWidth={1}
        drawBorders={true}
        ref={chart}
        onSelect={onSelect}
        legend={{enable: false}}
        chartDescription={{text: ''}}
        xAxis={{drawGridLines: false}}
        yAxis={{drawGridLines: false}}
        dragDecelerationEnabled={false}
      />
    </View>
  );
}
