import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const canonicalUrl = createCanonical(locale, "/blog");

  return {
    title: isEnglish ? "Blog & resources" : "Blog y recursos",
    description: isEnglish
      ? "Insights on design, development, performance and AI workflows from ArrobaPunto.com."
      : "Ideas sobre diseño, desarrollo, rendimiento e inteligencia artificial por ArrobaPunto.com.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("/blog"),
    },
    openGraph: {
      title: isEnglish ? "Blog & resources" : "Blog y recursos",
      description: isEnglish
        ? "Articles for product teams covering UX, engineering, SEO and automation."
        : "Artículos para equipos digitales sobre UX, ingeniería, SEO y automatización.",
      url: canonicalUrl,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const formatter = new Intl.DateTimeFormat(isEnglish ? "en-US" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const canonicalUrl = createCanonical(locale, "/blog");

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ArrobaPunto.com Blog",
    url: canonicalUrl,
    inLanguage: isEnglish ? "en" : "es",
    description: isEnglish
      ? "Insights on design, development, AI and digital strategy."
      : "Ideas sobre diseño, desarrollo, inteligencia artificial y estrategia digital.",
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: isEnglish ? post.title.en : post.title.es,
      datePublished: post.publishedAt,
      url: createCanonical(locale, `/blog/${post.slug}`),
      author: {
        "@type": "Organization",
        name: "ArrobaPunto.com",
      },
    })),
  };

  return (
    <div className="container px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
              {isEnglish ? "Blog" : "Blog"}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {isEnglish
              ? "Articles on design, development and digital marketing"
              : "Artículos sobre diseño, desarrollo y marketing digital"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => {
            const title = isEnglish ? post.title.en : post.title.es;
            const description = isEnglish ? post.excerpt.en : post.excerpt.es;
            const category = isEnglish ? post.category.en : post.category.es;
            const readTime = isEnglish ? post.readTime.en : post.readTime.es;
            const imageAlt = isEnglish ? post.imageAlt.en : post.imageAlt.es;
            const formattedDate = formatter.format(new Date(post.publishedAt));

            return (
              <Card
                key={post.slug}
                className="hover:shadow-xl transition-shadow bg-bg-elev-2 border border-white/10 overflow-hidden"
              >
                <Link href={`/${locale}/blog/${post.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <CardHeader className="flex-1 space-y-3">
                    <span className="text-xs uppercase tracking-wide text-accent2">
                      {category} • {formattedDate}
                    </span>
                    <CardTitle className="text-xl text-white">{title}</CardTitle>
                    <CardDescription className="text-white/70">
                      {description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/60">{readTime}</p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function createCanonical(locale: string, path: string) {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${SITE_URL}/${locale}${cleanPath}`;
}

function buildAlternates(path: string) {
  const alternateMap: Record<string, string> = {};
  locales.forEach((locale) => {
    alternateMap[locale] = createCanonical(locale, path);
  });
  return alternateMap;
}

