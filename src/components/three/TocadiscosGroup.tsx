"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { crearTexturaSurcos } from "@/lib/canvasTexturas";
import {
  BRAZO_PIVOTE,
  PLATO_ALTO,
  PLATO_RADIO,
  PLATO_Y,
  TOCADISCOS_CUERPO_ALTO,
  TOCADISCOS_CUERPO_ANCHO,
  TOCADISCOS_CUERPO_PROFUNDIDAD,
  TOCADISCOS_CUERPO_Y,
  TOCADISCOS_X,
  TOCADISCOS_Z,
} from "@/lib/layout3d";
import TonearmGroup from "./TonearmGroup";

type Props = {
  brazoActivo: boolean;
  girando: boolean;
  onTocarDisco: () => void;
};

const VELOCIDAD_GIRO = (Math.PI * 2) / 1.8;

export default function TocadiscosGroup({ brazoActivo, girando, onTocarDisco }: Props) {
  const platoRef = useRef<THREE.Group>(null);

  const texturaFieltro = useMemo(() => {
    if (typeof document === "undefined") return null;
    return crearTexturaSurcos("#232323");
  }, []);

  useFrame((_, delta) => {
    if (platoRef.current && girando) {
      platoRef.current.rotation.y += VELOCIDAD_GIRO * delta;
    }
  });

  return (
    <group>
      <mesh position={[TOCADISCOS_X, TOCADISCOS_CUERPO_Y, TOCADISCOS_Z]} castShadow receiveShadow>
        <boxGeometry
          args={[TOCADISCOS_CUERPO_ANCHO, TOCADISCOS_CUERPO_ALTO, TOCADISCOS_CUERPO_PROFUNDIDAD]}
        />
        <meshStandardMaterial color="#111214" roughness={0.35} metalness={0.35} />
      </mesh>

      <group ref={platoRef} position={[TOCADISCOS_X, PLATO_Y, TOCADISCOS_Z]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[PLATO_RADIO, PLATO_RADIO, PLATO_ALTO, 64]} />
          <meshStandardMaterial
            map={texturaFieltro ?? undefined}
            color={texturaFieltro ? undefined : "#1f1f1f"}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>

      <mesh
        position={[
          TOCADISCOS_X + TOCADISCOS_CUERPO_ANCHO / 2 - 0.14,
          TOCADISCOS_CUERPO_Y + TOCADISCOS_CUERPO_ALTO / 2 + 0.001,
          TOCADISCOS_Z + TOCADISCOS_CUERPO_PROFUNDIDAD / 2 - 0.16,
        ]}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.006, 24]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.7} />
      </mesh>

      <TonearmGroup pivote={BRAZO_PIVOTE} activo={brazoActivo} onTocarDisco={onTocarDisco} />

      <group
        position={[
          TOCADISCOS_X,
          TOCADISCOS_CUERPO_Y + TOCADISCOS_CUERPO_ALTO / 2,
          TOCADISCOS_Z - TOCADISCOS_CUERPO_PROFUNDIDAD / 2 + 0.01,
        ]}
        rotation-x={-1.22}
      >
        <mesh position={[0, 0, TOCADISCOS_CUERPO_PROFUNDIDAD / 2]} castShadow>
          <boxGeometry
            args={[TOCADISCOS_CUERPO_ANCHO * 0.98, 0.012, TOCADISCOS_CUERPO_PROFUNDIDAD * 0.97]}
          />
          <meshPhysicalMaterial
            color="#cfd6d6"
            roughness={0.08}
            metalness={0}
            transmission={0.85}
            thickness={0.05}
            ior={1.45}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
