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
  const {classicElevation, totalInclination} = useElevation();
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
        return inclination;
      }
    },
  });

  const [boxDimensions, setBoxDimensions] = useState({
    start: null,
    end: null,
    getWidth: function () {
      // console.log(`start:${this.start}, end:${this.end}`);
      const width = this.end - this.start;
      return width;
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
      {
        label: 'Inclination (%)',
        values: totalInclination.map((p, i) => {
          return {x: classicElevation[i].x, y: p};
        }),
        config: {
          colors: [processColor(styles.softColor)],
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
    const min = 26;
    const max = width - 15;
    if (inRange(nativeEvent.pageX, min, max)) {
      setBoxDimensions({...boxDimensions, start: nativeEvent.pageX});
      setInclinationData({...inclinationData, start: dataPoint});
    }
  }
  function getMovingPoint(event) {
    const {nativeEvent} = event;
    console.log(nativeEvent);
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
            enabled: false,
            markerColor: processColor('#444'),
            textColor: processColor('#f7f7f7'),
          }}
        />
      </HighlightChart>
    </View>
  );
}
