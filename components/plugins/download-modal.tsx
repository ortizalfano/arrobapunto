"use client";

import { createContext, useCallback, useContext, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Linkedin, Twitter, Facebook, Heart } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

type DownloadModalContextValue = {
  open: (pluginName: string, downloadUrl: string) => void;
  close: () => void;
};

const DownloadModalContext = createContext<DownloadModalContextValue | undefined>(undefined);

type DownloadModalProviderProps = {
  children: React.ReactNode;
};

const STRIPE_LINKS = {
  5: "https://donate.stripe.com/14AaEXcmk3k63Xw1Bsa7C04",
  10: "https://donate.stripe.com/fZu6oHaec07Ucu26VMa7C05",
  20: "https://donate.stripe.com/28E4gz5XW07U65Ecg6a7C06",
};

export function DownloadModalProvider({ children }: DownloadModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pluginName, setPluginName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [sharedPlatforms, setSharedPlatforms] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);

  const open = useCallback((name: string, url: string) => {
    setPluginName(name);
    setDownloadUrl(url);
    setSharedPlatforms(new Set());
    setShowToast(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSharedPlatforms(new Set());
    setShowToast(false);
  }, []);

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  const handleShare = useCallback((platform: string, shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
    
    // Marcar como compartido
    setSharedPlatforms((prev) => new Set(prev).add(platform));
    
    // Mostrar toast de agradecimiento
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const getShareUrl = (platform: string) => {
    const url = `${SITE_URL}/plugins`;
    const shareText = `Acabo de descargar ${pluginName} de ArrobaPunto.com 🚀\n\n¡Un plugin gratuito increíble para WordPress! Descárgalo gratis en: ${url}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case "linkedin":
        // LinkedIn: Pre-rellena el texto pero el usuario puede editarlo antes de publicar
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`;
      case "twitter":
        // Twitter/X: Pre-rellena el mensaje completo, usuario puede editarlo antes de twittear
        return `https://twitter.com/intent/tweet?text=${encodedText}`;
      case "facebook":
        // Facebook: Pre-rellena la URL, el usuario puede agregar su mensaje personal
        // El quote puede no funcionar en todos los casos, pero intentamos
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
      default:
        return "";
    }
  };

  const handleDonate = useCallback((amount: 5 | 10 | 20) => {
    const stripeUrl = STRIPE_LINKS[amount];
    if (stripeUrl) {
      window.open(stripeUrl, "_blank");
    }
  }, []);

  const handleDownload = useCallback(() => {
    // Crear link temporal y descargar
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadUrl.split("/").pop() || "plugin.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cerrar modal después de un momento
    setTimeout(() => {
      close();
    }, 500);
  }, [downloadUrl, close]);

  return (
    <DownloadModalContext.Provider value={contextValue}>
      {children}
      <DownloadModal
        isOpen={isOpen}
        onClose={close}
        pluginName={pluginName}
        downloadUrl={downloadUrl}
        sharedPlatforms={sharedPlatforms}
        showToast={showToast}
        onShare={handleShare}
        onDonate={handleDonate}
        onDownload={handleDownload}
        getShareUrl={getShareUrl}
      />
    </DownloadModalContext.Provider>
  );
}

export function useDownloadModal() {
  const context = useContext(DownloadModalContext);
  if (!context) {
    throw new Error("useDownloadModal must be used within a DownloadModalProvider");
  }
  return context;
}

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pluginName: string;
  downloadUrl: string;
  sharedPlatforms: Set<string>;
  showToast: boolean;
  onShare: (platform: string, url: string) => void;
  onDonate: (amount: 5 | 10 | 20) => void;
  onDownload: () => void;
  getShareUrl: (platform: string) => string;
};

function DownloadModal({
  isOpen,
  onClose,
  pluginName,
  downloadUrl: _downloadUrl,
  sharedPlatforms,
  showToast,
  onShare,
  onDonate,
  onDownload,
  getShareUrl,
}: DownloadModalProps) {
  const shareButtons = [
    { platform: "linkedin", label: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-600" },
    { platform: "twitter", label: "X (Twitter)", icon: Twitter, color: "hover:bg-black" },
    { platform: "facebook", label: "Facebook", icon: Facebook, color: "hover:bg-blue-500" },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl bg-[#0D1217] border border-accent2/20 shadow-2xl overflow-hidden mx-4"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Descarga de plugin"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent2/5 via-transparent to-accent/5" />
              
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative p-8 space-y-6">
                <header className="text-center space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold">
                    <span className="bg-gradient-to-r from-white via-accent2 to-white bg-clip-text text-transparent">
                      Descarga Gratis
                    </span>
                  </h2>
                  <p className="text-base text-white/80 max-w-lg mx-auto leading-relaxed">
                    Puedes descargar <strong className="text-accent2">{pluginName}</strong> gratis. 
                    ¿Nos ayudarías compartiéndolo en tus redes sociales?
                  </p>
                </header>

                {/* Botones de compartir */}
                <div className="space-y-3">
                  <p className="text-sm text-white/60 text-center">Compartir en:</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {shareButtons.map(({ platform, label, icon: Icon, color }) => {
                      const isShared = sharedPlatforms.has(platform);
                      return (
                        <Button
                          key={platform}
                          type="button"
                          variant="outline"
                          onClick={() => onShare(platform, getShareUrl(platform))}
                          className={`${color} border-white/20 bg-white/5 text-white hover:bg-white/10 ${
                            isShared ? "border-accent2/50 bg-accent2/10" : ""
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {isShared ? "✓ Compartido" : label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Sección de donación */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 justify-center">
                    <Heart className="h-4 w-4 text-accent2" />
                    <p className="text-sm text-white/70">¿Quieres dejarnos una donación?</p>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onDonate(5)}
                      className="border-accent2/30 bg-accent2/5 text-white hover:bg-accent2/10 hover:border-accent2/50"
                    >
                      $5
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onDonate(10)}
                      className="border-accent2/30 bg-accent2/5 text-white hover:bg-accent2/10 hover:border-accent2/50"
                    >
                      $10
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onDonate(20)}
                      className="border-accent2/30 bg-accent2/5 text-white hover:bg-accent2/10 hover:border-accent2/50"
                    >
                      $20
                    </Button>
                  </div>
                </div>

                {/* Botón de descarga */}
                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={onDownload}
                    className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30 text-white font-semibold h-14 text-base"
                  >
                    Descargar ZIP
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast de agradecimiento */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 right-6 z-[130] bg-accent2/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg border border-accent2/30"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <p className="font-medium">¡Gracias por compartir! 💚</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

