import React, { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { CameraDebug } from "./CameraDebug";
import { MathUtils } from "three";
import { cameraProps } from "./camera.ts";

const Camera = () => {
  const cameraControlsRef = useRef(null);

  useEffect(() => {
    if (cameraControlsRef.current) {
      const controls = cameraControlsRef.current as CameraControls;
      controls.setLookAt(...cameraProps.position, ...cameraProps.target, false);
      controls.distance = 2.5;
      controls.minDistance = 0.4;
      controls.maxDistance = 2.5;
      controls.minPolarAngle = MathUtils.degToRad(35); // can't look straight down
      controls.maxPolarAngle = MathUtils.degToRad(85); // can't go below the desk
      controls.minAzimuthAngle = -2.4; // limit side-to-side swing (radians)
      controls.maxAzimuthAngle = -0.8;
      controls.saveState();
    }
  }, []);

  return (
    <group>
      <CameraControls ref={cameraControlsRef} makeDefault />
      {/* <CameraDebug controlsRef={cameraControlsRef} /> */}
    </group>
  );
};

export default Camera;
