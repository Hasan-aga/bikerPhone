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

  const data = {
    dataSets: [
      {
        label: 'Elevation (meters)',
        values: classicElevation,
        config: {
          colors: [processColor(styles.highLightColor)],
          highlightEnabled: true,
          drawCircles: false,
          circleRadius: 1,
          lineWidth: 3,
          circleColor: processColor('teal'),
          drawFilled: true,
          fillGradient: {
            colors: [
              processColor(styles.highLightColor),
              processColor(styles.primaryColor),
            ],
            positions: [0, 0.5],
            angle: 90,
            orientation: 'TOP_BOTTOM',
          },
          fillAlpha: 1000,
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
        textColor={processColor(styles.highLightColor)}
        data={data}
        drawGridBackground={false}
        drawBorders={false}
        onSelect={onSelect}
        legend={{enable: false}}
        chartDescription={{text: 'Distance (meters)'}}
        xAxis={{
          drawGridLines: false,
          textColor: processColor(styles.highLightColor),
        }}
        yAxis={{
          drawGridLines: false,
        }}
        dragDecelerationEnabled={false}
        scaleXEnabled={false}
        scaleYEnabled={false}
        pinchZoom={false}
        onChange={e => console.log()}
      />
    </View>
  );
}
