"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2, Copy, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShortenPage() {
  const t = useTranslations("Tools.shorten");
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/tools/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, slug: slug || undefined }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create short URL");
      }

      const data = await res.json();
      setShortUrl(`${window.location.origin}/s/${data.slug}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Link2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acortar URL</CardTitle>
            <CardDescription>Crea enlaces cortos y fáciles de compartir</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL Original</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://ejemplo.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug Personalizado (Opcional)</Label>
                <Input
                  id="slug"
                  type="text"
                  placeholder="mi-enlace"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  pattern="[a-z0-9-]+"
                />
                <p className="text-xs text-muted-foreground">
                  Solo letras minúsculas, números y guiones
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Acortar URL"
                )}
              </Button>
            </form>

            {shortUrl && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
                <p className="text-sm text-muted-foreground mb-2">Tu URL acortada:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-background rounded text-sm break-all">
                    {shortUrl}
                  </code>
                  <Button size="icon" variant="outline" onClick={handleCopy}>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">✨ Características</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Enlaces cortos personalizados</li>
            <li>• Estadísticas básicas de clics</li>
            <li>• Sin registros ni tarifas</li>
            <li>• Limite: 10 creaciones/hora por IP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

