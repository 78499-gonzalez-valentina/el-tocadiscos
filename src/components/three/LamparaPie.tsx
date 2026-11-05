"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { CREDENZA_ANCHO } from "@/lib/layout3d";

const X = -CREDENZA_ANCHO / 2 - 0.55;
const Z = 0.35;
const ALTO_PANTALLA = 1.35;
const ALTO_PUNTITO = 0.75;

type Tonalidad = {
  id: string;
  nombre: string;
  luz: string;
  emisivo: string;
  muestra: string;
};

const TONALIDADES: Tonalidad[] = [
  { id: "vela", nombre: "Vela", luz: "#ff8a3d", emisivo: "#ffb066", muestra: "#ff8a3d" },
  { id: "ambar", nombre: "Ámbar", luz: "#ff9f4a", emisivo: "#ffc27a", muestra: "#ff9f4a" },
  { id: "dorado", nombre: "Dorado", luz: "#ffb35c", emisivo: "#ffd28a", muestra: "#ffb35c" },
  { id: "atardecer", nombre: "Atardecer", luz: "#ff7a52", emisivo: "#ff9d70", muestra: "#ff7a52" },
  { id: "rosado", nombre: "Rosado", luz: "#e8748f", emisivo: "#f5a0b5", muestra: "#e8748f" },
];

export default function LamparaPie() {
  const [tonalidad, setTonalidad] = useState<Tonalidad>(TONALIDADES[0]);
  const [panelAbierto, setPanelAbierto] = useState(false);

  return (
    <group position={[X, 0, Z]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.02, 24]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.5} metalness={0.4} />
      </mesh>

      <mesh position={[0, ALTO_PANTALLA / 2, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.014, ALTO_PANTALLA, 10]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
      </mesh>

      <mesh position={[0, ALTO_PANTALLA + 0.19, 0]} castShadow>
        <sphereGeometry args={[0.19, 28, 20]} />
        <meshStandardMaterial
          color="#f3e6c4"
          roughness={0.75}
          metalness={0}
          emissive={tonalidad.emisivo}
          emissiveIntensity={0.6}
          transparent
          opacity={0.92}
        />
      </mesh>

      <pointLight
        position={[0, ALTO_PANTALLA + 0.19, 0]}
        intensity={2.6}
        distance={4.2}
        decay={2}
        color={tonalidad.luz}
        castShadow
      />

      <mesh
        position={[0.04, ALTO_PUNTITO, 0.02]}
        onClick={(e) => {
          e.stopPropagation();
          setPanelAbierto((v) => !v);
        }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color={tonalidad.muestra}
          emissive={tonalidad.muestra}
          emissiveIntensity={1.1}
        />
      </mesh>

      {panelAbierto && (
        <Html position={[0.04, ALTO_PUNTITO + 0.06, 0.02]} center>
          <div
            className="flex flex-col gap-1.5 rounded-lg bg-black/70 p-2 backdrop-blur-sm"
            style={{ pointerEvents: "auto" }}
          >
            <span className="px-1 text-[9px] uppercase tracking-wide text-white/60">
              Tonalidad
            </span>
            <div className="flex gap-1.5">
              {TONALIDADES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  title={t.nombre}
                  onClick={() => {
                    setTonalidad(t);
                    setPanelAbierto(false);
                  }}
                  className="h-6 w-6 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    background: t.muestra,
                    borderColor: t.id === tonalidad.id ? "#ffffff" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
