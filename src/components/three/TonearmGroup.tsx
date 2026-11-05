"use client";

import { useSpring, a } from "@react-spring/three";
import type { Vector3Tuple } from "three";

type Props = {
  pivote: Vector3Tuple;
  activo: boolean;
  onTocarDisco: () => void;
};

const ANGULO_REPOSO = 0.55;
const ANGULO_APROXIMACION = -0.02;
const ANGULO_REPRODUCCION = -0.1;

const LARGO_BRAZO = 0.46;

export default function TonearmGroup({ pivote, activo, onTocarDisco }: Props) {
  const { rotY } = useSpring({
    rotY: activo
      ? [
          { rotY: ANGULO_APROXIMACION, config: { tension: 90, friction: 18 } },
          { rotY: ANGULO_REPRODUCCION, config: { tension: 260, friction: 14 } },
        ]
      : ANGULO_REPOSO,
    from: { rotY: ANGULO_REPOSO },
    config: { tension: 90, friction: 18 },
    onRest: () => {
      if (activo) onTocarDisco();
    },
  });

  return (
    <group position={pivote}>
      <a.group rotation-y={rotY}>
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.02, 0.05, 16]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.7} />
        </mesh>

        <mesh position={[-LARGO_BRAZO / 2, 0.03, 0]} castShadow>
          <boxGeometry args={[LARGO_BRAZO, 0.014, 0.02]} />
          <meshStandardMaterial color="#c7c7c7" roughness={0.35} metalness={0.75} />
        </mesh>

        <mesh position={[-LARGO_BRAZO - 0.02, 0.02, 0]} castShadow>
          <boxGeometry args={[0.06, 0.03, 0.045]} />
          <meshStandardMaterial color="#161616" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-LARGO_BRAZO - 0.05, -0.003, 0]}>
          <boxGeometry args={[0.006, 0.02, 0.006]} />
          <meshStandardMaterial color="#d8d8d8" roughness={0.3} metalness={0.4} />
        </mesh>
      </a.group>
    </group>
  );
}
