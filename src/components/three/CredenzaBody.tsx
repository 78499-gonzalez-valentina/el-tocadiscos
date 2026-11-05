"use client";

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  CREDENZA_ALTO,
  CREDENZA_ANCHO,
  CREDENZA_PROFUNDIDAD,
  ESPESOR_TAPA,
  CASILLERO_ANCHO,
  CASILLERO_ALTO_FILA,
  CASILLERO_GAP,
  CASILLERO_MARGEN_Y,
  DIVISOR_MEDIO_ALTO,
  baseYCasillero,
  centroXCasillero,
} from "@/lib/layout3d";

const ESPESOR_PANEL = 0.03;
const MARCO_COLOR = "#3f4a3c";

export default function CredenzaBody() {
  const madera = useTexture("/images/textura-madera.jpg");

  const maderaLabio = useMemo(() => {
    if (typeof document === "undefined") return madera;
    return madera.clone();
  }, [madera]);

  useMemo(() => {
    /* eslint-disable react-hooks/immutability -- mutación estándar de r3f/drei para configurar la textura */
    madera.wrapS = madera.wrapT = THREE.RepeatWrapping;
    madera.repeat.set(0.9, 0.5);
    madera.colorSpace = THREE.SRGBColorSpace;
    madera.needsUpdate = true;

    // El labio frontal es una caja muy angosta (ancho >> alto): reusar la misma
    // textura con el mismo repeat la estira verticalmente en esa cara. Se usa un
    // clon con su propio repeat ajustado al aspecto real de esa caja.
    maderaLabio.wrapS = maderaLabio.wrapT = THREE.RepeatWrapping;
    maderaLabio.repeat.set(2.4, 0.4);
    maderaLabio.colorSpace = THREE.SRGBColorSpace;
    maderaLabio.needsUpdate = true;
    /* eslint-enable react-hooks/immutability */
  }, [madera, maderaLabio]);

  const patasY = -0.06;
  const patasOffsetX = CREDENZA_ANCHO / 2 - 0.12;
  const patasOffsetZ = CREDENZA_PROFUNDIDAD / 2 - 0.08;
  const fondoZ = -CREDENZA_PROFUNDIDAD / 2 + ESPESOR_PANEL / 2;

  const xDivisores = [0, 1, 2].map(
    (i) => centroXCasillero(i) + CASILLERO_ANCHO / 2 + CASILLERO_GAP / 2
  );

  return (
    <group>
      {/* fondo (pared trasera de la carcasa) */}
      <mesh position={[0, CREDENZA_ALTO / 2, fondoZ]} receiveShadow castShadow>
        <boxGeometry args={[CREDENZA_ANCHO, CREDENZA_ALTO, ESPESOR_PANEL]} />
        <meshStandardMaterial color={MARCO_COLOR} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* laterales */}
      {[-1, 1].map((sx) => (
        <mesh
          key={sx}
          position={[sx * (CREDENZA_ANCHO / 2 - ESPESOR_PANEL / 2), CREDENZA_ALTO / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[ESPESOR_PANEL, CREDENZA_ALTO, CREDENZA_PROFUNDIDAD]} />
          <meshStandardMaterial color={MARCO_COLOR} roughness={0.55} metalness={0.05} />
        </mesh>
      ))}

      {/* divisores verticales entre columnas */}
      {xDivisores.map((x, i) => (
        <mesh key={i} position={[x, CREDENZA_ALTO / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[ESPESOR_PANEL, CREDENZA_ALTO, CREDENZA_PROFUNDIDAD]} />
          <meshStandardMaterial color={MARCO_COLOR} roughness={0.55} metalness={0.05} />
        </mesh>
      ))}

      {/* divisor horizontal entre fila superior e inferior */}
      <mesh
        position={[0, CASILLERO_MARGEN_Y + CASILLERO_ALTO_FILA + DIVISOR_MEDIO_ALTO / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[CREDENZA_ANCHO, DIVISOR_MEDIO_ALTO, CREDENZA_PROFUNDIDAD]} />
        <meshStandardMaterial color={MARCO_COLOR} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* pisos de madera de cada casillero, con labio frontal */}
      {[0, 1].map((fila) =>
        [0, 1, 2, 3].map((col) => {
          const y = baseYCasillero(fila);
          const x = centroXCasillero(col);
          return (
            <group key={`${fila}-${col}`}>
              <mesh position={[x, y + 0.003, 0]} rotation-x={-Math.PI / 2} receiveShadow>
                <planeGeometry args={[CASILLERO_ANCHO - 0.01, CREDENZA_PROFUNDIDAD - 0.02]} />
                <meshStandardMaterial map={madera} roughness={0.8} metalness={0.02} />
              </mesh>
              <mesh
                position={[x, y + 0.035, CREDENZA_PROFUNDIDAD / 2 - 0.015]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[CASILLERO_ANCHO - 0.01, 0.07, 0.03]} />
                <meshStandardMaterial map={maderaLabio} roughness={0.75} metalness={0.02} />
              </mesh>
            </group>
          );
        })
      )}

      <mesh position={[0, CREDENZA_ALTO + ESPESOR_TAPA / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[CREDENZA_ANCHO + 0.03, ESPESOR_TAPA, CREDENZA_PROFUNDIDAD + 0.03]} />
        <meshStandardMaterial color="#3f4a3c" roughness={0.45} metalness={0.08} />
      </mesh>

      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}-${sz}`}
            position={[sx * patasOffsetX, patasY, sz * patasOffsetZ]}
            castShadow
          >
            <cylinderGeometry args={[0.018, 0.022, 0.12, 12]} />
            <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}
