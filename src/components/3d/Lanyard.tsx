"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function LanyardContent({ portraitUrl }: { portraitUrl: string }) {
  const cardRef = useRef<THREE.Group>(null);
  const cordRef = useRef<THREE.Mesh>(null);
  
  const texture = useTexture(portraitUrl);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      cardRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    
    if (cordRef.current) {
      const positions = cordRef.current.geometry.attributes.position;
      if (positions) {
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          positions.setX(i, x + Math.sin(t * 3 + y * 2) * 0.01);
        }
        positions.needsUpdate = true;
      }
    }
  });

  const cordCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0.15, 2.2, 0),
      new THREE.Vector3(0.3, 1.8, 0),
      new THREE.Vector3(0.4, 1.4, 0),
      new THREE.Vector3(0.45, 1.0, 0),
      new THREE.Vector3(0.4, 0.7, 0),
    ]);
  }, []);

  return (
    <>
      {/* Clip at top */}
      <mesh position={[0, 2.65, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Lanyard cord */}
      <mesh ref={cordRef}>
        <tubeGeometry args={[cordCurve, 24, 0.02, 8, false]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Card */}
      <group ref={cardRef} position={[0, -0.2, 0]}>
        {/* Card body */}
        <mesh>
          <boxGeometry args={[1.4, 2.0, 0.04]} />
          <meshPhysicalMaterial color="#1a1a1a" clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        
        {/* Portrait */}
        <mesh position={[0, 0.05, 0.025]}>
          <planeGeometry args={[1.2, 1.6]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        
        {/* Photo placeholder circle */}
        <mesh position={[0, 0.95, 0.025]}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

export default function Lanyard({ portraitUrl = "/images/about/portrait.jpg" }: { portraitUrl?: string }) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.8, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={0.8} />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} />
        
        <LanyardContent portraitUrl={portraitUrl} />
      </Canvas>
    </div>
  );
}