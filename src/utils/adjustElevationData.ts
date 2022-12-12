import {Leg} from './routeTypes';

export type Elevation = {
  x: number;
  y: number;
}[];
/** Returns elvation/distance data in the form  [{label:.. , value:..}] */
export const relateDistanceAcrossLegs = (legs: Leg[]): Elevation => {
  const elevation_range: Elevation = [];

  let legIncrement = 0;
  legs.forEach((leg, index) => {
    //  each elevation_range is array of [distance, elevation]
    // distance of current leg must be incremented by last distance of prev leg
    // if index === 0 -> increment = 0
    //  if index > 0 -> increment = prevLeg.elevation_range.at(-1)[0]

    const lastElevationRange =
      index > 0
        ? legs[index - 1].elevation_range[
            legs[index - 1].elevation_range.length - 1
          ]
        : undefined;
    const increment = lastElevationRange
      ? lastElevationRange[0] + legIncrement
      : 0;
    console.log(increment);
    legIncrement += increment;

    const fixedElevationRange = leg.elevation_range.map(elevation => {
      const distance = elevation[0] + increment;

      return {x: distance, y: elevation[1]};
    });

    elevation_range.push(...fixedElevationRange);
  });
  return elevation_range;
};

interface ElevationDataset {
  labels: number[];
  datasets: [
    {
      data: number[];
    },
  ];
}
/** Returns elvation/distance data in the form {labels:[], datasets:{data:[]}} */
export const getElevationDataset = (legs: Leg[]): ElevationDataset => {
  const elevation_range: ElevationDataset = {
    labels: [],
    datasets: [{data: []}],
  };

  legs.forEach((leg, index) => {
    const lastElevationRange =
      index > 0 ? legs[index - 1].elevation_range.at(-1) : undefined;
    const increment = lastElevationRange ? lastElevationRange[0] : 0;
    leg.elevation_range.forEach(elevation => {
      const distance = elevation[0] + increment;
      elevation_range.labels.push(distance);
      elevation_range.datasets[0].data.push(elevation[1]);
    });
  });
  return elevation_range;
};
