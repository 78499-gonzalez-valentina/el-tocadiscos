export const CREDENZA_ANCHO = 3.4;
export const CREDENZA_ALTO = 0.85;
export const CREDENZA_PROFUNDIDAD = 0.55;
export const ESPESOR_TAPA = 0.05;
export const TOP_Y = CREDENZA_ALTO + ESPESOR_TAPA;

export const CASILLERO_GAP = 0.035;
export const CASILLERO_MARGEN_Y = 0.04;
export const CASILLERO_ANCHO = (CREDENZA_ANCHO - CASILLERO_GAP * 5) / 4;
export const CASILLERO_FILAS = 2;
export const DIVISOR_MEDIO_ALTO = 0.03;
export const CASILLERO_ALTO_FILA =
  (CREDENZA_ALTO - CASILLERO_MARGEN_Y * 2 - DIVISOR_MEDIO_ALTO) / CASILLERO_FILAS;

export function centroXCasillero(indice: number): number {
  return (
    -CREDENZA_ANCHO / 2 +
    CASILLERO_GAP +
    CASILLERO_ANCHO / 2 +
    indice * (CASILLERO_ANCHO + CASILLERO_GAP)
  );
}

/** y de la base (piso) del casillero para una fila (0 = superior, 1 = inferior) */
export function baseYCasillero(fila: number): number {
  const desdeAbajo = CASILLERO_FILAS - 1 - fila;
  return (
    CASILLERO_MARGEN_Y + desdeAbajo * (CASILLERO_ALTO_FILA + DIVISOR_MEDIO_ALTO)
  );
}

export const FUNDA_LADO = 0.29;
export const FUNDA_INCLINACION = -0.16;
export const FUNDA_Z = CREDENZA_PROFUNDIDAD / 2 - FUNDA_LADO * 0.42;

export function posicionFunda(
  indiceCasillero: number,
  offsetX: number,
  fila = 0
): [number, number, number] {
  return [
    centroXCasillero(indiceCasillero) + offsetX,
    baseYCasillero(fila) + 0.005,
    FUNDA_Z,
  ];
}

export const TOCADISCOS_X = -0.68;
export const TOCADISCOS_Z = -0.02;
export const TOCADISCOS_CUERPO_ALTO = 0.06;
export const TOCADISCOS_CUERPO_ANCHO = 0.82;
export const TOCADISCOS_CUERPO_PROFUNDIDAD = 0.58;
export const PLATO_RADIO = 0.225;
export const PLATO_ALTO = 0.012;
export const DISCO_ALTO = 0.005;

export const TOCADISCOS_CUERPO_Y = TOP_Y + TOCADISCOS_CUERPO_ALTO / 2;
export const PLATO_Y = TOP_Y + TOCADISCOS_CUERPO_ALTO + PLATO_ALTO / 2;
export const DISCO_Y = TOP_Y + TOCADISCOS_CUERPO_ALTO + PLATO_ALTO + DISCO_ALTO / 2;

export const PLATO_CENTRO: [number, number, number] = [
  TOCADISCOS_X,
  DISCO_Y,
  TOCADISCOS_Z,
];

export const BRAZO_PIVOTE: [number, number, number] = [
  TOCADISCOS_X + TOCADISCOS_CUERPO_ANCHO / 2 - 0.1,
  TOP_Y + TOCADISCOS_CUERPO_ALTO + 0.02,
  TOCADISCOS_Z - TOCADISCOS_CUERPO_PROFUNDIDAD / 2 + 0.12,
];
