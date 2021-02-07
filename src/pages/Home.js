import React from "react";
import TrendingList from "../components/TrendingList/TrendingList";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <h2 className={styles.homeTitle}>Trending today</h2>
      <TrendingList />
    </>
  );
}
