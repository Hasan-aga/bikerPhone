export default function translateIndex(
  from: number,
  fromSize: number,
  toSize: number,
): number {
  return Math.floor((from % fromSize) * (toSize / fromSize));
}
