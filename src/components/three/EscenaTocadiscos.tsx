"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import MuebleGroup3D from "./MuebleGroup3D";
import { CREDENZA_ALTO } from "@/lib/layout3d";

function ParallaxCamara() {
  const { camera, pointer } = useThree();
  const base = useRef(camera.position.clone());

  // La cámara de three.js se actualiza mutándola cuadro a cuadro dentro de
  // useFrame; no es estado de React, es el modelo imperativo estándar de r3f.
  /* eslint-disable react-hooks/immutability -- three.js Camera se muta a propósito en cada frame */
  useFrame(() => {
    const objetivoX = base.current.x + pointer.x * 0.18;
    const objetivoY = base.current.y + pointer.y * 0.1;
    camera.position.x += (objetivoX - camera.position.x) * 0.04;
    camera.position.y += (objetivoY - camera.position.y) * 0.04;
    camera.lookAt(0, CREDENZA_ALTO * 0.95, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

export default function EscenaTocadiscos() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [1.15, 1.72, 4.6], fov: 36 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={["#171512"]} />
      <fog attach="fog" args={["#171512", 4, 9]} />

      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#7c8a9a", "#20180f", 0.45]} />

      <directionalLight
        position={[1.6, 3.4, 1.8]}
        intensity={1.5}
        color="#ffe6bd"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-2.2, 1.6, -1.2]} intensity={0.35} color="#8fb0c9" />
      <pointLight position={[0.4, 1.4, 1.6]} intensity={0.4} color="#ffd8a0" distance={5} />

      <Suspense fallback={null}>
        <MuebleGroup3D />
      </Suspense>

      <ParallaxCamara />
    </Canvas>
  );
}
