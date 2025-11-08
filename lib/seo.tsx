export function LocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ArrobaPunto",
    description: "Agencia de diseño y desarrollo web premium",
    url: "https://arrobapunto.com",
    telephone: "+507-XXX-XXXX",
    email: "contacto@arrobapunto.com",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Panamá",
        addressCountry: "PA",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressCountry: "ES",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Lisboa",
        addressCountry: "PT",
      },
    ],
    areaServed: ["Panamá", "Madrid", "Lisboa"],
    priceRange: "$$",
  };
}

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArrobaPunto",
    url: "https://arrobapunto.com",
    logo: "https://arrobapunto.com/logo.png",
    description: "Agencia de diseño y desarrollo web premium",
    foundingDate: "2020",
    founders: [{ "@type": "Person", name: "Equipo ArrobaPunto" }],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contacto@arrobapunto.com",
    },
    sameAs: [
      "https://twitter.com/arrobapunto",
      "https://linkedin.com/company/arrobapunto",
    ],
  };
}







