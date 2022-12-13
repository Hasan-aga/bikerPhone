export default function getCoordinatesFromDistance(
  distance,
  elevationRange,
  path,
) {
  const highlightedPointIndex = elevationRange.findIndex(
    data => data.x === distance,
  );

  // TODO: find a new way to get highlighted points since we have multiple legs in the path
  const highlitedPoint = path.flat()[highlightedPointIndex];

  return {
    coordinate: {
      ...highlitedPoint,
    },
  };
}
