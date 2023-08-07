import {
  AnimationState,
  CustomHexDirection,
  CustomHexagon,
  DataNode,
  FlowerTransforms,
  Tile,
} from "@/components";
import { d3Interpolation, getRingNeighbor } from "@/utils";
import { easeCircleOut, easeQuadOut } from "d3-ease";
import { CSSProperties } from "react";
import { Hex, Text } from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import styles from "./HexFlower.module.css";

export interface HexFlowerProps {
  data: DataNode;
  originHex: Hex;
}

export const HexFlower = ({
  originHex,
  data: { title, children },
}: HexFlowerProps) => {
  const tiles = children?.map((item, index) => {
    return {
      hex: getRingNeighbor(originHex, index),
      nodeLevel: 0,
      data: item,
    } as Tile;
  });
  return (
    <Animate
      start={() => {
        return {
          q: originHex.q,
          r: originHex.r,
          s: originHex.s,
          opacity: 0.2,
        } as AnimationState;
      }}
      enter={(node: AnimationState) => {
        return {
          q: [node.q],
          r: [node.r],
          s: [node.s],
          opacity: [1],
          timing: { duration: 500, ease: easeQuadOut },
        };
      }}
      interpolation={d3Interpolation}
    >
      {(state) => {
        return (
          <g>
            <CustomHexagon
              q={state.q}
              r={state.r}
              s={state.s}
              className={styles.originTile}
              style={{ opacity: state.opacity }}
              role="button"
              onPointerEnter={(e) => {
                e.currentTarget.style.fill = "red";
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.fill = "";
              }}
            >
              <Text>{title}</Text>
            </CustomHexagon>
            {children && tiles && (
              <NodeGroup
                data={children}
                keyAccessor={(item) => item.title}
                start={(item, index) => {
                  return {
                    q: tiles[index].hex.q,
                    r: tiles[index].hex.r,
                    s: tiles[index].hex.s,
                    opacity: 0,
                    flowerTransforms:
                      FlowerTransforms.closed[index as CustomHexDirection],
                  };
                }}
                enter={(item, index) => {
                  return {
                    q: [tiles[index].hex.q],
                    r: [tiles[index].hex.r],
                    s: [tiles[index].hex.s],
                    opacity: [1],
                    flowerTransforms:
                      FlowerTransforms.enter[index as CustomHexDirection],
                    timing: {
                      duration: 1000,
                      delay: index * 100,
                      ease: easeCircleOut,
                    },
                  };
                }}
                update={(item, index) => {
                  return {
                    q: [tiles[index].hex.q],
                    r: [tiles[index].hex.r],
                    s: [tiles[index].hex.s],
                    opacity: [0.4],
                    timing: { duration: 500, ease: easeCircleOut },
                  };
                }}
                interpolation={d3Interpolation}
              >
                {(nodes) => {
                  return (
                    <g>
                      {nodes.map(
                        ({
                          key,
                          data,
                          state: { q, r, s, opacity, flowerTransforms = {} },
                        }) => {
                          const contentStyle: CSSProperties = {
                            ...flowerTransforms,
                          };
                          return (
                            // Hexagon q, r, s props accept decimals, which means we should be able to interpolate them with an animation library
                            <CustomHexagon
                              key={key}
                              q={q}
                              r={r}
                              s={s}
                              className={styles.tile}
                              style={{
                                opacity,
                              }}
                              cellStyle={contentStyle}
                              onPointerOver={(e) => {
                                e.currentTarget.style.fill = "red";
                              }}
                              onPointerOut={(e) => {
                                e.currentTarget.style.fill = "";
                              }}
                            >
                              <Text>{data.title}</Text>
                            </CustomHexagon>
                          );
                        }
                      )}
                    </g>
                  );
                }}
              </NodeGroup>
            )}
          </g>
        );
      }}
    </Animate>
  );
};

export default HexFlower;
