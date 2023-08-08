import {
  AnimationState,
  CustomHexDirection,
  CustomHexagon,
  DataNode,
  FlowerTransforms,
  Tile,
} from "@/components";
import { d3Interpolation, getRingNeighbor } from "@/utils";
import {
  easeCircleIn,
  easeCircleInOut,
  easeCircleOut,
  easeQuadOut,
} from "d3-ease";
import { CSSProperties, useState } from "react";
import { Hex, Text } from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import styles from "./HexFlower.module.css";
import { useHover } from "react-aria";

export interface HexFlowerProps {
  data: DataNode;
  originHex: Hex;
}

const getPetals = (originHex: Hex, children: Array<DataNode> | undefined) => {
  return children
    ? children.map((item, index) => {
        return {
          hex: getRingNeighbor(originHex, index),
          nodeLevel: 0,
          data: item,
        } as Tile;
      })
    : [];
};

export const HexFlower = ({
  originHex,
  data: { title, children = [] },
}: HexFlowerProps) => {
  const [petals, setPetals] = useState<Array<Tile>>([]);
  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => {
      setPetals(getPetals(originHex, children));
    },
    onHoverEnd: () => {
      setPetals([]);
    },
  });

  return (
    <Animate
      start={() => {
        return {
          q: originHex.q,
          r: originHex.r,
          s: originHex.s,
          opacity: 0.1,
          fill: "rgb(0, 0, 0)",
        } as AnimationState;
      }}
      enter={(node: AnimationState) => {
        return {
          q: [node.q],
          r: [node.r],
          s: [node.s],
          opacity: [1],
          timing: { duration: 2000, ease: easeCircleOut },
        };
      }}
      update={(node: AnimationState) => {
        return {
          q: [node.q],
          r: [node.r],
          s: [node.s],
          opacity: isHovered ? [1] : [0.4],
          timing: { duration: 500, ease: easeCircleOut },
        };
      }}
      interpolation={d3Interpolation}
    >
      {(state) => {
        return (
          <g {...hoverProps}>
            <CustomHexagon
              q={state.q}
              r={state.r}
              s={state.s}
              className={styles.originTile}
              style={{ opacity: state.opacity }}
              role="button"
            >
              <Text>{title}</Text>
            </CustomHexagon>
            <NodeGroup
              data={petals}
              keyAccessor={(item: Tile) => item.data.title}
              start={(item, index) => {
                return {
                  q: item.hex.q,
                  r: item.hex.r,
                  s: item.hex.s,
                  opacity: 0,
                  flowerTransforms:
                    FlowerTransforms.start[index as CustomHexDirection],
                } as AnimationState;
              }}
              enter={(item, index) => {
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [1],
                  flowerTransforms:
                    FlowerTransforms.enter[index as CustomHexDirection],
                  timing: {
                    duration: 1000,
                    delay: index * 100,
                    ease: easeCircleOut,
                  },
                } as AnimationState;
              }}
              update={(item, index) => {
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [0.4],
                  timing: { duration: 500, ease: easeCircleOut },
                } as AnimationState;
              }}
              leave={(item, index) => {
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [0],
                  flowerTransforms:
                    FlowerTransforms.leave[index as CustomHexDirection],
                  timing: {
                    duration: 750,
                    delay: index * 75,
                    ease: easeCircleIn,
                  },
                } as AnimationState;
              }}
              interpolation={d3Interpolation}
            >
              {(nodes) => {
                return (
                  <g key={1}>
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
          </g>
        );
      }}
    </Animate>
  );
};

export default HexFlower;
