"use client";

import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
  GridGenerator,
} from "react-hexgrid";
import { Animate, NodeGroup } from "react-move";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const baseHexGrid = GridGenerator.spiral(new Hex(0, 0, 0), 5); // 91 cells
console.log(baseHexGrid);

const offeringsData = [
  {
    title: "Web Software Architect",
  },
  {
    title: "Engineering Leader",
  },
  {
    title: "Entrepreneur",
  },
  {
    title: "Children's Book Author",
  },
];

const experienceData = [];

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
                  q: baseHexGrid[index].q,
                  r: baseHexGrid[index].r,
                  s: baseHexGrid[index].s,
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
