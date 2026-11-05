export type Vinilo = {
  id: string;
  titulo: string;
  artista: string;
  colorFunda: string;
  colorFundaOscuro: string;
  colorVinilo: string;
  audioSrc: string;
};

export const vinilos: Vinilo[] = [
  {
    id: "nocturno",
    titulo: "Nocturno",
    artista: "Rio Sombra",
    colorFunda: "#e7d9c3",
    colorFundaOscuro: "#8a6f4e",
    colorVinilo: "#161616",
    audioSrc: "/audio/tracks/nocturno.wav",
  },
  {
    id: "funk-bajo",
    titulo: "Funk Bajo",
    artista: "Los Graves",
    colorFunda: "#d4552f",
    colorFundaOscuro: "#7a2a14",
    colorVinilo: "#1a1a1a",
    audioSrc: "/audio/tracks/funk-bajo.wav",
  },
  {
    id: "bossa-suave",
    titulo: "Bossa Suave",
    artista: "Marea Tibia",
    colorFunda: "#c9dcc8",
    colorFundaOscuro: "#4f6b4c",
    colorVinilo: "#171717",
    audioSrc: "/audio/tracks/bossa-suave.wav",
  },
  {
    id: "acido-groove",
    titulo: "Ácido Groove",
    artista: "Sintetico Club",
    colorFunda: "#d68fb0",
    colorFundaOscuro: "#7a3556",
    colorVinilo: "#181818",
    audioSrc: "/audio/tracks/acido-groove.wav",
  },
];
