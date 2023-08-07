"use client";

import { HexFlower, sampleData } from "@/components";
import { useEffect, useState } from "react";
import { Hex, HexGrid, Layout } from "react-hexgrid";
import styles from "./page.module.css";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [originHex, setOriginHex] = useState(new Hex(0, 0, 0));
  const [data, setData] = useState(sampleData);

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
            size={{ x: 12, y: 12 }}
            spacing={1}
            origin={{ x: 0, y: 0 }}
            flat={false}
          >
            <HexFlower data={data} originHex={originHex} />
          </Layout>
        </HexGrid>
      </div>
    </main>
  );
}
