"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface LanyardSceneProps {
  portraitUrl: string;
}

function IDCard({ portraitUrl }: LanyardSceneProps) {
  const cardRef = useRef<THREE.Group>(null);
  const texture = useTexture(portraitUrl);

  useFrame((state) => {
    if (!cardRef.current) return;
    const t = state.clock.getElapsedTime();
    cardRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    cardRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={cardRef} position={[0, -0.5, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.2, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0, 1.2, 0.025]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function LanyardCord() {
  const cordRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0.3, 2, 0),
      new THREE.Vector3(0.6, 1.5, 0),
      new THREE.Vector3(0.8, 1, 0),
      new THREE.Vector3(0.9, 0.5, 0),
    ]);
  }, []);

  useFrame((state) => {
    if (!cordRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = cordRef.current.geometry.attributes.position;
    if (!positions) return;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      positions.setX(i, x + Math.sin(t * 2 + y * 3) * 0.01);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={cordRef}>
      <tubeGeometry args={[curve, 20, 0.03, 8, false]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}

function Clip() {
  return (
    <mesh position={[0, 2.5, 0]}>
      <boxGeometry args={[0.3, 0.15, 0.05]} />
      <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function LanyardScene({ portraitUrl }: LanyardSceneProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 0, 4]} intensity={0.5} />

      <Clip />
      <LanyardCord />
      <IDCard portraitUrl={portraitUrl} />
    </>
  );
}

interface LanyardProps {
  portraitUrl?: string;
}

export default function Lanyard({ portraitUrl = "/images/about/portrait.jpg" }: LanyardProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <LanyardScene portraitUrl={portraitUrl} />
      </Canvas>
    </div>
  );
}