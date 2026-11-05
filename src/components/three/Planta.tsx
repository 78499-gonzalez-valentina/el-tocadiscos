"use client";

import { CREDENZA_ANCHO } from "@/lib/layout3d";

const X = CREDENZA_ANCHO / 2 + 0.95;
const Z = 0.5;

const HOJAS: Array<[number, number, number, number, number]> = [
  [0, 0.62, 0, 0.55, 0.08],
  [0.16, 0.72, 0.08, 0.5, 0.75],
  [-0.15, 0.78, -0.05, 0.52, -0.7],
  [0.05, 0.86, -0.14, 0.48, 2.2],
  [-0.08, 0.68, 0.16, 0.5, -2.4],
  [0.2, 0.55, -0.15, 0.46, 1.5],
];

export default function Planta() {
  return (
    <group position={[X, 0, Z]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.04, 20]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.17, 0.21, 0.36, 20]} />
        <meshStandardMaterial color="#b5673a" roughness={0.85} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.02, 20]} />
        <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
      </mesh>

      {HOJAS.map(([dx, dy, dz, alto, rot], i) => (
        <group key={i} position={[dx, dy - 0.22, dz]} rotation-y={rot}>
          <mesh position={[0, alto / 2, 0]} rotation-z={0.18} castShadow>
            <cylinderGeometry args={[0.006, 0.01, alto, 6]} />
            <meshStandardMaterial color="#3d5a2f" roughness={0.7} />
          </mesh>
          <mesh position={[0.06, alto * 0.92, 0]} rotation-z={0.5} castShadow>
            <coneGeometry args={[0.09, 0.42, 8]} />
            <meshStandardMaterial color="#4d7a3f" roughness={0.65} side={2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
