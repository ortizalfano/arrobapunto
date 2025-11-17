import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/seo";

type PageParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog",
    } satisfies Metadata;
  }

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title: post.title.es,
    description: post.excerpt.es,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title.es,
      description: post.excerpt.es,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt.es,
        },
      ],
    },
  } satisfies Metadata;
}

export default async function BlogArticlePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const title = post.title.es;
  const excerpt = post.excerpt.es;
  const category = post.category.es;
  const readTime = post.readTime.es;
  const imageAlt = post.imageAlt.es;
  const conclusion = post.conclusion.es;
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
    inLanguage: "es",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
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
            const heading = section.heading.es;
            const paragraphs = section.paragraphs.map((paragraph) => paragraph.es);
            const bullets = section.bullets ? section.bullets.es : undefined;

            return (
              <section key={heading}>
                <h2 className="font-display text-2xl font-semibold text-white mb-4">{heading}</h2>
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {bullets && (
                  <ul className="mt-4 space-y-2 text-white/75">
                    {bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}

          <section>
            <h2 className="font-display text-2xl font-semibold text-white mb-4">En resumen</h2>
            <p className="text-white/80 leading-relaxed">{conclusion}</p>
          </section>
        </div>
      </article>
    </div>
  );
}

