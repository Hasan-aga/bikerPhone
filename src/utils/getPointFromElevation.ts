import {Route} from './routeTypes';

export const getPointFromDistance = (
  distance: number,
  pathData: Route,
): Point => {
  const elevation_range = relateDistanceAcrossLegs(
    pathData.features[0].properties.legs,
  );
  const hoveredIndex = elevation_range.findIndex(data => data[0] === distance);

  const hoveredPoint =
    pathData.features[0].geometry.coordinates.flat()[hoveredIndex];

  return {
    type: 'temporary',
    coords: {lat: hoveredPoint[1], lng: hoveredPoint[0]},
  };
};
