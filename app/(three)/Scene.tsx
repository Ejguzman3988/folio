"use client";

import { Canvas } from "@react-three/fiber";
import styles from "./Scene.module.scss";
import TestLaptop from "./TestLaptop";
import { a as three } from "@react-spring/three";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";

const Scene = (props: any) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, -30], fov: 35 }}
      className={styles.canvas}
    >
      <three.pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color={"#d25578"}
      />
      <Suspense fallback={null}>
        <TestLaptop />
        <Environment preset="city" />
      </Suspense>
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.4}
        scale={20}
        blur={1.75}
        far={4.5}
      />
    </Canvas>
  );
};

export default Scene;
