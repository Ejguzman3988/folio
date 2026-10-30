import { GLTFResult } from "../OfficeTypes";

export default function Desktop({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="desktop">
      <mesh
        name="desktop base"
        geometry={
          nodes?.desktop1228A3_StaticMeshComponent0_MI_Color_L25_0.geometry
        }
        material={materials?.MI_Color_L25}
        position={[0.076, 0.004, 0.198]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "desktop1228A3_StaticMeshComponent0_MI_Color_L25_0",
        }}
      />
      <mesh
        name="outer front panel"
        geometry={
          nodes?.desktop1228A3_StaticMeshComponent0_MI_Color_B01_0.geometry
        }
        material={materials?.MI_Color_B01}
        position={[0.076, 0.004, 0.198]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "desktop1228A3_StaticMeshComponent0_MI_Color_B01_0",
        }}
      />
      <mesh
        name="desktop rings"
        geometry={
          nodes?.desktop1228A3_StaticMeshComponent0_MI_Color_A05_2_0.geometry
        }
        material={materials?.MI_Color_A05_2}
        position={[0.076, 0.004, 0.198]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "desktop1228A3_StaticMeshComponent0_MI_Color_A05_2_0",
        }}
      />
    </group>
  );
}
