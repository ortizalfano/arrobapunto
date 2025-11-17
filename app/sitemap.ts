import { MetadataRoute } from "next";

const baseUrl = "https://arrobapunto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/services",
    "/plugins",
    "/studio",
    "/blog",
    "/play",
    "/tools",
    "/tools/image",
    "/tools/gradients",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}




