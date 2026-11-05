"use client";

import { useCallback, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { vinilos, type Vinilo as ViniloData } from "@/data/vinilos";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { posicionFunda } from "@/lib/layout3d";
import CredenzaBody from "./CredenzaBody";
import FundaEstatica from "./FundaEstatica";
import ViniloActivo from "./ViniloActivo";
import TocadiscosGroup from "./TocadiscosGroup";
import ParedYEstante from "./ParedYEstante";
import LamparaPie from "./LamparaPie";
import SuperficieDecor from "./SuperficieDecor";
import Planta from "./Planta";
import Alfombra from "./Alfombra";
import FundaEnExhibicion from "./FundaEnExhibicion";

type Relleno = { color: string; colorOscuro: string };

const FILA_SUPERIOR: Relleno[][] = [
  [{ color: "#b7472a", colorOscuro: "#5e2314" }],
  [{ color: "#3d5a45", colorOscuro: "#1f3025" }, { color: "#6b5637", colorOscuro: "#332a1a" }],
  [{ color: "#7a6a8f", colorOscuro: "#3a3247" }],
  [{ color: "#4a5f6e", colorOscuro: "#22303a" }, { color: "#9c7b3f", colorOscuro: "#4a3a1c" }],
];

const FILA_INFERIOR: Relleno[][] = [
  [
    { color: "#8a2d1f", colorOscuro: "#421310" },
    { color: "#2d3a2f", colorOscuro: "#141c17" },
    { color: "#7a5a2f", colorOscuro: "#3a2b17" },
  ],
  [
    { color: "#5a2d4a", colorOscuro: "#2a1622" },
    { color: "#22242a", colorOscuro: "#0d0e10" },
  ],
  [
    { color: "#3f5a6b", colorOscuro: "#1c2830" },
    { color: "#8a6a3a", colorOscuro: "#3f321c" },
    { color: "#4a3a5a", colorOscuro: "#221a2a" },
  ],
  [
    { color: "#6b3f3f", colorOscuro: "#301c1c" },
    { color: "#3a5a3f", colorOscuro: "#1a2a1c" },
  ],
];

function offsetsPara(cantidad: number): number[] {
  if (cantidad <= 1) return [0];
  if (cantidad === 2) return [-0.13, 0.13];
  return [-0.21, 0, 0.21];
}

type Fase = "inactivo" | "volando" | "brazo_bajando" | "reproduciendo";

export default function MuebleGroup3D() {
  const [viniloActivo, setViniloActivo] = useState<ViniloData | null>(null);
  const [origenVuelo, setOrigenVuelo] = useState<[number, number, number]>([0, 0, 0]);
  const [fase, setFase] = useState<Fase>("inactivo");
  const faseRef = useRef<Fase>("inactivo");
  const { preload, playNeedleDrop, playTrack, stopAll } = useAudioPlayer();

  const setFaseSeguro = (f: Fase) => {
    faseRef.current = f;
    setFase(f);
  };

  const seleccionarVinilo = useCallback(
    (v: ViniloData, origen: [number, number, number]) => {
      if (v.id === viniloActivo?.id) return;
      preload(v);
      if (faseRef.current !== "inactivo") {
        stopAll(0.25);
      }
      setOrigenVuelo(origen);
      setViniloActivo(v);
      setFaseSeguro("volando");
    },
    [preload, stopAll, viniloActivo]
  );

  const detener = useCallback(() => {
    stopAll(0.4);
    setFaseSeguro("inactivo");
    setViniloActivo(null);
  }, [stopAll]);

  const handleLlegada = useCallback(() => {
    if (faseRef.current === "volando") {
      setFaseSeguro("brazo_bajando");
    }
  }, []);

  const handleTocarDisco = useCallback(() => {
    if (!viniloActivo) return;
    setFaseSeguro("reproduciendo");
    void playNeedleDrop();
    void playTrack(viniloActivo);
  }, [playNeedleDrop, playTrack, viniloActivo]);

  const brazoActivo = fase === "brazo_bajando" || fase === "reproduciendo";
  const girando = fase === "reproduciendo";

  return (
    <group>
      <ParedYEstante />
      <Alfombra />
      <LamparaPie />
      <Planta />
      <CredenzaBody />
      <SuperficieDecor />

      {FILA_SUPERIOR.map((rellenos, indice) => {
        const vinilo = vinilos[indice];
        const offsets = offsetsPara(rellenos.length + 1);
        const offsetVinilo = offsets[offsets.length - 1];

        return (
          <group key={`sup-${indice}`}>
            {rellenos.map((r, i) => (
              <FundaEstatica
                key={i}
                posicion={posicionFunda(indice, offsets[i], 0)}
                visible
                colorFunda={r.color}
                colorFundaOscuro={r.colorOscuro}
                inclinacionExtra={i % 2 === 0 ? -0.03 : 0.03}
              />
            ))}
            <FundaEstatica
              posicion={posicionFunda(indice, offsetVinilo, 0)}
              visible={viniloActivo?.id !== vinilo.id}
              vinilo={vinilo}
              onClick={() =>
                seleccionarVinilo(vinilo, posicionFunda(indice, offsetVinilo, 0))
              }
            />
          </group>
        );
      })}

      {FILA_INFERIOR.map((rellenos, indice) => {
        const offsets = offsetsPara(rellenos.length);
        return (
          <group key={`inf-${indice}`}>
            {rellenos.map((r, i) => (
              <FundaEstatica
                key={i}
                posicion={posicionFunda(indice, offsets[i], 1)}
                visible
                colorFunda={r.color}
                colorFundaOscuro={r.colorOscuro}
                inclinacionExtra={i % 2 === 0 ? 0.02 : -0.02}
              />
            ))}
          </group>
        );
      })}

      <TocadiscosGroup
        brazoActivo={brazoActivo}
        girando={girando}
        onTocarDisco={handleTocarDisco}
      />

      <ViniloActivo
        vinilo={viniloActivo}
        origen={origenVuelo}
        girando={girando}
        onLlegar={handleLlegada}
      />

      <FundaEnExhibicion vinilo={girando ? viniloActivo : null} />

      {viniloActivo && (
        <Html position={[-0.68, 0.98, 0.5]} center>
          <button
            type="button"
            onClick={detener}
            className="rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wide text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            style={{ pointerEvents: "auto" }}
          >
            Guardar disco
          </button>
        </Html>
      )}
    </group>
  );
}
