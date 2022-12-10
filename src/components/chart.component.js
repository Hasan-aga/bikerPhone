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
import calculateTotalInclination from '../utils/calculateInclination';
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
      const width = this.end - this.start;
      return Math.abs(width) > 10 ? width : null;
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

  // function onSelect(event) {
  //   const {nativeEvent} = event;
  //   const data = nativeEvent.data;
  //   if (!data) {
  //     return;
  //   }

  //   const hightlightPoint = {
  //     coordinate: {
  //       distance: data.x,
  //       elevation: data.y,
  //     },
  //   };

  //   setdataPoint(hightlightPoint.coordinate);

  //   const hightlightPointCoordinates = getCoordinatesFromDistance(
  //     hightlightPoint.coordinate.distance,
  //     classicElevation,
  //     path,
  //   );

  //   sethightlightPoint(hightlightPointCoordinates);
  // }

  function getStartPoint(event) {
    const {nativeEvent} = event;
    const min = 26;
    const max = width - 15;
    if (inRange(nativeEvent.locationX, min, max)) {
      setBoxDimensions({...boxDimensions, start: nativeEvent.locationX});
      setInclinationData({...inclinationData, start: dataPoint});
    }
  }
  function getMovingPoint(event) {
    const {nativeEvent} = event;
    const min = 26;
    const max = 340;
    const highlightWidth = max - min;

    if (inRange(nativeEvent.locationX, min, max)) {
      setBoxDimensions({...boxDimensions, end: nativeEvent.locationX});
      setInclinationData({...inclinationData, end: dataPoint});
      inclinationData.getInclination();
      // getting elevationData
      // translate the tap location to data index
      const dataIndex = translateIndex(
        nativeEvent.locationX,
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
      console.log(hightlightPoint);
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
      onResponderEnd={clearBox}>
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
