"use client";

import { CameraControlsImpl, useVideoTexture } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Box3,
  BufferAttribute,
  ClampToEdgeWrapping,
  DoubleSide,
  Matrix4,
  Object3D,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3,
} from "three";
import { GLTFResult } from "../OfficeTypes";

const _box = new Box3();
const _center = new Vector3();
const _dir = new Vector3();
const _pos = new Vector3();

export default function Monitor({ nodes, materials }: Partial<GLTFResult>) {
  const screen = useMemo(() => {
    const g = nodes!.monitor1228A6_StaticMeshComponent0_MI_Object_67_0.geometry;
    const pos = g.attributes.position;
    const idx = g.index;
    const triCount = (idx ? idx.count : pos.count) / 3;
    const vi = (t: number, k: number) =>
      idx ? idx.getX(t * 3 + k) : t * 3 + k;

    const A = new Vector3(),
      B = new Vector3(),
      C = new Vector3();
    const faceNormal = (t: number) => {
      A.fromBufferAttribute(pos, vi(t, 0));
      B.fromBufferAttribute(pos, vi(t, 1));
      C.fromBufferAttribute(pos, vi(t, 2));
      return B.clone().sub(A).cross(C.clone().sub(A)); // length = 2 * area
    };

    // 1. Reference normal = the largest triangle
    let ref = new Vector3();
    for (let t = 0; t < triCount; t++) {
      const n = faceNormal(t);
      if (n.lengthSq() > ref.lengthSq()) ref = n;
    }
    ref.normalize();

    // 2. Area-weighted average of every triangle facing the same way (front or back)
    const normal = new Vector3();
    for (let t = 0; t < triCount; t++) {
      const n = faceNormal(t);
      const d = n.clone().normalize().dot(ref);
      if (Math.abs(d) > 0.9) normal.add(d < 0 ? n.negate() : n);
    }
    normal.normalize();

    // 3. In-plane axes: project the closest local axis onto the plane for "up"
    const up = [
      new Vector3(1, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 1),
    ]
      .sort((p, q) => Math.abs(q.dot(normal)) - Math.abs(p.dot(normal)))[2]
      .clone();
    up.addScaledVector(normal, -up.dot(normal)).normalize(); // project onto plane
    const right = up.clone().cross(normal).normalize();
    const vAxis = normal.clone().cross(right).normalize();

    // 4. Measure extents in that tilted basis
    let minU = Infinity,
      maxU = -Infinity,
      minV = Infinity,
      maxV = -Infinity;
    let minN = Infinity,
      maxN = -Infinity;
    const p = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      const u = p.dot(right),
        v = p.dot(vAxis),
        n = p.dot(normal);
      minU = Math.min(minU, u);
      maxU = Math.max(maxU, u);
      minV = Math.min(minV, v);
      maxV = Math.max(maxV, v);
      minN = Math.min(minN, n);
      maxN = Math.max(maxN, n);
    }

    const center = new Vector3()
      .addScaledVector(right, (minU + maxU) / 2)
      .addScaledVector(vAxis, (minV + maxV) / 2)
      .addScaledVector(normal, (minN + maxN) / 2);

    const basis = new Matrix4().makeBasis(right, vAxis, normal);
    return {
      center,
      quaternion: new Quaternion().setFromRotationMatrix(basis),
      width: maxU - minU,
      height: maxV - minV,
    };
  }, [nodes]);
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

  const tex = useVideoTexture("./screen.mp4", {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "anonymous",
  });

  const g = nodes?.monitor1228A6_StaticMeshComponent0_MI_Object_67_0.geometry;
  g?.computeBoundingBox();
  console.log(
    "size",
    g?.boundingBox?.getSize(new Vector3()),
    "center",
    g?.boundingBox?.getCenter(new Vector3()),
  );

  useEffect(() => {
    const video = tex.image as HTMLVideoElement;
    const videoAspect = video.videoWidth / video.videoHeight;
    // plane is [screen.height, screen.width] because of the 90° spin
    const planeAspect = screen.height / screen.width;

    tex.center.set(0.25, 0);
    tex.rotation = 0;

    if (videoAspect > planeAspect) {
      // video is wider than the screen: crop the sides
      const r = planeAspect / videoAspect;
      tex.repeat.set(r, 1);
      tex.offset.set((1 - r) / 2, 0);
    } else {
      // video is taller than the screen: crop top and bottom
      const r = videoAspect / planeAspect;
      tex.repeat.set(1, r);
      tex.offset.set(0, (1 - r) / 2);
    }
  }, [tex, screen]);

  return (
    <group name="monitor" ref={monitor} onClick={handleClick}>
      <mesh
        name="left postit"
        geometry={
          nodes?.Notepaper1228B9_StaticMeshComponent0_MI_0046_Gold_0.geometry
        }
        material={materials?.MI_0046_Gold}
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
        position={[0.143, 0.864, 0.135]}
        rotation={[-Math.PI / 2, 0, -2.007]}
        scale={1.102}
        // material={materials.MI_Object_67}
        // position={[0.1, 1.125, 0.135]}
        // position={screen.center}
        // rotation={[-Math.PI / 2, 0, -2.007]}
        // rotation={[0, 0, 0]}
        // quaternion={screen.quaternion}
        // scale={1.102}
        userData={{
          name: "monitor1228A6_StaticMeshComponent0_MI_Object_67_0",
        }}
      >
        <meshBasicMaterial visible={false} />
        <mesh position={screen.center} quaternion={screen.quaternion}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <planeGeometry args={[screen.height, screen.width]} />
              <meshBasicMaterial
                map={tex}
                toneMapped={false}
                side={DoubleSide}
              />
            </mesh>
          </group>
        </mesh>
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
