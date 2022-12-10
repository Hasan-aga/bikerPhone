// This is a simple TypeScript app that calculates the inclination along a path

// Define the type for the path data
type PathData = {
  x: number;
  y: number;
}[];

// Define the function that calculates the inclination
export function calculateInclination(path: PathData): number[] {
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
