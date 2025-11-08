import { BriefExpress } from "@/components/play/brief-express";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brief Express",
  description: "Calcula una estimación rápida para tu proyecto en menos de 2 minutos",
};

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bg to-bg-elev-2 py-12 sm:py-16">
      <div className="container px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-6">
              <span className="text-sm text-accent2">Brief Express</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-content">
              Calcula tu{" "}
              <span className="bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">
                estimación
              </span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
            Responde 5 preguntas y obtén una estimación orientativa en menos de 2 minutos
          </p>
        </div>

        <BriefExpress />
        </div>
      </div>
    </div>
  );
}




