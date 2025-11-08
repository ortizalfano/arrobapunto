import { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arrobapunto.com";

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/plugins",
    "/studio",
    "/blog",
    "/play",
    "/tools/image",
    "/tools/shorten",
  ];

  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return routes;
}




