// Reference: https://www.redblobgames.com/grids/hexagons/
// Geometry based on "pointy" hexagons

import { CSSProperties } from "react";
import { Hex, HexUtils } from "react-hexgrid";
import wrap from "wrap-around";
import {
  CustomHexDirection,
  DefaultHexDirection,
  RingProgressDirection,
} from "./hexTypes";

export type PetalTransform =
  | CSSProperties
  | {
      [key in "transform" | "transformOrigin"]:
        | string
        | number
        | Array<string | number>;
    };
export type FlowerTransform = {
  [key in CustomHexDirection]: PetalTransform;
};

export const RING_START_DIRECTION = DefaultHexDirection.UpLeft;
export const RING_PROGRESS_DIRECTION: RingProgressDirection = "clockwise";

export const FlowerTransforms: {
  [key in "start" | "enter" | "leave"]: FlowerTransform;
} = {
  start: {
    [CustomHexDirection.UpLeft]: {
      transform: `perspective(1000px) rotate3d(-1.75, 1, 0, 180deg)`,
      transformOrigin: `75% 87.5%`,
    },
    [CustomHexDirection.UpRight]: {
      transform: `perspective(1000px) rotate3d(1.75, 1, 0, 180deg)`,
      transformOrigin: `25% 87.5%`,
    },
    [CustomHexDirection.Right]: {
      transform: `perspective(1000px) rotate3d(0, 1, 0, 180deg)`,
      transformOrigin: `0 50%`,
    },
    [CustomHexDirection.DownRight]: {
      transform: `perspective(1000px) rotate3d(1.75, -1, 0, 180deg)`,
      transformOrigin: `25% 12.5%`,
    },
    [CustomHexDirection.DownLeft]: {
      transform: `perspective(1000px) rotate3d(-1.75, -1, 0, 180deg)`,
      transformOrigin: `75% 12.5%`,
    },
    [CustomHexDirection.Left]: {
      transform: `perspective(1000px) rotate3d(0, -1, 0, 180deg)`,
      transformOrigin: `100% 50%`,
    },
  },
  enter: {
    [CustomHexDirection.UpLeft]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `75% 87.5%`,
    },
    [CustomHexDirection.UpRight]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `25% 87.5%`,
    },
    [CustomHexDirection.Right]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `0 50%`,
    },
    [CustomHexDirection.DownRight]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `25% 12.5%`,
    },
    [CustomHexDirection.DownLeft]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `75% 12.5%`,
    },
    [CustomHexDirection.Left]: {
      transform: [`perspective(1000px) rotate3d(0, 0, 0, 0deg)`],
      transformOrigin: `100% 50%`,
    },
  },
  leave: {
    [CustomHexDirection.UpLeft]: {
      transform: [`perspective(1000px) rotate3d(-1.75, 1, 0, 180deg)`],
      transformOrigin: `75% 87.5%`,
    },
    [CustomHexDirection.UpRight]: {
      transform: [`perspective(1000px) rotate3d(1.75, 1, 0, 180deg)`],
      transformOrigin: `25% 87.5%`,
    },
    [CustomHexDirection.Right]: {
      transform: [`perspective(1000px) rotate3d(0, 1, 0, 180deg)`],
      transformOrigin: `0 50%`,
    },
    [CustomHexDirection.DownRight]: {
      transform: [`perspective(1000px) rotate3d(1.75, -1, 0, 180deg)`],
      transformOrigin: `25% 12.5%`,
    },
    [CustomHexDirection.DownLeft]: {
      transform: [`perspective(1000px) rotate3d(-1.75, -1, 0, 180deg)`],
      transformOrigin: `75% 12.5%`,
    },
    [CustomHexDirection.Left]: {
      transform: [`perspective(1000px) rotate3d(0, -1, 0, 180deg)`],
      transformOrigin: `100% 50%`,
    },
  },
};

export const ring = (
  center: Hex,
  mapRadius: number,
  startingDirection: DefaultHexDirection = DefaultHexDirection.DownLeft
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

export const getRingNeighbor = (originHex: Hex, index: number): Hex => {
  if (RING_PROGRESS_DIRECTION === "clockwise") {
    return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION - index));
  }
  return HexUtils.neighbour(originHex, wrap(6, RING_START_DIRECTION + index));
};
