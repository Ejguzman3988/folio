import { GLTFResult } from "../OfficeTypes";

export default function Cabinet({ nodes, materials }: Partial<GLTFResult>) {
  return (
    <group name="cabinet">
      <group name="right documents">
        <group name="binders">
          <mesh
            name="binder labels"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_W1_1_0.geometry
            }
            material={materials.MI_Color_A01_3}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_W1_1_0",
            }}
          />
          <mesh
            name="binders lightblue"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Object_131_0
                .geometry
            }
            material={materials.MI_Object_131}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Object_131_0",
            }}
          />
          <mesh
            name="binders pink"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Color_B04_1_1_0
                .geometry
            }
            material={materials.MI_Color_B04_1}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Color_B04_1_1_0",
            }}
          />
          <mesh
            name="binders blue"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Color_G05_1_0
                .geometry
            }
            material={materials.MI_Color_G05}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Color_G05_1_0",
            }}
          />

          <mesh
            name="binders base"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Color_M04_1_0
                .geometry
            }
            material={materials.MI_Color_M04}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Color_M04_1_0",
            }}
          />
          <mesh
            name="papers"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Default_2_0
                .geometry
            }
            material={materials.MI_Default_2}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Default_2_0",
            }}
          />
          <mesh
            name="organizers blue"
            geometry={
              nodes.documents1228J4_458_StaticMeshComponent0_MI_Color_F06_1_0
                .geometry
            }
            material={materials.MI_Color_F06}
            position={[-0.304, 0.777, 0.79]}
            rotation={[-Math.PI / 2, 0, -1.571]}
            scale={1.102}
            userData={{
              name: "documents1228J4_458_StaticMeshComponent0_MI_Color_F06_1_0",
            }}
          />

          <mesh
            name="binders black"
            geometry={
              nodes.documents1228F_455_StaticMeshComponent0_MI_Object_41_0
                .geometry
            }
            material={materials.MI_Object_41}
            position={[0.138, 0.777, 0.722]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={1.102}
            userData={{
              name: "documents1228F_455_StaticMeshComponent0_MI_Object_41_0",
            }}
          />

          <mesh
            name="paper thick"
            geometry={
              nodes.documents1228F_455_StaticMeshComponent0_MI_Default_0
                .geometry
            }
            material={materials.MI_Default}
            position={[0.138, 0.777, 0.722]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={1.102}
            userData={{
              name: "documents1228F_455_StaticMeshComponent0_MI_Default_0",
            }}
          />
        </group>
      </group>
      <mesh
        name="drawers handles"
        geometry={nodes.drawer1228C6_StaticMeshComponent0_MI_Default_0.geometry}
        material={materials.MI_Default}
        position={[-0.061, 0.004, 0.663]}
        rotation={[-Math.PI / 2, 0, -1.571]}
        scale={1.102}
        userData={{ name: "drawer1228C6_StaticMeshComponent0_MI_Default_0" }}
      />
      <mesh
        name="drawers base"
        geometry={
          nodes.drawer1228C6_StaticMeshComponent0_MI_Color_I05_1_0.geometry
        }
        material={materials.MI_Color_I05_1}
        position={[-0.061, 0.004, 0.663]}
        rotation={[-Math.PI / 2, 0, -1.571]}
        scale={1.102}
        userData={{
          name: "drawer1228C6_StaticMeshComponent0_MI_Color_I05_1_0",
        }}
      />
      <mesh
        name="cabinet lid"
        geometry={
          nodes.drawer1228C6_StaticMeshComponent0_MI_Color_A01_3_0.geometry
        }
        material={materials.MI_Color_A01_3}
        position={[-0.061, 0.004, 0.663]}
        rotation={[-Math.PI / 2, 0, -1.571]}
        scale={1.102}
        userData={{
          name: "drawer1228C6_StaticMeshComponent0_MI_Color_A01_3_0",
        }}
      />
    </group>
  );
}
