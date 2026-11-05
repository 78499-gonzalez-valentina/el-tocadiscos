"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { crearTexturaEtiqueta, crearTexturaFunda, crearTexturaSurcos } from "@/lib/canvasTexturas";
import { DISCO_ALTO, FUNDA_LADO, PLATO_CENTRO, PLATO_RADIO } from "@/lib/layout3d";
import type { Vinilo as ViniloData } from "@/data/vinilos";

type Props = {
  vinilo: ViniloData | null;
  origen: [number, number, number];
  girando: boolean;
  onLlegar: () => void;
};

const DURACION = 0.75;
const ARCO_ALTURA = 0.55;
const GIRO_EXTRA = Math.PI * 1.4;
const VELOCIDAD_GIRO = (Math.PI * 2) / 1.8;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ViniloActivo({ vinilo, origen, girando, onLlegar }: Props) {
  const grupoRef = useRef<THREE.Group>(null);
  const fundaMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const discoMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const etiquetaMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const discoGrupoRef = useRef<THREE.Group>(null);

  const progresoRef = useRef(0);
  const llegadaAvisadaRef = useRef(false);
  const viniloIdAnteriorRef = useRef<string | null>(null);

  const texturaFunda = useMemo(() => {
    if (typeof document === "undefined" || !vinilo) return null;
    return crearTexturaFunda(vinilo.titulo, vinilo.artista, vinilo.colorFunda, vinilo.colorFundaOscuro);
  }, [vinilo]);

  const texturaEtiqueta = useMemo(() => {
    if (typeof document === "undefined" || !vinilo) return null;
    return crearTexturaEtiqueta(vinilo.titulo, vinilo.artista, vinilo.colorFunda, vinilo.colorFundaOscuro);
  }, [vinilo]);

  const texturaSurcos = useMemo(() => {
    if (typeof document === "undefined" || !vinilo) return null;
    return crearTexturaSurcos(vinilo.colorVinilo);
  }, [vinilo]);

  useEffect(() => {
    if (vinilo && vinilo.id !== viniloIdAnteriorRef.current) {
      progresoRef.current = 0;
      llegadaAvisadaRef.current = false;
      viniloIdAnteriorRef.current = vinilo.id;
    }
    if (!vinilo) {
      viniloIdAnteriorRef.current = null;
    }
  }, [vinilo]);

  useFrame((_, delta) => {
    if (!vinilo || !grupoRef.current) return;

    if (progresoRef.current < 1) {
      progresoRef.current = Math.min(1, progresoRef.current + delta / DURACION);
    }
    const t = easeInOutCubic(progresoRef.current);

    const x = origen[0] + (PLATO_CENTRO[0] - origen[0]) * t;
    const y = origen[1] + (PLATO_CENTRO[1] - origen[1]) * t + Math.sin(Math.PI * t) * ARCO_ALTURA;
    const z = origen[2] + (PLATO_CENTRO[2] - origen[2]) * t;
    grupoRef.current.position.set(x, y, z);
    grupoRef.current.rotation.y = t * GIRO_EXTRA;
    grupoRef.current.rotation.x = Math.sin(Math.PI * t) * 0.5;

    const mezcla = Math.min(1, Math.max(0, (progresoRef.current - 0.55) / 0.45));
    if (fundaMatRef.current) fundaMatRef.current.opacity = 1 - mezcla;
    if (discoMatRef.current) discoMatRef.current.opacity = mezcla;
    if (etiquetaMatRef.current) etiquetaMatRef.current.opacity = mezcla;

    if (progresoRef.current >= 1 && !llegadaAvisadaRef.current) {
      llegadaAvisadaRef.current = true;
      onLlegar();
    }

    if (discoGrupoRef.current && girando) {
      discoGrupoRef.current.rotation.y += VELOCIDAD_GIRO * delta;
    }
  });

  if (!vinilo) return null;

  return (
    <group ref={grupoRef} position={origen}>
      <mesh castShadow>
        <boxGeometry args={[FUNDA_LADO, FUNDA_LADO, 0.012]} />
        <meshStandardMaterial
          ref={fundaMatRef}
          map={texturaFunda ?? undefined}
          color={texturaFunda ? undefined : vinilo.colorFunda}
          roughness={0.85}
          transparent
          opacity={1}
        />
      </mesh>

      <group ref={discoGrupoRef}>
        <mesh castShadow>
          <cylinderGeometry args={[PLATO_RADIO * 0.92, PLATO_RADIO * 0.92, DISCO_ALTO, 64]} />
          <meshStandardMaterial
            ref={discoMatRef}
            map={texturaSurcos ?? undefined}
            color={texturaSurcos ? undefined : vinilo.colorVinilo}
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh position-y={DISCO_ALTO / 2 + 0.001} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[PLATO_RADIO * 0.32, 48]} />
          <meshStandardMaterial
            ref={etiquetaMatRef}
            map={texturaEtiqueta ?? undefined}
            color={texturaEtiqueta ? undefined : vinilo.colorFunda}
            roughness={0.6}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </group>
  );
}
