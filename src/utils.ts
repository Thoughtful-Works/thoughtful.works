import wrap from "wrap-around";

import { Hex, HexUtils } from "react-hexgrid";

export enum HexDirection {
  Right,
  UpRight,
  UpLeft,
  Left,
  DownLeft,
  DownRight,
}
export type RingProgressDirection = "clockwise" | "counterclockwise";

export const RING_START_DIRECTION = HexDirection.UpLeft;
export const RING_PROGRESS_DIRECTION: RingProgressDirection = "clockwise";

export const getRingNeighbor = (originHex: Hex, index: number): Hex => {
  if (RING_PROGRESS_DIRECTION === "clockwise") {
    return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION - index));
  }
  return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION + index));
};
