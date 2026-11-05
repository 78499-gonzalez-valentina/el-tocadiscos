"use client";

import { useMemo } from "react";
import { useSpring, a } from "@react-spring/three";
import { crearTexturaFunda } from "@/lib/canvasTexturas";
import { FUNDA_INCLINACION, FUNDA_LADO } from "@/lib/layout3d";
import type { Vinilo as ViniloData } from "@/data/vinilos";

type Props = {
  posicion: [number, number, number];
  visible: boolean;
  vinilo?: ViniloData;
  colorFunda?: string;
  colorFundaOscuro?: string;
  inclinacionExtra?: number;
  onClick?: () => void;
};

export default function FundaEstatica({
  posicion,
  visible,
  vinilo,
  colorFunda,
  colorFundaOscuro,
  inclinacionExtra = 0,
  onClick,
}: Props) {
  const color = vinilo?.colorFunda ?? colorFunda ?? "#999";
  const colorOscuro = vinilo?.colorFundaOscuro ?? colorFundaOscuro ?? "#444";

  const textura = useMemo(() => {
    if (typeof document === "undefined") return null;
    if (!vinilo) return null;
    return crearTexturaFunda(vinilo.titulo, vinilo.artista, color, colorOscuro);
  }, [vinilo, color, colorOscuro]);

  const { escala } = useSpring({
    escala: visible ? 1 : 0,
    config: { tension: 260, friction: 20 },
  });

  return (
    <a.group position={posicion} scale={escala}>
      <mesh
        position={[0, FUNDA_LADO / 2, 0]}
        rotation-x={FUNDA_INCLINACION + inclinacionExtra}
        castShadow
        onClick={
          onClick
            ? (e) => {
                e.stopPropagation();
                if (visible) onClick();
              }
            : undefined
        }
      >
        <boxGeometry args={[FUNDA_LADO, FUNDA_LADO, 0.014]} />
        {textura ? (
          <meshStandardMaterial map={textura} roughness={0.85} metalness={0.02} />
        ) : (
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.02} />
        )}
      </mesh>
    </a.group>
  );
}
