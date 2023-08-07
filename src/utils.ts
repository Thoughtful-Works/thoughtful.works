import wrap from "wrap-around";

import { Hex, HexUtils } from "react-hexgrid";
import { interpolate, interpolateTransformSvg } from "d3-interpolate";

export enum DefaultHexDirection {
  Right,
  UpRight,
  UpLeft,
  Left,
  DownLeft,
  DownRight,
}
export enum CustomHexDirection {
  UpLeft,
  UpRight,
  Right,
  DownRight,
  DownLeft,
  Left,
}
export type RingProgressDirection = "clockwise" | "counterclockwise";

export const RING_START_DIRECTION = DefaultHexDirection.UpLeft;
export const RING_PROGRESS_DIRECTION: RingProgressDirection = "clockwise";

export const getRingNeighbor = (originHex: Hex, index: number): Hex => {
  if (RING_PROGRESS_DIRECTION === "clockwise") {
    return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION - index));
  }
  return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION + index));
};

export const d3Interpolation = (
  begValue: any,
  endValue: any,
  attr: string | undefined
) => {
  // This condition is only needed if we're assigning `transform` attribute on the SVG element, which we're not (we're setting CSS attribute instead)
  // if (attr === "transform") {
  //   return interpolateTransformSvg(begValue, endValue);
  // }

  return interpolate(begValue, endValue);
};
