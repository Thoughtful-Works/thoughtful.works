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
  easeCubicIn,
  easeCubicOut,
  easeQuadInOut,
  easeQuadOut,
  easeSinIn,
  easeSinInOut,
  easeSinOut,
} from "d3-ease";
import { CSSProperties, useState } from "react";
import { Hex, Text } from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import styles from "./HexFlower.module.css";
import { useHover } from "react-aria";
import { schemeSet2, interpolateSinebow } from "d3-scale-chromatic";

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
          timing: { duration: 500, ease: easeCircleIn },
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
                const easedDelayFactor = easeSinOut(
                  index / (children.length - 1)
                );
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [1],
                  flowerTransforms:
                    FlowerTransforms.enter[index as CustomHexDirection],
                  timing: {
                    duration: 750,
                    // delay: easedDelayFactor * (750 / 2),
                    ease: easeSinOut,
                  },
                } as AnimationState;
              }}
              update={(item, index) => {
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [0.4],
                  timing: { duration: 500, ease: easeSinOut },
                } as AnimationState;
              }}
              leave={(item, index) => {
                const easedDelayFactor = easeSinIn(
                  index / (children.length - 1)
                );
                return {
                  q: [item.hex.q],
                  r: [item.hex.r],
                  s: [item.hex.s],
                  opacity: [0],
                  flowerTransforms:
                    FlowerTransforms.leave[index as CustomHexDirection],
                  timing: {
                    duration: 750,
                    // delay: easedDelayFactor * (750 / 3),
                    ease: easeSinIn,
                  },
                } as AnimationState;
              }}
              interpolation={d3Interpolation}
            >
              {(nodes) => {
                return (
                  <g key={1}>
                    {nodes.map(
                      (
                        {
                          key,
                          data,
                          state: { q, r, s, opacity, flowerTransforms = {} },
                        },
                        index
                      ) => {
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
                              fill: schemeSet2[index],
                            }}
                            cellStyle={contentStyle}
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
