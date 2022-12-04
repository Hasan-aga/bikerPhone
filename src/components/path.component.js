import {Polyline} from 'react-native-maps';
import {useContext, useEffect, useState} from 'react';
import {pointsContext} from '../context/points.context';
import {getRoute} from '../utils/getRoute';
import React from 'react';

export default function Path() {
  const [points] = useContext(pointsContext);
  const [path, setPath] = useState();
  const pathPoints = points.permanent;
  console.log('path pointsssss:', pathPoints.length);

  useEffect(() => {
    if (pathPoints.length < 2) {
      console.log('not enough pathPoints= ', pathPoints.length);
      return;
    }
    const getPathData = async () => {
      try {
        const results = await getRoute(pathPoints);
        const modifiedResults = results.path.map(coordinates => {
          return {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };
        });
        setPath(modifiedResults);
      } catch (error) {
        console.log(`failed to get path because ${error}`);
      }
    };
    getPathData();
  }, [pathPoints, setPath]);

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
