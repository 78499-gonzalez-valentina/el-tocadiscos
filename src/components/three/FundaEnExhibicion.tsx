"use client";

import { useMemo, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import { crearTexturaFunda } from "@/lib/canvasTexturas";
import { TOP_Y } from "@/lib/layout3d";
import type { Vinilo as ViniloData } from "@/data/vinilos";

const X = -0.08;
const Z = 0.16;
const LADO = 0.24;
const INCLINACION = -0.28;

type Props = {
  vinilo: ViniloData | null;
};

export default function FundaEnExhibicion({ vinilo }: Props) {
  const [{ mostrado, ultimoVinilo }, setEstado] = useState<{
    mostrado: ViniloData | null;
    ultimoVinilo: ViniloData | null;
  }>({ mostrado: vinilo, ultimoVinilo: vinilo });

  if (vinilo && vinilo !== ultimoVinilo) {
    setEstado({ mostrado: vinilo, ultimoVinilo: vinilo });
  }

  const { escala } = useSpring({
    escala: vinilo ? 1 : 0,
    config: { tension: 220, friction: 18 },
    onRest: () => {
      if (!vinilo) setEstado({ mostrado: null, ultimoVinilo: null });
    },
  });

  const textura = useMemo(() => {
    if (typeof document === "undefined" || !mostrado) return null;
    return crearTexturaFunda(
      mostrado.titulo,
      mostrado.artista,
      mostrado.colorFunda,
      mostrado.colorFundaOscuro
    );
  }, [mostrado]);

  return (
    <a.group position={[X, TOP_Y, Z]} scale={escala}>
      <mesh position={[0, 0.006, 0]} receiveShadow castShadow>
        <boxGeometry args={[LADO * 0.62, 0.012, 0.09]} />
        <meshStandardMaterial color="#141414" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0.028]} rotation-x={0.35} castShadow>
        <boxGeometry args={[LADO * 0.6, 0.03, 0.01]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.5} metalness={0.3} />
      </mesh>

      {mostrado && (
        <mesh position={[0, LADO / 2 + 0.02, -0.01]} rotation-x={INCLINACION} castShadow>
          <boxGeometry args={[LADO, LADO, 0.012]} />
          <meshStandardMaterial
            map={textura ?? undefined}
            color={textura ? undefined : mostrado.colorFunda}
            roughness={0.8}
            metalness={0.02}
          />
        </mesh>
      )}
    </a.group>
  );
}
