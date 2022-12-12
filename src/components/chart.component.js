import React, {useContext, useEffect, useRef, useState} from 'react';
import {useWindowDimensions, View, processColor} from 'react-native';
import {useElevation} from '../hooks/useElevation.hook';
import {LineChart} from 'react-native-charts-wrapper';
import {pathContext} from '../context/path.context';
import getCoordinatesFromDistance from '../utils/getCoordinatesFromDistance';
import inRange from '../utils/inRange';
import HighlightChart from './highlightChart.component';
import translateIndex from '../utils/translateIndex';

export default function Chart({styles, sethightlightPoint}) {
  const {classicElevation} = useElevation();
  const {path} = useContext(pathContext);
  const {width} = useWindowDimensions();
  const updatedStyle = {...styles.chart, width};
  const [dataPoint, setdataPoint] = useState();
  const [inclinationData, setInclinationData] = useState({
    start: {distance: null, elevation: null},
    end: {distance: null, elevation: null},
    getInclination: function () {
      if (this.start && this.end) {
        const dx = Math.abs(this.end.distance - this.start.distance);
        const dy = Math.abs(this.end.elevation - this.start.elevation);
        const inclination = ((dy / dx) * 100).toFixed(1);
        return isNaN(inclination) ? '' : inclination;
      }
    },
  });

  const [boxDimensions, setBoxDimensions] = useState({
    start: null,
    end: null,
    getWidth: function () {
      return this.end - this.start;
    },
  });

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

  function getStartPoint(event) {
    const {nativeEvent} = event;
    console.log('started:', nativeEvent);
    const min = 26;
    const max = width - 15;
    if (inRange(nativeEvent.pageX, min, max)) {
      setBoxDimensions({
        ...boxDimensions,
        start: nativeEvent.pageX,
        end: nativeEvent.pageX,
      });
      setInclinationData({...inclinationData, start: dataPoint});
    }
  }
  function getMovingPoint(event) {
    const {nativeEvent} = event;
    console.log('we are moving', nativeEvent);
    // the chart is a portion of the view
    const min = width * 0.07;
    const max = width * 0.93;
    const highlightWidth = max - min;

    if (inRange(nativeEvent.pageX, min, max)) {
      setBoxDimensions({...boxDimensions, end: nativeEvent.pageX});
      setInclinationData({...inclinationData, end: dataPoint});
      inclinationData.getInclination();
      // getting elevationData
      // translate the tap location to data index
      const highlightStart = nativeEvent.pageX - min;
      const dataIndex = translateIndex(
        highlightStart,
        highlightWidth,
        classicElevation.length,
      );

      const hightlightPoint = {
        coordinate: {
          distance: classicElevation[dataIndex].x,
          elevation: classicElevation[dataIndex].y,
        },
      };

      setdataPoint(hightlightPoint.coordinate);

      const hightlightPointCoordinates = getCoordinatesFromDistance(
        hightlightPoint.coordinate.distance,
        classicElevation,
        path,
      );

      sethightlightPoint(hightlightPointCoordinates);
    }
  }

  function clearBox() {
    console.log('released.');
    setBoxDimensions({
      start: null,
      end: null,
      getWidth: function () {
        const width = this.end - this.start;
        return Math.abs(width) > 10 ? width : null;
      },
    });
  }

  return (
    <View
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      style={styles.chartContainer}
      onResponderStart={getStartPoint}
      onResponderMove={getMovingPoint}
      onResponderRelease={clearBox}>
      <HighlightChart
        styles={styles}
        width={boxDimensions.getWidth()}
        startPoint={boxDimensions.start}
        screenWidth={width}
        text={inclinationData.getInclination()}>
        <LineChart
          style={updatedStyle}
          textColor={processColor(styles.highLightColor)}
          data={data}
          drawGridBackground={false}
          drawBorders={false}
          legend={{enabled: true}}
          chartDescription={{text: 'Distance (meters)'}}
          xAxis={{
            drawGridLines: false,
            drawAxisLine: false,
            textSize: 11,
            textColor: processColor(styles.highLightColor),
          }}
          yAxis={{
            left: {
              drawGridLines: true,
              drawAxisLine: true,
              drawLabels: true,
              textColor: processColor(styles.highLightColor),
            },
            right: {
              drawGridLines: false,
              drawAxisLine: true,
              drawLabels: true,
              textColor: processColor(styles.highLightColor),
            },
          }}
          scaleXEnabled={false}
          scaleYEnabled={false}
          pinchZoom={false}
          marker={{
            enabled: false,
            markerColor: processColor('#444'),
            textColor: processColor('#f7f7f7'),
          }}
        />
      </HighlightChart>
    </View>
  );
}
