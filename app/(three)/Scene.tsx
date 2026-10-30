"use client";

import { Canvas } from "@react-three/fiber";
import styles from "./Scene.module.scss";
import { a as three } from "@react-spring/three";
import { ContactShadows, Environment, Grid } from "@react-three/drei";
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
      <Suspense fallback={null}>
        <Environment
          files="./hdri/studio_small.hdr"
          environmentIntensity={0.8}
        />
        <Office />
        <Grid
          position={[0, 0.001, 0]} // tiny lift so it doesn't z-fight with your floor
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={1}
          sectionSize={1}
          sectionThickness={1.2}
          cellColor={"#fff"}
          sectionColor="#fff"
          fadeDistance={7.5} // grid fades out with distance
          fadeStrength={1.5}
          followCamera={false}
        />
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
