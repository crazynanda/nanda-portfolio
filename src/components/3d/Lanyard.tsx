"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function Card({ portraitUrl }: { portraitUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  let texture: THREE.Texture;
  try {
    texture = useTexture(portraitUrl);
  } catch (e) {
    console.error("Failed to load texture:", e);
    texture = new THREE.Texture();
  }
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={meshRef} position={[0, -0.3, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 2.1, 0.06]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          clearcoat={1}
          clearcoatRoughness={0.15}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[0, 1.15, 0.035]}>
        <circleGeometry args={[0.12, 32]} />
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
      new THREE.Vector3(0.2, 2.2, 0),
      new THREE.Vector3(0.4, 1.8, 0),
      new THREE.Vector3(0.5, 1.4, 0),
      new THREE.Vector3(0.55, 1.0, 0),
      new THREE.Vector3(0.5, 0.6, 0),
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
      const offset = Math.sin(t * 3 + y * 2) * 0.015;
      positions.setX(i, x + offset);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={cordRef}>
      <tubeGeometry args={[curve, 32, 0.025, 8, false]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}

function Clip() {
  return (
    <mesh position={[0, 2.7, 0]}>
      <boxGeometry args={[0.35, 0.18, 0.06]} />
      <meshStandardMaterial color="#888" metalness={0.9} roughness={0.15} />
    </mesh>
  );
}

function Scene({ portraitUrl }: { portraitUrl: string }) {
  console.log("Lanyard scene rendering with portrait:", portraitUrl);
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 2, 4]} intensity={0.5} />

      <Clip />
      <LanyardCord />
      <Card portraitUrl={portraitUrl} />
    </>
  );
}

export default function Lanyard({ portraitUrl = "/images/about/portrait.jpg" }: { portraitUrl?: string }) {
  console.log("Lanyard component render, portraitUrl:", portraitUrl);
  
  return (
    <div className="w-full h-full min-h-[400px]" style={{ background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={() => console.log("Canvas created successfully")}
        onError={(error) => console.error("Canvas error:", error)}
      >
        <Scene portraitUrl={portraitUrl} />
      </Canvas>
    </div>
  );
}