import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@hookform/resolvers", "zod"],
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  // Optimizar bundle splitting
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            framerMotion: {
              name: "framer-motion",
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            reactVendor: {
              name: "react-vendor",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 15,
              reuseExistingChunk: true,
            },
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Optimización de producción
      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.sideEffects = false;
      }
    }
    return config;
  },
};

export default withNextIntl(nextConfig);












