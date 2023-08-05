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
      <h1 style={{ fontWeight: 400 }}>Amit Kumar</h1>

      <div className={styles.gridContainer}>
        <HexGrid
          width={windowWidth}
          height={windowHeight}
          viewBox="-50 -50 100 100"
        >
          <Layout size={{ x: 5, y: 5 }} spacing={1.1} origin={{ x: 0, y: 0 }}>
            <Hexagon q={0} r={0} s={0} />
            <Hexagon q={0} r={1} s={0} />
            <Hexagon q={0} r={2} s={0} />
            <Hexagon q={0} r={3} s={0} />
            <Hexagon q={0} r={4} s={0} />
          </Layout>
        </HexGrid>
      </div>
    </main>
  );
}
