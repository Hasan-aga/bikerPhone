import {Leg} from './routeTypes';

export const relateDistanceAcrossLegs = (
  legs: Leg[],
): {label: number; value: number}[] => {
  const elevation_range: {label: number; value: number}[] = [];

  legs.forEach((leg, index) => {
    //  each elevation_range is array of [distance, elevation]
    // distance of current leg must be incremented by last distance of prev leg
    // if index === 0 -> increment = 0
    //  if index > 0 -> increment = prevLeg.elevation_range.at(-1)[0]
    const lastElevationRange =
      index > 0 ? legs[index - 1].elevation_range.at(-1) : undefined;
    const increment = lastElevationRange ? lastElevationRange[0] : 0;
    const fixedElevationRange = leg.elevation_range.map(elevation => {
      const distance = elevation[0] + increment;
      return {label: distance, value: elevation[1]};
    });

    elevation_range.push(...fixedElevationRange);
  });
  return elevation_range;
};
