"use client";

import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Hex,
  GridGenerator,
  HexUtils,
} from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const originHex = new Hex(0, 0, 0);
const tiles: Array<Tile> = []; //[originHex];

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
    hex: HexUtils.neighbour(originHex, index),
    nodeLevel: 0,
    data: item,
  });
});

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
                      return (
                        // Hexagon q, r, s props accept decimals, which means we should be able to interpolate them with an animation library
                        <Hexagon
                          key={key}
                          q={q}
                          r={r}
                          s={s}
                          className={styles.tile}
                          onPointerOver={(e) => {
                            e.currentTarget.style.fill = "red";
                          }}
                          onPointerOut={(e) => {
                            e.currentTarget.style.fill = "";
                          }}
                        >
                          <Text>{data.title}</Text>
                        </Hexagon>
                      );
                    })}
                  </g>
                );
              }}
            </NodeGroup>
          </Layout>
        </HexGrid>
      </div>
    </main>
  );
}
