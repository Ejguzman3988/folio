import { animated, useSpring } from "@react-spring/three";
import { useRef } from "react";
import { Object3D } from "three";
import { GLTFResult } from "../OfficeTypes";

export default function Chair({ nodes, materials }: Partial<GLTFResult>) {
  const chairRef = useRef<Object3D | null>(null);

  const { positionX } = useSpring({
    from: { positionX: -1 },
    to: [{ positionX: -4 }, { positionX: -1 }],
    config: { tension: 120, friction: 20 },
  });

  if (!nodes || !materials) return <></>;

  return (
    <animated.group
      name="chair"
      position-x={positionX}
      position-y={0}
      position-z={0}
      ref={chairRef}
    >
      <mesh
        name="Officechair1228C6_StaticMeshComponent0_MI_Color_M08_0"
        geometry={
          nodes.Officechair1228C6_StaticMeshComponent0_MI_Color_M08_0.geometry
        }
        material={materials.MI_Color_M08}
        position={[-0.629, 0.004, -0.275]}
        rotation={[-Math.PI / 2, 0, 1.484]}
        scale={1.102}
        userData={{
          name: "Officechair1228C6_StaticMeshComponent0_MI_Color_M08_0",
        }}
      />
      <mesh
        name="Officechair1228C6_StaticMeshComponent0_MI_plasticGrey_0"
        geometry={
          nodes.Officechair1228C6_StaticMeshComponent0_MI_plasticGrey_0.geometry
        }
        material={materials.MI_plasticGrey}
        position={[-0.629, 0.004, -0.275]}
        rotation={[-Math.PI / 2, 0, 1.484]}
        scale={1.102}
        userData={{
          name: "Officechair1228C6_StaticMeshComponent0_MI_plasticGrey_0",
        }}
      />
    </animated.group>
  );
}
