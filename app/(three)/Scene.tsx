"use client";

import { Canvas } from "@react-three/fiber";
import styles from "./Scene.module.scss";

const Scene = (props: any) => {
  return (
    <Canvas
      camera={{ position: [0, 0, -30], fov: 35 }}
      className={styles.canvas}
    ></Canvas>
  );
};

export default Scene;
