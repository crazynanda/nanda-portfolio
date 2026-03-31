import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { BallCollider, Physics, RigidBody, useRopeJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

interface LanyardSceneProps {
  portraitUrl: string;
}

function LanyardScene({ portraitUrl }: LanyardSceneProps) {
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const band = useRef<THREE.Mesh>(null);
  
  const { width, height } = useThree((state) => state.size);
  const [dragged, drag] = useState(false);
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]), []);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.8]);

  useFrame((state) => {
    if (!j1.current || !j2.current || !j3.current || !fixed.current || !band.current) return;

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.translation());
    curve.points[2].copy(j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    (band.current.geometry as any).setPoints(curve.getPoints(32));

    if (cardRef.current) {
      if (dragged) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        const dir = new THREE.Vector3().copy(vec).sub(state.camera.position).normalize();
        vec.add(dir.multiplyScalar(state.camera.position.length()));
        cardRef.current.setNextKinematicTranslation({
          x: vec.x,
          y: vec.y,
          z: vec.z,
        });
      }

      ang.current.copy(cardRef.current.angvel());
      rot.current.copy(cardRef.current.rotation());
      cardRef.current.setAngvel({
        x: ang.current.x,
        y: ang.current.y - rot.current.y * 0.25,
        z: ang.current.z,
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

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
        <meshLineMaterial color="#ff6b6b" resolution={[width, height]} lineWidth={2} />
      </mesh>

      <RigidBody
        ref={cardRef}
        type={dragged ? "kinematicPosition" : "dynamic"}
        colliders={false}
        position={[1.5, -0.5, 0]}
      >
        <mesh
          onPointerUp={() => drag(false)}
          onPointerDown={() => drag(true)}
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
      </RigidBody>
    </>
  );
}

interface LanyardProps {
  portraitUrl?: string;
}

export default function Lanyard({ portraitUrl = "/images/about/portrait.jpg" }: LanyardProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <LanyardScene portraitUrl={portraitUrl} />
        </Physics>
      </Canvas>
    </div>
  );
}