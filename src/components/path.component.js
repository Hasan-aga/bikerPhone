import {Polyline} from 'react-native-maps';
import {useContext, useEffect, useState} from 'react';
import {pointsContext} from '../context/points.context';
import {getRoute} from '../utils/getRoute';
import React from 'react';
import {pathContext} from '../context/path.context';
import {relateDistanceAcrossLegs} from '../utils/adjustElevationData';

export default function Path() {
  const [points] = useContext(pointsContext);
  const {path, setPath, setElevation, elevation} = useContext(pathContext);
  const pathPoints = points.permanent;

  useEffect(() => {
    if (pathPoints.length < 2) {
      console.log('not enough pathPoints= ', pathPoints.length);
      return;
    }
    const getPathData = async () => {
      try {
        const results = await getRoute(pathPoints);
        const modifiedPath = results.path.map(coordinates => {
          return {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };
        });
        setPath(modifiedPath);

        const modifiedElevation = relateDistanceAcrossLegs(
          results.elevationData,
        );
        setElevation(modifiedElevation);
      } catch (error) {
        console.log(`failed to get path because ${error}`);
      }
    };
    getPathData();
  }, [pathPoints, setPath, setElevation]);

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
