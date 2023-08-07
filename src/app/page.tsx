"use client";

import CustomHexagon from "@/components/CustomHexagon";
import { getRingNeighbor } from "@/utils";
import { easeQuadIn } from "d3-ease";
import { CSSProperties, useEffect, useState } from "react";
import { Hex, HexGrid, Layout, Text } from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import styles from "./page.module.css";

const originHex = new Hex(0, 0, 0);
const tiles: Array<Tile> = [];

export interface Offering {
  title: string;
}

export interface Tile {
  hex: Hex;
  nodeLevel: 0 | 1;
  data: Offering | any;
}

const offeringsData: Array<Offering> = [
  {
    title: "1", //"Web Software Architect",
  },
  {
    title: "2", //"Engineering Leader",
  },
  {
    title: "3", //"Entrepreneur",
  },
  {
    title: "4",
  },
  {
    title: "5",
  },
  {
    title: "6",
  },
];

offeringsData.forEach((item, index) => {
  tiles.push({
    hex: getRingNeighbor(originHex, index),
    nodeLevel: 0,
    data: item,
  });
});

export interface AnimationState extends Hex {
  opacity?: number;
}

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Window resize handler
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <h1 style={{ fontWeight: 400, fontSize: "4em" }}>Amit Kumar</h1>

      <div className={styles.gridContainer}>
        <HexGrid
          width={windowWidth}
          height={windowHeight}
          viewBox="-50 -50 100 100"
        >
          <Layout
            size={{ x: 10, y: 10 }}
            spacing={1.04}
            origin={{ x: 0, y: 0 }}
            flat={false}
          >
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
                  timing: { duration: 500, ease: easeQuadIn },
                };
              }}
            >
              {(state) => {
                return (
                  <g>
                    <CustomHexagon
                      q={state.q}
                      r={state.r}
                      s={state.s}
                      className={styles.tile}
                      style={{ opacity: state.opacity }}
                      role="button"
                      onPointerEnter={(e) => {
                        e.currentTarget.style.fill = "red";
                      }}
                      onPointerLeave={(e) => {
                        e.currentTarget.style.fill = "";
                      }}
                    >
                      <Text className={styles.originText}>Amit Kumar</Text>
                    </CustomHexagon>
                    <NodeGroup
                      data={offeringsData}
                      keyAccessor={(item) => item.title}
                      start={(item, index) => {
                        return {
                          q: tiles[index].hex.q,
                          r: tiles[index].hex.r,
                          s: tiles[index].hex.s,
                        };
                      }}
                    >
                      {(nodes) => {
                        return (
                          <g>
                            {nodes.map(({ key, data, state: { q, r, s } }) => {
                              const contentStyle: CSSProperties = {
                                transform: `perspective(1000px) rotateY(180deg)`,
                                transformOrigin: `right center`,
                                transformBox: `fill-box`,
                              };
                              return (
                                // Hexagon q, r, s props accept decimals, which means we should be able to interpolate them with an animation library
                                <CustomHexagon
                                  key={key}
                                  q={q}
                                  r={r}
                                  s={s}
                                  className={styles.tile}
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
                            })}
                          </g>
                        );
                      }}
                    </NodeGroup>
                  </g>
                );
              }}
            </Animate>
          </Layout>
        </HexGrid>
      </div>
    </main>
  );
}
