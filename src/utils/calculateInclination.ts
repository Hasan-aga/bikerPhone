// This is a simple TypeScript app that calculates the inclination along a path

import {Elevation} from './adjustElevationData';

// Define the type for the path data
type PathData = {
  x: number;
  y: number;
}[];

// Define the function that calculates the inclination
export function calculateInclinationChatGpt(path: PathData): number[] {
  // Define the array that will hold the slope values
  const slopes: number[] = [];

  // Iterate over the path data
  for (let i = 1; i < path.length; i++) {
    // Get the coordinates of the current point and the previous point
    const x1 = path[i - 1].x;
    const y1 = path[i - 1].y;
    const x2 = path[i].x;
    const y2 = path[i].y;

    // Calculate the inclination of the line using the atan2 function
    const inclination = Math.atan2(y2 - y1, x2 - x1);

    // Calculate the slope of the line using the tan function
    const slope = Math.tan(inclination);

    // Check if the slope is not NaN or infinity
    if (!isNaN(slope) && isFinite(slope)) {
      // Add the slope to the array of slopes
      slopes.push(slope * 100);
    }
  }

  // Return the array of slopes
  console.log(slopes);

  return slopes;
}
// we get elevation across distance {x, y}[]
// we calculate inclination across distance
// ex: distance 40 -> inclination 2%, distance 200 -> inclination 1%
// we start at the first point we note its distance
// the second point is the one which is less than the point before it we also note its distance
// now we have dy
// dx is the distance diff of the two points

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
