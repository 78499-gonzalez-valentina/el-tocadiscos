"use client";

import { TOP_Y } from "@/lib/layout3d";

function LamparaDeLava() {
  return (
    <group position={[0.62, TOP_Y, 0]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.04, 20]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.155, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.23, 24]} />
        <meshPhysicalMaterial
          color="#3a2a12"
          roughness={0.15}
          transmission={0.55}
          thickness={0.05}
          ior={1.3}
        />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <sphereGeometry args={[0.026, 12, 12]} />
        <meshStandardMaterial color="#e0862f" emissive="#e0862f" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.008, 0.19, 0.006]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#e0862f" emissive="#e0862f" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 0.285, 0]} castShadow>
        <cylinderGeometry args={[0.052, 0.045, 0.03, 20]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.4} metalness={0.6} />
      </mesh>
      <pointLight position={[0, 0.15, 0]} intensity={0.35} color="#e0862f" distance={0.8} />
    </group>
  );
}

function Parlante() {
  return (
    <group position={[1.02, TOP_Y, -0.05]}>
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.18, 0.14]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.11, 0.071]}>
        <circleGeometry args={[0.05, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, 0.071]}>
        <circleGeometry args={[0.028, 24]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Figurita() {
  return (
    <group position={[1.32, TOP_Y, 0.02]}>
      <mesh position={[0, 0.045, 0]} castShadow>
        <boxGeometry args={[0.05, 0.09, 0.03]} />
        <meshStandardMaterial color="#3a6b8f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.11, 0]} castShadow>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshStandardMaterial color="#e3ab7d" roughness={0.5} />
      </mesh>
      <mesh position={[-0.015, 0.005, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.05, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      <mesh position={[0.015, 0.005, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.05, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function SuperficieDecor() {
  return (
    <group>
      <LamparaDeLava />
      <Parlante />
      <Figurita />
    </group>
  );
}
