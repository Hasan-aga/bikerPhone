import {getJsonFromFetch} from './getJsonFromFetch';
import {Route} from './routeTypes';

export const getRoute = async points => {
  const waypoints = points
    .map(p => {
      return `${p.coordinate.latitude},${p.coordinate.longitude}`;
    })
    .join('|');

  const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=bicycle&details=elevation`;

  try {
    const response = await getJsonFromFetch(url);
    const result = response as any as Route;
    return {path: result.features[0].geometry.coordinates[0]};
  } catch (e) {
    console.log('getRoute failed');
    throw e;
  }
};
