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

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Amit Kumar</h1>

      <div>
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
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
