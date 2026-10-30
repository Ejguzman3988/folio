import { GLTFResult } from "../OfficeTypes";

export default function Phone({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="phone">
      <mesh
        name="screen"
        geometry={
          nodes?.telephone1228A6_StaticMeshComponent0_MI_Color_M07_0.geometry
        }
        material={materials?.MI_Color_M06_1}
        position={[-0.032, 0.864, -0.919]}
        rotation={[-Math.PI / 2, 0, -0.873]}
        scale={1.102}
        userData={{
          name: "telephone1228A6_StaticMeshComponent0_MI_Color_M07_0",
        }}
      />
      <mesh
        name="base"
        geometry={
          nodes?.telephone1228A6_StaticMeshComponent0_MI_plasticwhite03_0
            .geometry
        }
        material={materials?.MI_plasticwhite03}
        position={[-0.032, 0.864, -0.919]}
        rotation={[-Math.PI / 2, 0, -0.873]}
        scale={1.102}
        userData={{
          name: "telephone1228A6_StaticMeshComponent0_MI_plasticwhite03_0",
        }}
      />
    </group>
  );
}
