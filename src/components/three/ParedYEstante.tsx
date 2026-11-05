"use client";

import { CREDENZA_ANCHO, CREDENZA_PROFUNDIDAD, TOP_Y } from "@/lib/layout3d";

const ESTANTE_Y = TOP_Y + 0.62;

export default function ParedYEstante() {
  return (
    <group>
      <mesh position={[0, 1.6, -1.05]} receiveShadow>
        <planeGeometry args={[9, 4.4]} />
        <meshStandardMaterial color="#2a2824" roughness={0.95} metalness={0} />
      </mesh>

      <mesh position={[0, -0.001, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial color="#1c1a17" roughness={0.9} metalness={0} />
      </mesh>

      <mesh position={[0, ESTANTE_Y, -0.42]} receiveShadow castShadow>
        <boxGeometry args={[CREDENZA_ANCHO * 0.86, 0.035, CREDENZA_PROFUNDIDAD * 0.62]} />
        <meshStandardMaterial color="#c7a765" roughness={0.6} metalness={0.05} />
      </mesh>

      <group position={[0, ESTANTE_Y + 0.02, -0.42]}>
        <mesh position={[-1.05, 0.09, 0]} castShadow>
          <boxGeometry args={[0.02, 0.18, 0.14]} />
          <meshStandardMaterial color="#caa66b" roughness={0.6} />
        </mesh>
        <mesh position={[-1.05, 0.09, 0]} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.014]} />
          <meshStandardMaterial color="#7f97a8" roughness={0.5} metalness={0.1} />
        </mesh>

        <mesh position={[-0.55, 0.045, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.09, 16]} />
          <meshStandardMaterial color="#b4703f" roughness={0.8} />
        </mesh>
        <mesh position={[-0.55, 0.13, 0]} castShadow>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#4d7a4f" roughness={0.7} />
        </mesh>

        <mesh position={[0, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#e3a98a" roughness={0.4} metalness={0.05} />
        </mesh>

        <mesh position={[0.55, 0.05, 0]} rotation-z={0.25} castShadow>
          <boxGeometry args={[0.09, 0.09, 0.02]} />
          <meshStandardMaterial color="#d9b74a" roughness={0.6} />
        </mesh>
        <mesh position={[0.55, -0.02, 0]} castShadow>
          <boxGeometry args={[0.12, 0.05, 0.09]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[1.05, 0.06, 0]} castShadow>
          <boxGeometry args={[0.22, 0.14, 0.01]} />
          <meshStandardMaterial color="#8896a1" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
