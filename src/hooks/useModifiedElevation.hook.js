import {useContext} from 'react';
import {pathContext} from '../context/path.context';
import {getElevationDataset} from '../utils/adjustElevationData';

export function useModifiedElevation() {
  const {elevation} = useContext(pathContext);
  if (!elevation) {
    throw new Error('No elevation data!');
  }
  const modifiedElevation = getElevationDataset(elevation);
  return modifiedElevation;
}