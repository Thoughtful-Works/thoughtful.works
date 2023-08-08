import { CSSProperties } from "react";
import { Hex } from "react-hexgrid";

// export type Petal = DataNode & Tile;

export interface DataNode {
  type: "person" | "offering";
  title: string;
  children?: DataNode[];
}
export interface PersonNode extends DataNode {
  type: "person";
}

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

export interface AnimationState {
  q: number | number[];
  r: number | number[];
  s: number | number[];
  opacity?: number | number[];
  flowerTransforms?: CSSProperties;
  timing?: {
    duration?: number;
    delay?: number;
    ease?: Function;
  };
}

export interface Tile {
  hex: Hex;
  nodeLevel: 0 | 1;
  data: DataNode;
}
