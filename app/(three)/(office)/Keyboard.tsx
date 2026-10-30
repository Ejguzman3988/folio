import { GLTFResult } from "../OfficeTypes";

export default function Keyboard({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="keyboard">
      <mesh
        name="keyboard"
        geometry={
          nodes?.keyboard1228A6_StaticMeshComponent0_MI_keyboadcolor_0.geometry
        }
        material={materials?.MI_keyboadcolor}
        position={[-0.144, 0.864, -0.197]}
        rotation={[-Math.PI / 2, 0, -2.269]}
        scale={1.102}
        userData={{
          name: "keyboard1228A6_StaticMeshComponent0_MI_keyboadcolor_0",
        }}
      />
    </group>
  );
}
