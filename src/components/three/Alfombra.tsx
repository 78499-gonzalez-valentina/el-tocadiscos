"use client";

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Alfombra() {
  const textura = useTexture("/images/textura-alfombra.jpg");

  useMemo(() => {
    /* eslint-disable react-hooks/immutability -- mutación estándar de r3f/drei para configurar la textura */
    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.repeat.set(2.2, 1.5);
    textura.colorSpace = THREE.SRGBColorSpace;
    textura.needsUpdate = true;
    /* eslint-enable react-hooks/immutability */
  }, [textura]);

  return (
    <mesh position={[0.1, 0.001, 1.35]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[2.6, 1.7]} />
      <meshStandardMaterial map={textura} color="#8a7256" roughness={1} metalness={0} />
    </mesh>
  );
}
