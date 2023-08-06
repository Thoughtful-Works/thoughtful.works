import { GridGenerator, Hex, HexUtils } from "react-hexgrid";

export enum Direction {
  UpLeft = 1,
  UpRight = 2,
  Right = 3,
  DownRight = 4,
  DownLeft = 5,
  Left = 6,
}

export const ring = (
  center: Hex,
  mapRadius: number,
  startingDirection: Direction = 4
): Hex[] => {
  let hexas: Hex[] = [];
  let hex = HexUtils.add(
    center,
    // Direction 4 is somehow a magic number to stay centered
    HexUtils.multiply(HexUtils.direction(4), mapRadius)
  );
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < mapRadius; j++) {
      hexas.push(hex);
      hex = HexUtils.neighbour(hex, i);
    }
  }
  return hexas;
};

export const spiral = (center: Hex, mapRadius: number): Hex[] => {
  let results = [center];
  for (let k = 1; k <= mapRadius; k++) {
    const temp = ring(center, k);
    results = results.concat(temp);
  }
  return results;
};
