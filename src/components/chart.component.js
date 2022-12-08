import React, {useContext, useEffect, useRef, useState} from 'react';
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
import inRange from '../utils/inRange';
import HighlightChart from './highlightChart.component';

export default function Chart({styles, sethightlightPoint}) {
  const {classicElevation} = useElevation();
  const {path} = useContext(pathContext);
  const {width} = useWindowDimensions();
  const updatedStyle = {...styles.chart, width};

  const [boxDimensions, setBoxDimensions] = useState({
    start: null,
    end: null,
    getWidth: function () {
      const width = this.end - this.start;
      return Math.abs(width) > 10 ? width : null;
    },
  });
  const [startNewBox, setstartNewBox] = useState(false);

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

  function onSelect(event) {
    const {nativeEvent} = event;
    // TODO: save selected point to local state so we use it to calc inclination
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

  function clearBox(setBoxDimensions, setstartNewBox, boxDimensions) {
    setBoxDimensions({start: null, end: null, getWidth: () => 0});
    setstartNewBox(false);
    console.log('new box', boxDimensions);
  }

  function getStartPoint(event) {
    const {nativeEvent} = event;
    const min = 26;
    const max = 340;

    if (inRange(nativeEvent.locationX, min, max)) {
      setBoxDimensions({
        ...boxDimensions,
        start: nativeEvent.locationX,
        end: nativeEvent.locationX,
      });
    }
  }
  function getEndPoint(event) {
    const {nativeEvent} = event;
    const min = 26;
    const max = 340;
    if (inRange(nativeEvent.locationX, min, max)) {
      setBoxDimensions({...boxDimensions, end: nativeEvent.locationX});
    }
  }

  return (
    <View
      onStartShouldSetResponder={() => true}
      style={styles.chartContainer}
      onResponderStart={getStartPoint}
      onResponderMove={getEndPoint}>
      <HighlightChart
        styles={styles}
        width={boxDimensions.getWidth()}
        startPoint={boxDimensions.start}
        screenWidth={width}>
        <LineChart
          style={updatedStyle}
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
          scaleXEnabled={false}
          scaleYEnabled={false}
          pinchZoom={false}
          marker={{
            enabled: true,
            markerColor: processColor('#444'),
            textColor: processColor('#f7f7f7'),
          }}
        />
      </HighlightChart>
    </View>
  );
}
