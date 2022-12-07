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

  const testData = [
    {x: 0, y: 2},
    {x: 5, y: 2},
    {x: 146, y: 2},
    {x: 152, y: 2},
    {x: 158, y: 2},
    {x: 173, y: 2},
    {x: 294, y: 2},
    {x: 298, y: 2},
    {x: 303, y: 2},
    {x: 307, y: 2},
    {x: 472, y: 2},
    {x: 482, y: 2},
    {x: 518, y: 2},
    {x: 535, y: 2},
    {x: 541, y: 2},
  ];

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
        data={{dataSets: [{label: 'Elevation', values: classicElevation}]}}
        drawGridBackground={false}
        borderColor={processColor('red')}
        borderWidth={1}
        drawBorders={true}
        ref={chart}
        onSelect={onSelect}
      />
    </View>
  );
}
