export default function inRange(
  numberToCheck: number,
  min: number,
  max: number,
): boolean {
  return numberToCheck >= min && numberToCheck <= max;
}
