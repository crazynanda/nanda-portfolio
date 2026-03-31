"use client";

import * as THREE from "three";
import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { BallCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useTexture } from "@react-three/drei";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: unknown;
    meshLineMaterial: unknown;
  }
}

function Card({ portraitUrl }: { portraitUrl: string }) {
  const card = useRef<any>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const [dragged, drag] = useState<false | THREE.Vector3>(false);

  const texture = useTexture(portraitUrl);

  useFrame((state) => {
    if (!card.current) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      const dir = new THREE.Vector3().copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    ang.current.copy(card.current.angvel());
    rot.current.copy(card.current.rotation());
    card.current.setAngvel({
      x: ang.current.x,
      y: ang.current.y - rot.current.y * 0.25,
      z: ang.current.z,
    });
  });

  return (
    <RigidBody
      ref={card}
      type={dragged ? "kinematicPosition" : "dynamic"}
      colliders={false}
      position={[1.45, -1.3, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh
        onPointerUp={(e) => {
          e.stopPropagation();
          drag(false);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          const pos = card.current.translation();
          drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(pos.x, pos.y, pos.z)));
        }}
      >
        <boxGeometry args={[1.6, 2.25, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          clearcoat={1}
          clearcoatRoughness={0.15}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.4, 1.95]} />
        <meshStandardMaterial map={texture} side={THREE.FrontSide} />
      </mesh>
    </RigidBody>
  );
}

function Band() {
  const band = useRef<any>(null);
  const { width, height } = useThree((state) => state.size);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    []
  );

  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useFrame(() => {
    if (!band.current || !j1.current || !j2.current || !fixed.current || !j3.current) return;

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.translation());
    curve.points[2].copy(j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    (band.current.geometry as any)?.setPoints?.(curve.getPoints(32));
  });

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[0, 2.5, 0]} colliders={false} />
      <RigidBody position={[0.5, 2, 0]} ref={j1} colliders={false}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1, 1.5, 0]} ref={j2} colliders={false}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1.5, 1, 0]} ref={j3} colliders={false}>
        <BallCollider args={[0.1]} />
      </RigidBody>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ff6b6b"
          resolution={[width, height]}
          lineWidth={2}
        />
      </mesh>
    </>
  );
}

function Clip() {
  return (
    <mesh position={[0, 2.7, 0]}>
      <boxGeometry args={[0.4, 0.2, 0.08]} />
      <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

function LanyardScene({ portraitUrl }: { portraitUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 4]} intensity={0.4} />

      <Physics gravity={[0, -9.81, 0]} timeStep="vary">
        <Clip />
        <Band />
        <Suspense fallback={null}>
          <Card portraitUrl={portraitUrl} />
        </Suspense>
      </Physics>
    </>
  );
}

export default function Lanyard({ portraitUrl = "/images/about/portrait.jpg" }: { portraitUrl?: string }) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <LanyardScene portraitUrl={portraitUrl} />
      </Canvas>
    </div>
  );
}