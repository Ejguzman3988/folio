"use client";

import { CameraControls } from "@react-three/drei";
import { buttonGroup, useControls } from "leva";
import { useRef } from "react";
import { DEG2RAD } from "three/src/math/MathUtils.js";

const Camera = () => {
  const cameraControlsRef = useRef(null);

  const { theta } = useControls({
    thetaGroup: buttonGroup({
      label: "rotate theta",
      opts: {
        "+45deg": () =>
          cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
      },
    }),
  });

  console.log({ theta });

  return (
    <group>
      <CameraControls ref={cameraControlsRef} />
    </group>
  );
};

export default Camera;
