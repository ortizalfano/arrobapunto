import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Copy, Check } from "lucide-react";

interface ShortLinkEntry {
  id: string;
  targetUrl: string;
  slug: string;
  expiresAt: string | null;
  createdAt: string;
  clicks: number;
  description?: string;
}

const STORAGE_KEY = "ap_tools_url_shortcuts";

interface UrlShortenerModalProps {
  open: boolean;
  onClose: () => void;
}

export function UrlShortenerModal({ open, onClose }: UrlShortenerModalProps) {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const [targetUrl, setTargetUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [entries, setEntries] = useState<ShortLinkEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useMemo(
    () => ({
      title: isEnglish ? "URL Shortener" : "Acortador de URLs",
      description: isEnglish
        ? "Create branded short links and keep lightweight tracking without leaving the page."
        : "Crea enlaces cortos personalizados y haz seguimiento básico sin salir de la página.",
      form: {
        originalLabel: isEnglish ? "Original URL *" : "URL original *",
        originalPlaceholder: isEnglish ? "https://your-site.com/post" : "https://tu-sitio.com/post",
        slugLabel: isEnglish ? "Custom slug" : "Slug personalizado",
        slugPlaceholder: isEnglish ? "e.g. launch-2025" : "ej: lanzamiento-2025",
        slugHintPrefix: isEnglish ? "Suggested slug:" : "Slug sugerido:",
        expiresLabel: isEnglish ? "Expires on" : "Expira el",
        expiresHint: isEnglish
          ? "Optional. The link will be automatically marked as expired."
          : "Opcional. El enlace se marcará como expirado automáticamente.",
        shortLabel: isEnglish ? "Generated short URL" : "URL corta generada",
        descriptionLabel: isEnglish ? "Internal description" : "Descripción interna",
        descriptionPlaceholder: isEnglish ? "Black Friday 2025 campaign" : "Campaña Black Friday 2025",
        submit: isEnglish ? "Create short link" : "Crear enlace corto",
        saving: isEnglish ? "Saving..." : "Guardando...",
      },
      list: {
        title: isEnglish ? "Your links" : "Tus enlaces",
        empty: isEnglish
          ? "You haven't created any short links yet. Use the form to create your first one."
          : "Aún no has creado enlaces cortos. Crea el primero usando el formulario.",
        created: isEnglish ? "Created:" : "Creado:",
        clicks: isEnglish ? "Clicks:" : "Clicks:",
        increment: "+1",
        expires: isEnglish ? "Expires:" : "Expira:",
        expired: isEnglish ? "(expired)" : "(expirado)",
      },
      buttons: {
        copy: isEnglish ? "Copy" : "Copiar",
        copied: isEnglish ? "Copied" : "Copiado",
      },
      errors: {
        invalidUrl: isEnglish
          ? "Enter a valid URL (http:// or https://)."
          : "Introduce una URL válida (http:// o https://)",
        invalidSlug: isEnglish
          ? "Slug can only contain letters, numbers, dashes and underscores."
          : "El slug solo puede contener letras, números, guiones y guiones bajos",
        copy: isEnglish
          ? "Unable to copy the link. Try manually."
          : "No se pudo copiar el enlace. Intenta manualmente.",
      },
    }),
    [isEnglish]
  );

  const dateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(isEnglish ? "en-US" : "es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [isEnglish]
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(isEnglish ? "en-US" : "es-ES", {
        dateStyle: "medium",
      }),
    [isEnglish]
  );

  useEffect(() => {
    if (open) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setEntries(parsed);
          }
        } catch (err) {
          console.error("Error parsing stored short links", err);
        }
      }
    }
  }, [open]);

  const persistEntries = useCallback((nextEntries: ShortLinkEntry[]) => {
    setEntries(nextEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
  }, []);

  const validateUrl = useCallback((value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, []);

  const isSlugValid = useMemo(() => /^[a-zA-Z0-9-_]+$/.test(slug), [slug]);

  const generatedSlug = useMemo(() => {
    if (slug.trim()) return slug.trim();
    return Math.random().toString(36).slice(2, 8);
  }, [slug]);

  const shortLinkBase = "https://arrobapunto.com";
  const shortLinkUrl = `${shortLinkBase}/link/${generatedSlug}`;

  const handleSave = useCallback(() => {
    if (!validateUrl(targetUrl)) {
      setError(copy.errors.invalidUrl);
      return;
    }
    if (slug.trim() && !isSlugValid) {
      setError(copy.errors.invalidSlug);
      return;
    }

    setIsSaving(true);
    setError(null);

    const newEntry: ShortLinkEntry = {
      id: crypto.randomUUID(),
      targetUrl: targetUrl.trim(),
      slug: generatedSlug,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      clicks: 0,
      description: description.trim() || undefined,
    };

    persistEntries([newEntry, ...entries.filter((entry) => entry.slug !== generatedSlug)]);

    setTargetUrl("");
    setSlug("");
    setExpiresAt("");
    setDescription("");
    setIsSaving(false);
  }, [
    copy.errors.invalidSlug,
    copy.errors.invalidUrl,
    description,
    entries,
    expiresAt,
    generatedSlug,
    isSlugValid,
    persistEntries,
    slug,
    targetUrl,
    validateUrl,
  ]);

  const handleDelete = useCallback(
    (entryId: string) => {
      persistEntries(entries.filter((entry) => entry.id !== entryId));
    },
    [entries, persistEntries]
  );

  const handleCopy = useCallback(
    (entry: ShortLinkEntry) => {
      navigator.clipboard
        .writeText(`${shortLinkBase}/link/${entry.slug}`)
        .then(() => {
          setCopiedId(entry.id);
          setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(() => {
          setError(copy.errors.copy);
        });
    },
    [copy.errors.copy, shortLinkBase]
  );

  const isExpired = useCallback((entry: ShortLinkEntry) => {
    if (!entry.expiresAt) return false;
    return new Date(entry.expiresAt).getTime() < Date.now();
  }, []);

  const handleIncrement = useCallback(
    (entryId: string) => {
      persistEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, clicks: entry.clicks + 1 } : entry
        )
      );
    },
    [entries, persistEntries]
  );

  useEffect(() => {
    if (!open) {
      setTargetUrl("");
      setSlug("");
      setExpiresAt("");
      setDescription("");
      setIsSaving(false);
      setError(null);
      setCopiedId(null);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D1217] shadow-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-aurora-edge" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-2xl font-semibold text-white">{copy.title}</h2>
            <p className="text-sm text-white/60">{copy.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 py-5 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetUrl" className="text-white/80">
                  {copy.form.originalLabel}
                </Label>
                <Input
                  id="targetUrl"
                  placeholder={copy.form.originalPlaceholder}
                  value={targetUrl}
                  onChange={(event) => setTargetUrl(event.target.value)}
                  className="mt-2 bg-[#0a0f13] border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div>
                <Label htmlFor="slug" className="text-white/80">
                  {copy.form.slugLabel}
                </Label>
                <Input
                  id="slug"
                  placeholder={copy.form.slugPlaceholder}
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="mt-2 bg-[#0a0f13] border-white/10 text-white placeholder:text-white/30"
                />
                <p className="mt-1 text-xs text-white/50">
                  {copy.form.slugHintPrefix}{" "}
                  <span className="font-semibold text-white/70">{generatedSlug}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiresAt" className="text-white/80">
                    {copy.form.expiresLabel}
                  </Label>
                  <Input
                    type="date"
                    id="expiresAt"
                    value={expiresAt}
                    onChange={(event) => setExpiresAt(event.target.value)}
                    className="mt-2 bg-[#0a0f13] border-white/10 text-white"
                  />
                  <p className="mt-1 text-xs text-white/40">{copy.form.expiresHint}</p>
                </div>
                <div>
                  <Label className="text-white/80">{copy.form.shortLabel}</Label>
                  <p className="mt-2 rounded-lg border border-white/10 bg-[#0a0f13] px-3 py-3 text-sm text-white/70">
                    {shortLinkUrl}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white/80">
                  {copy.form.descriptionLabel}
                </Label>
                <Textarea
                  id="description"
                  placeholder={copy.form.descriptionPlaceholder}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-2 bg-[#0a0f13] border-white/10 text-white placeholder:text-white/30"
                  rows={3}
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? copy.form.saving : copy.form.submit}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {copy.list.title}
              </h3>
              <div className="space-y-3">
                {entries.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/15 bg-[#0a0f13] p-6 text-center text-sm text-white/50">
                    {copy.list.empty}
                  </div>
                )}

                {entries.map((entry) => {
                  const expired = isExpired(entry);
                  const createdLabel = dateTimeFormatter.format(new Date(entry.createdAt));
                  const expiresLabel = entry.expiresAt
                    ? dateFormatter.format(new Date(entry.expiresAt))
                    : null;

                  return (
                    <div key={entry.id} className="rounded-xl border border-white/10 bg-[#111820] p-4 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {shortLinkBase}/link/<span className="text-accent2">{entry.slug}</span>
                          </p>
                          <p className="text-xs text-white/50 truncate">{entry.targetUrl}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => handleCopy(entry)}
                            aria-label={copiedId === entry.id ? copy.buttons.copied : copy.buttons.copy}
                            title={copiedId === entry.id ? copy.buttons.copied : copy.buttons.copy}
                          >
                            {copiedId === entry.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/50 hover:text-red-400"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {entry.description && <p className="text-xs text-white/60">{entry.description}</p>}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                        <span>
                          {copy.list.created} {createdLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          {copy.list.clicks}
                          <button
                            type="button"
                            onClick={() => handleIncrement(entry.id)}
                            className="rounded bg-white/10 px-2 py-0.5 text-white hover:bg-white/20"
                          >
                            {copy.list.increment}
                          </button>
                          <span className="font-semibold text-white">{entry.clicks}</span>
                        </span>
                        {expiresLabel && (
                          <span className={expired ? "text-red-400" : "text-white/60"}>
                            {copy.list.expires} {expiresLabel} {expired && copy.list.expired}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

