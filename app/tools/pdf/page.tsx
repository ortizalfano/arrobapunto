"use client";

import { PdfCompressor } from "@/components/tools/pdf-compressor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function PdfToolsPage() {
  return (
    <div className="container px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Compresor de PDFs</h1>
          <p className="text-muted-foreground text-lg">
            Optimiza y reduce el tamaño de tus PDFs sin perder calidad. Procesado 100% en tu
            navegador.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compresor de PDFs</CardTitle>
            <CardDescription>
              Reduce el tamaño de tus archivos PDF optimizando metadatos y estructura. Todo se
              procesa en tu navegador para garantizar tu privacidad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PdfCompressor />
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">⚡ Beneficios</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Reduce el tamaño de archivos PDF (hasta 30-50% según el contenido)</li>
            <li>• Remueve metadatos innecesarios</li>
            <li>• Optimiza la estructura interna del documento</li>
            <li>• Privacidad: tus PDFs se procesan localmente en tu navegador</li>
            <li>• Sin límites de uso ni costos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

