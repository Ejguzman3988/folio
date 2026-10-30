"use client";

import { RefObject, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls, folder, button, monitor } from "leva";
import { MathUtils, PerspectiveCamera, Spherical, Vector3 } from "three";
import type CameraControlsImpl from "camera-controls";

type Props = {
  controlsRef: RefObject<CameraControlsImpl | null>;
};

const round = (n: number, d = 3) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};

const vec = (v: { x: number; y: number; z: number }) => [
  round(v.x),
  round(v.y),
  round(v.z),
];
const deg = (rad: number) => round(MathUtils.radToDeg(rad), 2);

// Reusable scratch objects so we don't allocate every refresh
const _pos = new Vector3();
const _target = new Vector3();
const _offset = new Vector3();
const _sph = new Spherical();

// Read-only helpers (greyed out in the panel)
const READOUTS = [
  "position",
  "target",
  "focalOffset",
  "rotationDeg",
  "quaternion",
  "up",
  "distance",
  "azimuthDeg",
  "polarDeg",
  "sphericalRadius",
  "sphericalPhiDeg",
  "sphericalThetaDeg",
  "type",
  "aspect",
  "viewport",
] as const;
type ReadoutKey = (typeof READOUTS)[number];

const fmt = (...n: number[]) => n.map((x) => round(x)).join(", ");
/**
 * Must be rendered INSIDE <Canvas>.
 *
 *   const controlsRef = useRef<CameraControlsImpl>(null)
 *   <CameraControls ref={controlsRef} />
 *   <CameraDebug controlsRef={controlsRef} />
 */
