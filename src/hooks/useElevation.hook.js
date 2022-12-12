import {useContext, useMemo} from 'react';
import {pathContext} from '../context/path.context';
import {
  getElevationDataset,
  relateDistanceAcrossLegs,
} from '../utils/adjustElevationData';
import calculateTotalInclination from '../utils/calculateInclination';

export function useElevation() {
  const {elevation} = useContext(pathContext);
  if (!elevation) {
    throw new Error('No elevation data!');
  }
  return useMemo(() => {
    return {
      // modifiedElevation: getElevationDataset(elevation),
      classicElevation: relateDistanceAcrossLegs(elevation),
      totalInclination: calculateTotalInclination(
        relateDistanceAcrossLegs(elevation),
      ),
    };
  }, [elevation]);
}
