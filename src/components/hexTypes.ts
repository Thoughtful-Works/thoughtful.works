import { Hex } from "react-hexgrid";

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

export interface AnimationState extends Hex {
  opacity?: number;
}

export interface Tile {
  hex: Hex;
  nodeLevel: 0 | 1;
  data: DataNode;
}
