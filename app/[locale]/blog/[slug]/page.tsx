import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";

type PageParams = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const locales = ["es", "en"];
  return blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog",
    } satisfies Metadata;
  }

  const isEnglish = locale === "en";
  const canonicalUrl = createCanonical(locale, `/blog/${slug}`);

  return {
    title: isEnglish ? post.title.en : post.title.es,
    description: isEnglish ? post.excerpt.en : post.excerpt.es,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title: isEnglish ? post.title.en : post.title.es,
      description: isEnglish ? post.excerpt.en : post.excerpt.es,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: isEnglish ? post.imageAlt.en : post.imageAlt.es,
        },
      ],
    },
  } satisfies Metadata;
}

export default async function BlogArticlePage({ params }: { params: PageParams }) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const isEnglish = locale === "en";
  const formatter = new Intl.DateTimeFormat(isEnglish ? "en-US" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const canonicalUrl = createCanonical(locale, `/blog/${slug}`);

  const title = isEnglish ? post.title.en : post.title.es;
  const excerpt = isEnglish ? post.excerpt.en : post.excerpt.es;
  const category = isEnglish ? post.category.en : post.category.es;
  const readTime = isEnglish ? post.readTime.en : post.readTime.es;
  const imageAlt = isEnglish ? post.imageAlt.en : post.imageAlt.es;
  const conclusion = isEnglish ? post.conclusion.en : post.conclusion.es;
  const publishedDate = formatter.format(new Date(post.publishedAt));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "ArrobaPunto.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ArrobaPunto.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/logo1.png`,
      },
    },
    url: canonicalUrl,
    inLanguage: isEnglish ? "en" : "es",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Home" : "Inicio",
        item: createCanonical(locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: createCanonical(locale, "/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="container px-4 py-12">
      <article className="max-w-3xl mx-auto text-white space-y-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
        />
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent2">
            {category} • {publishedDate} • {readTime}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">{title}</h1>
          <p className="text-lg text-white/70">{excerpt}</p>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={post.image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          {post.sections.map((section) => {
            const heading = isEnglish ? section.heading.en : section.heading.es;
            const paragraphs = section.paragraphs.map((paragraph) =>
              isEnglish ? paragraph.en : paragraph.es
            );
            const bullets = section.bullets
              ? isEnglish
                ? section.bullets.en
                : section.bullets.es
              : undefined;

            return (
              <section key={heading}>
                <h2 className="font-display text-2xl font-semibold text-white mb-4">
                  {heading}
                </h2>
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {bullets && (
                  <ul className="mt-4 space-y-2 text-white/75">
                    {bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-1 inline-block h-2 w-2 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          <section>
            <h2 className="font-display text-2xl font-semibold text-white mb-4">
              {isEnglish ? "In summary" : "En resumen"}
            </h2>
            <p className="text-white/80 leading-relaxed">{conclusion}</p>
          </section>
        </div>
      </article>
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

