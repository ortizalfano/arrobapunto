"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageFile {
  file: File;
  preview: string;
  compressed?: Blob;
  compressionRatio?: number;
}

export function ImageProcessor() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("webp");
  const [quality, setQuality] = useState(80);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 10).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const processImages = async () => {
    setIsProcessing(true);
    try {
      const processed = await Promise.all(
        images.map(async (image) => {
          // Client-side processing with Canvas API
          return await compressImage(image.file, outputFormat, quality / 100);
        })
      );

      setImages((prev) =>
        prev.map((img, idx) => ({
          ...img,
          compressed: processed[idx].blob,
          compressionRatio: processed[idx].ratio,
        }))
      );
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Error processing images. Try uploading smaller files.");
    } finally {
      setIsProcessing(false);
    }
  };

  const compressImage = async (
    file: File,
    format: string,
    quality: number
  ): Promise<{ blob: Blob; ratio: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to compress image"));
                return;
              }
              const originalSize = file.size;
              const compressedSize = blob.size;
              const ratio = ((originalSize - compressedSize) / originalSize) * 100;
              resolve({ blob, ratio });
            },
            `image/${format}`,
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const downloadImage = (index: number) => {
    const image = images[index];
    if (!image.compressed) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(image.compressed);
    link.download = `${image.file.name.split(".")[0]}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center transition-colors hover:border-primary/50",
            "border-muted-foreground/25"
          )}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">
              Click to select images or drag & drop
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Max 25MB per file, up to 10 images
            </p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <>
          <div className="flex gap-4 items-center flex-wrap">
            <Button onClick={processImages} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Optimizar Imágenes"
              )}
            </Button>

            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as any)}
              className="px-3 py-2 border rounded-md"
              disabled={isProcessing}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>

            <div className="flex items-center gap-2">
              <label className="text-sm">Calidad:</label>
              <input
                type="range"
                min="50"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm w-12">{quality}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-square bg-muted">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm truncate">{image.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(image.file.size / 1024)} KB
                  </p>
                  {image.compressed && (
                    <>
                      <p className="text-xs font-semibold text-primary">
                        Reducción: {image.compressionRatio?.toFixed(1)}%
                      </p>
                      <Button size="sm" className="w-full" onClick={() => downloadImage(index)}>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

