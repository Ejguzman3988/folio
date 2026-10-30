import { GLTFResult } from "../OfficeTypes";

export default function Desk({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="desk">
      <mesh
        name="desk legs"
        geometry={
          nodes?.deskoffice1228A6_StaticMeshComponent0_MI_Object_73_0.geometry
        }
        material={materials?.MI_Object_73}
        position={[-0.047, 0.004, -0.335]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "deskoffice1228A6_StaticMeshComponent0_MI_Object_73_0",
        }}
      />
      <mesh
        name="desk base"
        geometry={
          nodes?.deskoffice1228A6_StaticMeshComponent0_MI_Color_C06_0.geometry
        }
        material={materials?.MI_Color_C06}
        position={[-0.047, 0.004, -0.335]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "deskoffice1228A6_StaticMeshComponent0_MI_Color_C06_0",
        }}
      />
      <mesh
        name="desk table rim"
        geometry={
          nodes?.deskoffice1228A6_StaticMeshComponent0_MI_Object_51_0.geometry
        }
        material={materials?.MI_Object_51}
        position={[-0.047, 0.004, -0.335]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "deskoffice1228A6_StaticMeshComponent0_MI_Object_51_0",
        }}
      />
      <mesh
        name="desk table"
        geometry={
          nodes?.deskoffice1228A6_StaticMeshComponent0_MI_Object_62_1_0.geometry
        }
        material={materials?.MI_Object_62_1}
        position={[-0.047, 0.004, -0.335]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={1.102}
        userData={{
          name: "deskoffice1228A6_StaticMeshComponent0_MI_Object_62_1_0",
        }}
      />
    </group>
  );
}
