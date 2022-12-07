export default function getCoordinatesFromDistance(
  distance,
  elevationRange,
  path,
) {
  const highlightedPointIndex = elevationRange.findIndex(
    data => data.x === distance,
  );

  const highlitedPoint = path.flat()[highlightedPointIndex];

  return {
    coordinate: {
      ...highlitedPoint,
    },
  };
}
