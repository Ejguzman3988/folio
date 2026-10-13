import { GLTFResult } from "../OfficeTypes";

export default function Pen({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="pen">
      <mesh
        name="base"
        geometry={
          nodes.Ballpen1228A4_StaticMeshComponent0_MI_Object_103_0.geometry
        }
        material={materials.MI_Object_103}
        position={[-0.263, 0.864, -0.444]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.102}
        userData={{
          name: "Ballpen1228A4_StaticMeshComponent0_MI_Object_103_0",
        }}
      />
      <mesh
        name="cap point"
        geometry={
          nodes.Ballpen1228A4_StaticMeshComponent0_MI_Metal_Corrogated_Shiny_0
            .geometry
        }
        material={materials.MI_Metal_Aluminum_Anodized}
        position={[-0.263, 0.864, -0.444]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.102}
        userData={{
          name: "Ballpen1228A4_StaticMeshComponent0_MI_Metal_Corrogated_Shiny_0",
        }}
      />
    </group>
  );
}
