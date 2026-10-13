import { GLTFResult } from "../OfficeTypes";

export default function DeskPapers({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="desk papers">
      <mesh
        name="desk papers"
        geometry={nodes.paper1228A5_StaticMeshComponent0_MI_paper001_0.geometry}
        material={materials.MI_Color_A01_3}
        position={[-0.237, 0.864, -0.634]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.102}
        userData={{
          name: "paper1228A5_StaticMeshComponent0_MI_paper001_0",
        }}
      />
    </group>
  );
}
