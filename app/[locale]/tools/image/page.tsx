"use client";

import { useTranslations } from "next-intl";
import { ImageProcessor } from "@/components/tools/image-processor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export default function ImageToolsPage() {
  const t = useTranslations("Tools.image");

  return (
    <div className="container px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compresor y Convertidor de Imágenes</CardTitle>
            <CardDescription>
              Optimiza tus imágenes JPG, PNG o WEBP sin perder calidad. Procesa hasta 10 imágenes
              simultáneamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageProcessor />
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">⚡ Beneficios</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Reduce el tamaño de archivos hasta un 80%</li>
            <li>• Mantiene la calidad visual</li>
            <li>• Convierte entre formatos sin aplicaciones externas</li>
            <li>• Privacidad: tus imágenes se procesan localmente (browser) o de forma efímera</li>
          </ul>
        </div>
      </div>
    </div>
  );
}







