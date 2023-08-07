// Reference: https://www.redblobgames.com/grids/hexagons/
// Geometry based on "pointy" hexagons

import { CSSProperties } from "react";
import { CustomHexDirection } from "./hexTypes";

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

export const FlowerTransforms: {
  [key in "closed" | "enter"]: FlowerTransform;
} = {
  closed: {
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
};
