// Reference: https://www.redblobgames.com/grids/hexagons/
// Geometry based on "pointy" hexagons

import { CustomHexDirection } from "@/utils";
import { CSSProperties } from "react";

export const baseStyles: CSSProperties = {
  transformBox: "fill-box",
};

export type PetalTransform = CSSProperties;
export type FlowerTransform = {
  [key in CustomHexDirection]: PetalTransform;
};

export const FlowerTransforms: {
  [key in "closed" | "enter"]: FlowerTransform;
} = {
  closed: {
    [CustomHexDirection.UpLeft]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(-1.75, 1, 0, 180deg)`,
      transformOrigin: `75% 87.5%`,
    },
    [CustomHexDirection.UpRight]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(1.75, 1, 0, 180deg)`,
      transformOrigin: `25% 87.5%`,
    },
    [CustomHexDirection.Right]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(0, 1, 0, 180deg)`,
      transformOrigin: `0 50%`,
    },
    [CustomHexDirection.DownRight]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(1.75, -1, 0, 180deg)`,
      transformOrigin: `25% 12.5%`,
    },
    [CustomHexDirection.DownLeft]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(-1.75, -1, 0, 180deg)`,
      transformOrigin: `75% 12.5%`,
    },
    [CustomHexDirection.Left]: {
      ...baseStyles,
      transform: `perspective(1000px) rotate3d(0, -1, 0, 180deg)`,
      transformOrigin: `100% 50%`,
    },
  },
};
