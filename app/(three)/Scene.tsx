"use client";

import { Canvas } from "@react-three/fiber";
import styles from "./Scene.module.scss";
import { a as three } from "@react-spring/three";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Office } from "./(office)/Office";
import Camera from "./Camera";

const Scene = (props: any) => {
  return (
    <Canvas
      dpr={[1, 2]}
      className={styles.canvas}
      camera={{
        fov: 50,
        near: 0.05,
        far: 100,
        position: [-1.426, 1.378, -0.145],
      }}
    >
      <Camera />
      <three.pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color={"#d25578"}
      />
      <Suspense fallback={null}>
        {/* <TestLaptop /> */}
        <Office />
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
