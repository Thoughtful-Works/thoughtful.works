"use client";

import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
} from "react-hexgrid";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

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
            <Hexagon
              q={0}
              r={0}
              s={0}
              className={styles.tile}
              onPointerOver={(e) => {
                e.currentTarget.style.fill = "red";
              }}
              onPointerOut={(e) => {
                e.currentTarget.style.fill = "";
              }}
            >
              <Text>Web Software Architect</Text>
            </Hexagon>
            <Hexagon q={0} r={-1} s={0} className={styles.tile} />
            <Hexagon q={0} r={1} s={0} className={styles.tile} />
            <Hexagon q={-1} r={0} s={0} className={styles.tile} />
            <Hexagon q={1} r={0} s={0} className={styles.tile} />
          </Layout>
        </HexGrid>
      </div>
    </main>
  );
}
