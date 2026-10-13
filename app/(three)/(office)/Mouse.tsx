import { GLTFResult } from "../OfficeTypes";

export default function Mouse({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="mouse">
      <mesh
        name="mouse1228A10_StaticMeshComponent0_MI_plasticwhite03_0"
        geometry={
          nodes.mouse1228A10_StaticMeshComponent0_MI_plasticwhite03_0.geometry
        }
        material={materials.MI_plasticwhite03}
        position={[-0.192, 0.864, 0.258]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "mouse1228A10_StaticMeshComponent0_MI_plasticwhite03_0",
        }}
      />
    </group>
  );
}
