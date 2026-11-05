import EscenaTocadiscos from "@/components/three/EscenaTocadiscos";

export default function Home() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#171512]">
      <EscenaTocadiscos />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
