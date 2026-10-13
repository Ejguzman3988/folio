"use client";

import { CameraControlsImpl, Html } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Box3, Object3D, Vector3 } from "three";
import { GLTFResult } from "../OfficeTypes";

const _box = new Box3();
const _center = new Vector3();
const _dir = new Vector3();
const _pos = new Vector3();

export default function Monitor({ nodes, materials }: Partial<GLTFResult>) {
  const monitor = useRef<Object3D | null>(null);

  const controls = useThree((s) => s.controls) as CameraControlsImpl | null;
  const camera = useThree((s) => s.camera);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!controls) return;

    const screen =
      e.eventObject.getObjectByName("monitor screen led") ?? e.eventObject;

    _box.setFromObject(screen);
    _box.getCenter(_center);

    camera.getWorldDirection(_dir);
    _pos.copy(_center).addScaledVector(_dir, -0.5);

    controls.setLookAt(
      _pos.x,
      _pos.y,
      _pos.z,
      _center.x,
      _center.y,
      _center.z,
      true,
    );
  };

  return (
    <group name="monitor" ref={monitor} onClick={handleClick}>
      <mesh
        name="left postit"
        geometry={
          nodes.Notepaper1228B9_StaticMeshComponent0_MI_0046_Gold_0.geometry
        }
        material={materials.MI_0046_Gold}
        position={[0.074, 0.925, 0.086]}
        rotation={[-2.747, -1.114, -1.224]}
        scale={1.102}
        userData={{
          name: "Notepaper1228B9_StaticMeshComponent0_MI_0046_Gold_0",
        }}
      />
      <mesh
        name="right postit"
        geometry={
          nodes.Notepaper1228B8_464_StaticMeshComponent0_MI_0046_Gold_0.geometry
        }
        material={materials.MI_0046_Gold}
        position={[0.024, 0.923, 0.194]}
        rotation={[-2.747, -1.114, -1.224]}
        scale={1.102}
        userData={{
          name: "Notepaper1228B8_464_StaticMeshComponent0_MI_0046_Gold_0",
        }}
      />
      <mesh
        name="monitor back"
        geometry={
          nodes.monitor1228A6_StaticMeshComponent0_MI_plasticwhite03_0.geometry
        }
        material={materials.MI_plasticwhite03}
        position={[0.143, 0.864, 0.135]}
        rotation={[-Math.PI / 2, 0, -2.007]}
        scale={1.102}
        userData={{
          name: "monitor1228A6_StaticMeshComponent0_MI_plasticwhite03_0",
        }}
      />
      <mesh
        name="monitor screen led"
        geometry={
          nodes.monitor1228A6_StaticMeshComponent0_MI_Object_67_0.geometry
        }
        material={materials.MI_Object_67}
        position={[0.143, 0.864, 0.135]}
        rotation={[-Math.PI / 2, 0, -2.007]}
        scale={1.102}
        userData={{
          name: "monitor1228A6_StaticMeshComponent0_MI_Object_67_0",
        }}
      >
        {/* <Html */}
        {/*   transform */}
        {/*   occlude="blending" */}
        {/*   // position={[0, 0.12, 0.011]} */}
        {/*   distanceFactor={0.33} */}
        {/*   rotation={[Math.PI / 2, 0, 0]} */}
        {/*   // zIndexRange={[0, 0]} */}
        {/* > */}
        {/*   <iframe */}
        {/*     src="https://player.twitch.tv/?channel=eridotdev&parent=www.example.com" */}
        {/*     frameBorder="0" */}
        {/*     allowFullScreen={true} */}
        {/*     scrolling="no" */}
        {/*     height="378" */}
        {/*     width="620" */}
        {/*   /> */}
        {/* </Html> */}
      </mesh>
      <mesh
        name="monitor screen case"
        geometry={
          nodes.monitor1228A6_StaticMeshComponent0_MI_Object_74_0.geometry
        }
        material={materials.MI_Object_74}
        position={[0.143, 0.864, 0.135]}
        rotation={[-Math.PI / 2, 0, -2.007]}
        scale={1.102}
        userData={{
          name: "monitor1228A6_StaticMeshComponent0_MI_Object_74_0",
        }}
      />
    </group>
  );
}
