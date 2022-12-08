// we get elevation across distance {x, y}[]
// we calculate inclination across distance
// ex: distance 40 -> inclination 2%, distance 200 -> inclination 1%
// we start at the first point we note its distance
// the second point is the one which is less than the point before it we also note its distance
// now we have dy
// dx is the distance diff of the two points

import {Elevation} from './adjustElevationData';
interface InclinationPoint {
  index: number;
  x: number;
  y: number;
}
export default function calculateTotalInclination(
  data: Elevation,
  THRESHOLD = 2,
) {
  const inclinationPoints = [{...data[0], index: 0}];
  data.forEach((currentPoint, index) => {
    const nextPoint = data[index + 1];
    if (
      index < data.length - 1 &&
      isWithinThreshold(THRESHOLD, nextPoint.y, currentPoint.y)
    ) {
      inclinationPoints.push({...nextPoint, index});
    }
  });

  const result = calculateInclinations(inclinationPoints, data.length);

  console.log('Results: ', result);
  return result;
}

function isWithinThreshold(
  threshold: number,
  first: number,
  second: number,
): boolean {
  return Math.abs(first - second) >= threshold ? true : false;
}

function calculateInclinations(
  inclinationPoints: InclinationPoint[],
  dataSize: number,
) {
  const map1: Map<number, number> = new Map();
  inclinationPoints.forEach((point, index) => {
    if (index + 1 < inclinationPoints.length - 1) {
      const dx = Math.abs(point.x - inclinationPoints[index + 1].x);
      const dy = Math.abs(point.y - inclinationPoints[index + 1].y);

      const inclination = ((dy / dx) * 100).toFixed(2);
      map1.set(point.index, parseFloat(inclination));
    }
  });

  const zeroArray = new Array(dataSize).fill(0);
  for (const [key, value] of map1) {
    zeroArray[key] = value;
  }

  let currentInclination = zeroArray.find(p => p !== 0);
  const result = zeroArray.map(point => {
    if (point !== 0) {
      currentInclination = point;
    }
    return currentInclination;
  });

  console.log('map', map1);

  return result;
}
