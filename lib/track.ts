// Analytics event tracking

export function trackEvent(eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, props);
  }

  // Log to data/events.log (append)
  try {
    const logEntry = {
      event: eventName,
      props,
      timestamp: new Date().toISOString(),
    };
    
    // In production, send to API to append to events.log
    if (process.env.NODE_ENV === "production") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry),
      }).catch(console.error);
    }
  } catch {
    // Silent fail
  }
}

// Pre-defined event helpers
export const track = {
  briefDownload: () => trackEvent("brief-download"),
  imageCompress: () => trackEvent("image-compress"),
  urlShorten: () => trackEvent("url-shorten"),
  ctaContact: () => trackEvent("cta-contact"),
  playBrief: () => trackEvent("play-brief"),
};







