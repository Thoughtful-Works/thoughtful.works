"use client";

import { HexFlower } from "@/components";
import { sampleData } from "@/utils";
import { useEffect, useState } from "react";
import { Hex, HexGrid, Layout } from "react-hexgrid";
import styles from "./page.module.css";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();
  const [originHex, setOriginHex] = useState(new Hex(0, 0, 0));
  const [data, setData] = useState(sampleData);

  // Window resize handler
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.gridContainer}>
        <HexGrid
          width={windowWidth}
          height={windowHeight}
          viewBox="-50 -50 100 100"
        >
          <Layout
            size={{ x: 12, y: 12 }}
            spacing={1.05}
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
