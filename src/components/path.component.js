import {Polyline} from 'react-native-maps';
import {useContext, useEffect, useState} from 'react';
import {pointsContext} from '../context/points.context';
import {getRoute} from '../utils/getRoute';
import React from 'react';
import {pathContext} from '../context/path.context';
import {relateDistanceAcrossLegs} from '../utils/adjustElevationData';

export default function Path({setgettingData, path, setPath, setElevation}) {
  const [points] = useContext(pointsContext);
  const pathPoints = points.permanent;

  useEffect(() => {
    if (pathPoints.length < 2) {
      console.log('not enough pathPoints= ', pathPoints.length);
      return;
    }
    const getPathData = async () => {
      try {
        console.log('calling api');
        setgettingData(true);
        const results = await getRoute(pathPoints);
        setgettingData(false);
        const modifiedPath = results.path.map(coordinates => {
          return {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };
        });
        setPath(modifiedPath);

        // const modifiedElevation = relateDistanceAcrossLegs(
        //   results.elevationData,
        // );
        setElevation(results.elevationData);
      } catch (error) {
        setgettingData(false);
        console.log(`failed to get path because ${error}`);
      }
    };
    getPathData();
  }, [pathPoints, setPath, setElevation, setgettingData]);

  return (
    <>
      {path && (
        <Polyline
          coordinates={path}
          strokeWidth={2}
          strokeColor="red"
          tappable={true}
          onPress={() => console.log('path was pressed.')}
        />
      )}
    </>
  );
}