export function CameraDebug({ controlsRef }: Props) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  // Only apply edits that come from the user dragging a control,
  // not the ones we push in via set() each refresh.
  const edit =
    (apply: (v: any) => void) =>
    (v: any, _path: string, ctx: { initial: boolean; fromPanel: boolean }) => {
      if (ctx.initial || !ctx.fromPanel) return;
      apply(v);
    };

  const live = useMemo(
    () =>
      Object.fromEntries(READOUTS.map((k) => [k, { current: "-" }])) as Record<
        ReadoutKey,
        { current: string }
      >,
    [],
  );

  useControls(() => ({
    // ---------- Position / orientation ----------
    Transform: folder({
      position: monitor(live.position),
      target: monitor(live.target),
      focalOffset: monitor(live.focalOffset),
      rotationDeg: monitor(live.rotationDeg), // Euler XYZ in degrees
      quaternion: monitor(live.quaternion),
      up: monitor(live.up),
    }),

    // ---------- Orbit state (CameraControls) ----------
    Orbit: folder({
      distance: monitor(live.distance),
      azimuthDeg: monitor(live.azimuthDeg),
      polarDeg: monitor(live.polarDeg),
      sphericalRadius: monitor(live.sphericalRadius),
      sphericalPhiDeg: monitor(live.sphericalPhiDeg),
      sphericalThetaDeg: monitor(live.sphericalThetaDeg),
    }),

    // ---------- Lens / projection ----------
    Lens: folder({
      type: monitor(live.type),
      aspect: monitor(live.aspect),
      viewport: monitor(live.viewport),
      fov: {
        value: (camera as PerspectiveCamera).fov ?? 50,
        min: 1,
        max: 179,
        onChange: edit((v) => {
          const c = camera as PerspectiveCamera;
          if (c.isPerspectiveCamera) {
            c.fov = v;
            c.updateProjectionMatrix();
          }
        }),
      },
      near: {
        value: camera.near,
        min: 0.001,
        step: 0.01,
        onChange: edit((v) => {
          camera.near = v;
          camera.updateProjectionMatrix();
        }),
      },
      far: {
        value: camera.far,
        min: 1,
        step: 10,
        onChange: edit((v) => {
          camera.far = v;
          camera.updateProjectionMatrix();
        }),
      },
      zoom: {
        value: camera.zoom,
        min: 0.01,
        step: 0.05,
        onChange: edit((v) => {
          camera.zoom = v;
          camera.updateProjectionMatrix();
        }),
      },
    }),

    // ---------- Limits (writable) ----------
    Limits: folder(
      {
        minDistance: {
          value: 0,
          min: 0,
          step: 0.5,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.minDistance = v),
          ),
        },
        maxDistance: {
          value: 1000,
          min: 0,
          step: 1,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.maxDistance = v),
          ),
        },
        minPolarDeg: {
          value: 0,
          min: 0,
          max: 180,
          onChange: edit(
            (v) =>
              controlsRef.current &&
              (controlsRef.current.minPolarAngle = MathUtils.degToRad(v)),
          ),
        },
        maxPolarDeg: {
          value: 180,
          min: 0,
          max: 180,
          onChange: edit(
            (v) =>
              controlsRef.current &&
              (controlsRef.current.maxPolarAngle = MathUtils.degToRad(v)),
          ),
        },
        minZoom: {
          value: 0.01,
          min: 0,
          step: 0.01,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.minZoom = v),
          ),
        },
        maxZoom: {
          value: Infinity,
          min: 0,
          step: 0.1,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.maxZoom = v),
          ),
        },
      },
      { collapsed: true },
    ),

    // ---------- Behaviour (writable) ----------
    Behaviour: folder(
      {
        enabled: {
          value: true,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.enabled = v),
          ),
        },
        smoothTime: {
          value: 0.25,
          min: 0,
          max: 2,
          step: 0.01,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.smoothTime = v),
          ),
        },
        draggingSmoothTime: {
          value: 0.125,
          min: 0,
          max: 2,
          step: 0.01,
          onChange: edit(
            (v) =>
              controlsRef.current &&
              (controlsRef.current.draggingSmoothTime = v),
          ),
        },
        azimuthRotateSpeed: {
          value: 1,
          min: 0,
          max: 5,
          step: 0.05,
          onChange: edit(
            (v) =>
              controlsRef.current &&
              (controlsRef.current.azimuthRotateSpeed = v),
          ),
        },
        polarRotateSpeed: {
          value: 1,
          min: 0,
          max: 5,
          step: 0.05,
          onChange: edit(
            (v) =>
              controlsRef.current && (controlsRef.current.polarRotateSpeed = v),
          ),
        },
        dollySpeed: {
          value: 1,
          min: 0,
          max: 5,
          step: 0.05,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.dollySpeed = v),
          ),
        },
        truckSpeed: {
          value: 2,
          min: 0,
          max: 10,
          step: 0.05,
          onChange: edit(
            (v) => controlsRef.current && (controlsRef.current.truckSpeed = v),
          ),
        },
        dollyToCursor: {
          value: false,
          onChange: edit(
            (v) =>
              controlsRef.current && (controlsRef.current.dollyToCursor = v),
          ),
        },
        infinityDolly: {
          // value: camera.infinityDolly ?? false,
          value: false,
          onChange: edit(
            (v) =>
              controlsRef.current && (controlsRef.current.infinityDolly = v),
          ),
        },
      },
      { collapsed: true },
    ),

    // ---------- Actions ----------
    Actions: folder(
      {
        "reset camera": button(() => controlsRef.current?.reset(true)),
        "log state": button(() => {
          const c = controlsRef.current;
          if (!c) return;
          console.log({
            position: c.getPosition(new Vector3()).toArray(),
            target: c.getTarget(new Vector3()).toArray(),
            azimuth: c.azimuthAngle,
            polar: c.polarAngle,
            distance: c.distance,
            zoom: c.zoom,
          });
        }),
      },
      { collapsed: true },
    ),
  }));

  useFrame(() => {
    const c = controlsRef.current;
    if (!c) return;

    live.rotationDeg.current = fmt(
      MathUtils.radToDeg(camera.rotation.x),
      MathUtils.radToDeg(camera.rotation.y),
      MathUtils.radToDeg(camera.rotation.z),
    );
    live.quaternion.current = fmt(
      camera.quaternion.x,
      camera.quaternion.y,
      camera.quaternion.z,
      camera.quaternion.w,
    );
    live.up.current = fmt(camera.up.x, camera.up.y, camera.up.z);
    live.type.current = (camera as PerspectiveCamera).isPerspectiveCamera
      ? "perspective"
      : "orthographic";
    live.aspect.current = String(
      round((camera as PerspectiveCamera).aspect ?? size.width / size.height),
    );
    live.viewport.current = `${size.width} x ${size.height}`;

    if (c) {
      c.getPosition(_pos, false);
      c.getTarget(_target, false);
      c.getFocalOffset(_offset, false);
      c.getSpherical(_sph, false);

      live.position.current = fmt(_pos.x, _pos.y, _pos.z);
      live.target.current = fmt(_target.x, _target.y, _target.z);
      live.focalOffset.current = fmt(_offset.x, _offset.y, _offset.z);
      live.distance.current = String(round(c.distance));
      live.azimuthDeg.current = String(deg(c.azimuthAngle));
      live.polarDeg.current = String(deg(c.polarAngle));
      live.sphericalRadius.current = String(round(_sph.radius));
      live.sphericalPhiDeg.current = String(deg(_sph.phi));
      live.sphericalThetaDeg.current = String(deg(_sph.theta));
    } else {
      live.position.current = fmt(
        camera.position.x,
        camera.position.y,
        camera.position.z,
      );
    }
  });

  return null;
}
