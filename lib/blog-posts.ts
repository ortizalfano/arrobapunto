export type LocalizedString = {
  es: string;
  en: string;
};

type Section = {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
  bullets?: {
    es: string[];
    en: string[];
  };
};

export type BlogPost = {
  slug: string;
  image: string;
  imageAlt: LocalizedString;
  category: LocalizedString;
  publishedAt: string;
  readTime: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  sections: Section[];
  conclusion: LocalizedString;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ia-para-desarrolladores",
    image: "/blog/ai-developer.svg",
    imageAlt: {
      es: "Ilustración de inteligencia artificial colaborando con un desarrollador",
      en: "Illustration of artificial intelligence collaborating with a developer",
    },
    category: {
      es: "Inteligencia artificial",
      en: "Artificial intelligence",
    },
    publishedAt: "2025-11-05",
    readTime: {
      es: "8 min de lectura",
      en: "8 min read",
    },
    title: {
      es: "Cómo la inteligencia artificial potencia al desarrollador de software",
      en: "How AI empowers software developers",
    },
    excerpt: {
      es: "Del pair programming asistido a la optimización automática, un repaso por las formas en que la IA acelera equipos de desarrollo sin perder control técnico.",
      en: "From AI pair programming to automated optimisation: how machine intelligence accelerates engineering teams without losing technical control.",
    },
    sections: [
      {
        heading: {
          es: "Automatización de tareas repetitivas",
          en: "Automating repetitive work",
        },
        paragraphs: [
          {
            es: "La mayor parte del tiempo de un desarrollador se consume en tareas predecibles: configurar proyectos, escribir pruebas básicas o generar mocks. Herramientas como GitHub Copilot, Amazon CodeWhisperer o los asistentes de Cursor convierten instrucciones en bloques de código funcional, liberando horas cada semana para resolver problemas estratégicos.",
            en: "Most developer time still goes to predictable tasks: bootstrapping projects, writing boilerplate tests or spinning up mocks. Tools such as GitHub Copilot, Amazon CodeWhisperer or the Cursor assistants turn natural instructions into functional code, giving back hours every week for strategic challenges.",
          },
          {
            es: "El impacto no es solo velocidad. Al delegar lo repetitivo se reduce el error humano causado por el cansancio y se documenta mejor la intención de cada módulo. La IA produce variantes, explica alternativas y deja un rastro claro de decisiones.",
            en: "Speed is not the only gain. Delegating repetitive work reduces human error caused by fatigue and leaves better documentation of intent. AI generates variants, explains alternatives and leaves a clear trail of decisions.",
          },
        ],
        bullets: {
          es: [
            "Generación automática de pruebas unitarias con explicaciones paso a paso.",
            "Plantillas de arquitectura para microservicios o monolitos modernos.",
            "Scripts de migración y consultas SQL optimizadas con análisis de índices.",
          ],
          en: [
            "Automatic unit test generation with step-by-step commentary.",
            "Architecture templates ready for microservices or modern monoliths.",
            "Migration scripts and optimised SQL queries with index analysis.",
          ],
        },
      },
      {
        heading: {
          es: "Asistentes que razonan con tu contexto",
          en: "Assistants that reason about your context",
        },
        paragraphs: [
          {
            es: "La clave para obtener respuestas útiles es ofrecer contexto. Las plataformas modernas permiten indexar repositorios privados, issues y decisiones de arquitectura. Con esa base, la IA comprende los patrones del equipo y propone implementaciones consistentes.",
            en: "Useful answers require context. Modern platforms index private repositories, issues and architecture decisions. With that foundation, AI understands team patterns and proposes consistent implementations.",
          },
          {
            es: "Además, la IA funciona como un reviewer que nunca se cansa: detecta code smells, sugiere refactors y cita la documentación interna cuando se rompe una convención. El desarrollador conserva la última palabra, pero con una segunda opinión inmediata.",
            en: "AI also behaves like a reviewer that never tires: it detects code smells, suggests refactors and cites internal documentation when conventions are broken. Engineers keep the final say yet receive an instant second opinion.",
          },
        ],
      },
      {
        heading: {
          es: "Mejora continua impulsada por datos",
          en: "Data-driven continuous improvement",
        },
        paragraphs: [
          {
            es: "Con modelos que analizan telemetría y feedback de usuarios, los equipos toman decisiones respaldadas por datos. La IA detecta patrones de rendimiento, predice cuellos de botella y ayuda a priorizar tareas con mayor impacto en la experiencia del usuario.",
            en: "With models analysing telemetry and user feedback, teams make decisions backed by data. AI spots performance patterns, predicts bottlenecks and helps prioritise the tasks with the highest impact on user experience.",
          },
          {
            es: "Integrar estas capacidades en el pipeline de CI/CD genera un ciclo virtuoso: el código se entrega más rápido, con mayor calidad percibida y con visibilidad clara sobre el ROI técnico.",
            en: "Embedding these capabilities into the CI/CD pipeline builds a virtuous cycle: code ships faster, perceived quality increases and the technical ROI becomes visible.",
          },
        ],
      },
    ],
    conclusion: {
      es: "La IA no reemplaza al desarrollador; actúa como un copiloto fiable que automatiza lo rutinario, documenta decisiones y permite enfocarse en arquitectura y producto. Quien aprenda a integrarla hoy tendrá una ventaja competitiva duradera.",
      en: "AI does not replace developers; it is a reliable copilot that automates routine work, documents decisions and frees focus for architecture and product. Teams that embrace it today gain a durable competitive edge.",
    },
  },
  {
    slug: "ia-para-diseno",
    image: "/blog/ai-designer.svg",
    imageAlt: {
      es: "Ilustración de herramientas de diseño asistidas por IA",
      en: "Illustration of design tools assisted by AI",
    },
    category: {
      es: "Diseño y IA",
      en: "Design & AI",
    },
    publishedAt: "2025-10-18",
    readTime: {
      es: "7 min de lectura",
      en: "7 min read",
    },
    title: {
      es: "Diseñadores + IA: flujos creativos más inteligentes",
      en: "Designers + AI: smarter creative workflows",
    },
    excerpt: {
      es: "Desde moodboards generativos hasta handoff automatizado, la IA permite a los equipos de diseño iterar más rápido sin perder la visión creativa.",
      en: "From generative moodboards to automated handoff, AI lets design teams iterate faster without losing their creative vision.",
    },
    sections: [
      {
        heading: {
          es: "Inspiración instantánea y referencias inteligentes",
          en: "Instant inspiration and smart references",
        },
        paragraphs: [
          {
            es: "Los generadores de imágenes y motores de prompts permiten explorar cientos de variantes visuales en minutos. Con un buen brief, la IA sugiere paletas, layouts y estilos tipográficos que sirven como punto de partida para la dirección de arte.",
            en: "Image generators and prompt engines let designers explore hundreds of visual variants in minutes. With a clear brief, AI suggests palettes, layouts and typography styles that become a solid starting point for art direction.",
          },
          {
            es: "La clave está en la curaduría: el diseñador elige, mezcla y ajusta. La IA funciona como catalizador creativo, no como reemplazo del criterio humano.",
            en: "Curatorship is everything: designers choose, blend and adjust. AI acts as a creative catalyst, not a replacement for human judgement.",
          },
        ],
      },
      {
        heading: {
          es: "Sistemas de diseño consistentes",
          en: "Consistent design systems",
        },
        paragraphs: [
          {
            es: "Plugins asistidos por IA analizan componentes en Figma o Sketch, detectan inconsistencias y sugieren tokens unificados. Esto reduce el tiempo invertido en limpieza y garantiza un handoff impecable al equipo de desarrollo.",
            en: "AI-assisted plugins scan Figma or Sketch components, detect inconsistencies and suggest unified design tokens. Cleanup time drops dramatically and the handoff to engineering becomes frictionless.",
          },
          {
            es: "También es posible generar variantes responsivas y accesibles de cada pantalla con un clic, esperando que el diseñador refine detalles en lugar de empezar desde cero.",
            en: "It is now possible to generate responsive and accessible variants of each screen with one click, letting designers refine details instead of starting from scratch.",
          },
        ],
        bullets: {
          es: [
            "Inventarios automáticos de componentes duplicados.",
            "Tokens tipográficos y de color basados en WCAG.",
            "Checklist de accesibilidad con sugerencias concretas.",
          ],
          en: [
            "Automatic inventories of duplicated components.",
            "Typography and colour tokens generated with WCAG compliance.",
            "Accessibility checklists with concrete suggestions.",
          ],
        },
      },
      {
        heading: {
          es: "Handoff más rápido y colaboración fluida",
          en: "Faster handoff and smoother collaboration",
        },
        paragraphs: [
          {
            es: "Los asistentes documentan decisiones de diseño, generan especificaciones y producen storybooks listos para desarrollo. Esto reduce la fricción entre equipos y evita malinterpretaciones.",
            en: "Assistants now document design decisions, generate specs and produce ready-to-use storybooks for developers. Friction between teams shrinks and misinterpretations fade away.",
          },
          {
            es: "La IA también ayuda a traducir feedback del cliente en acciones concretas, priorizando cambios según impacto y esfuerzo estimado.",
            en: "AI also translates client feedback into actionable tasks, prioritising changes by impact and estimated effort.",
          },
        ],
      },
    ],
    conclusion: {
      es: "El diseñador que adopta IA se enfoca en la visión, la narrativa y la experiencia. Las herramientas automatizan lo técnico y repetitivo, dejando más tiempo para crear experiencias memorables.",
      en: "Designers who embrace AI focus on vision, narrative and experience. Tools automate the technical and repetitive work, freeing more time to craft memorable journeys.",
    },
  },
  {
    slug: "ia-para-project-managers",
    image: "/blog/ai-project-manager.svg",
    imageAlt: {
      es: "Ilustración de un project manager coordinando con ayuda de IA",
      en: "Illustration of a project manager coordinating with AI assistance",
    },
    category: {
      es: "Gestión de proyectos",
      en: "Project management",
    },
    publishedAt: "2025-11-02",
    readTime: {
      es: "5 min de lectura",
      en: "5 min read",
    },
    title: {
      es: "Cómo la IA potencia al Project Manager moderno",
      en: "How AI elevates the modern project manager",
    },
    excerpt: {
      es: "Planificación dinámica, seguimiento automatizado y comunicación mejorada: la IA convierte al PM en un orquestador estratégico en tiempo real.",
      en: "Dynamic planning, automated tracking and clearer communication: AI turns PMs into real-time strategic orchestrators.",
    },
    sections: [
      {
        heading: {
          es: "Planificación basada en datos vivos",
          en: "Planning with living data",
        },
        paragraphs: [
          {
            es: "Los modelos de IA conectados a herramientas como Jira, Linear o Monday analizan velocidad histórica, dependencias y capacidad del equipo para proponer roadmaps realistas. El Project Manager ajusta parámetros y la IA recalcula escenarios en segundos.",
            en: "AI models connected to tools such as Jira, Linear or Monday analyse historical velocity, dependencies and team capacity to suggest realistic roadmaps. The project manager tweaks constraints and AI recalculates scenarios in seconds.",
          },
          {
            es: "Esto reduce la planificación a ciegas: cada sprint se construye con datos frescos y alertas tempranas cuando cambian el scope o la capacidad.",
            en: "Blind planning fades away: every sprint is built with fresh data and early alerts when scope or capacity shifts.",
          },
        ],
        bullets: {
          es: [
            "Forecasts automáticos considerando feriados y rotación.",
            "Detección de dependencias críticas con visualización de riesgos.",
            "Sugerencias de trade-offs de scope basadas en impacto y esfuerzo.",
          ],
          en: [
            "Automatic delivery forecasts accounting for holidays and churn.",
            "Critical dependency detection with risk visualisation.",
            "Scope trade-off suggestions based on impact and effort.",
          ],
        },
      },
      {
        heading: {
          es: "Seguimiento inteligente y alertas contextuales",
          en: "Smart tracking and contextual alerts",
        },
        paragraphs: [
          {
            es: "Los asistentes monitorean commits, comentarios y métricas de producto. Cuando detectan bloqueos generan resúmenes accionables, identifican responsables y proponen próximos pasos con documentación adjunta.",
            en: "Assistants monitor commits, comments and product metrics. When they spot blockers they generate actionable summaries, flag owners and propose next steps with linked documentation.",
          },
          {
            es: "El PM deja de perseguir actualizaciones manuales: recibe un digest diario con el estado de cada stream, desviaciones y salud del equipo.",
            en: "PMs stop chasing manual updates: they receive a daily digest covering each stream, deviations and team health.",
          },
        ],
      },
      {
        heading: {
          es: "Comunicación que escala",
          en: "Communication that scales",
        },
        paragraphs: [
          {
            es: "La IA traduce el lenguaje técnico a narrativas de negocio para stakeholders y genera notas de reunión con decisiones claras. También sintetiza feedback de clientes para priorizar en el backlog.",
            en: "AI translates technical language into business narratives for stakeholders and generates meeting notes with explicit decisions. It also synthesises customer feedback to prioritise backlog items.",
          },
          {
            es: "Al automatizar el trabajo de documentación, el Project Manager dedica más tiempo a resolver bloqueos y alinear visión con los líderes.",
            en: "With documentation on autopilot, project managers spend more time removing blockers and aligning vision with leadership.",
          },
        ],
      },
    ],
    conclusion: {
      es: "La IA no reemplaza al Project Manager; amplifica su capacidad para anticiparse, coordinar y comunicar. Quien adopte estas herramientas hoy gestionará equipos más resilientes y alineados.",
      en: "AI does not replace project managers; it amplifies their ability to anticipate, coordinate and communicate. Those who adopt these tools now will lead more resilient, aligned teams.",
    },
  },
  {
    slug: "desarrollar-en-cursor-y-lovable-con-ia",
    image: "/blog/ai-cursor-lovable.svg",
    imageAlt: {
      es: "Ilustración de entornos Cursor y Lovable asistidos por IA",
      en: "Illustration of Cursor and Lovable environments assisted by AI",
    },
    category: {
      es: "Herramientas",
      en: "Tools",
    },
    publishedAt: "2025-09-30",
    readTime: {
      es: "6 min de lectura",
      en: "6 min read",
    },
    title: {
      es: "Cómo desarrollar en Cursor y Lovable con ayuda de la inteligencia artificial",
      en: "Building in Cursor and Lovable with AI assistance",
    },
    excerpt: {
      es: "Dos entornos emergentes que combinan edición colaborativa, chat contextual y despliegues guiados por IA para acelerar productos digitales.",
      en: "Two emerging environments that mix collaborative editing, contextual chat and AI-guided deployments to accelerate digital products.",
    },
    sections: [
      {
        heading: {
          es: "Cursor: pair programming permanente",
          en: "Cursor: permanent pair programming",
        },
        paragraphs: [
          {
            es: "Cursor integra un asistente que comprende el árbol completo del proyecto. Puedes conversar, pedir refactors, crear pruebas o generar commits enteros. Las respuestas citan archivos relevantes para revisar rápidamente.",
            en: "Cursor embeds an assistant that understands the entire project tree. You can chat, request refactors, create tests or generate full commits. Answers cite relevant files so reviews stay fast.",
          },
          {
            es: "El modo Composer acelera la escritura de nuevas funcionalidades tomando como referencia componentes existentes. Resultado: menos contexto perdido y PRs más pequeños.",
            en: "Composer mode speeds up new feature work by referencing existing components. The result is less lost context and smaller pull requests.",
          },
        ],
        bullets: {
          es: [
            "Explicaciones línea por línea con enlaces al repositorio.",
            "Integración con pruebas y comandos personalizados.",
            "Generación de documentación y changelogs a demanda.",
          ],
          en: [
            "Line-by-line explanations with repository links.",
            "Integration with tests and custom commands.",
            "Documentation and changelog generation on demand.",
          ],
        },
      },
      {
        heading: {
          es: "Lovable: prototipos completos en horas",
          en: "Lovable: ship full prototypes in hours",
        },
        paragraphs: [
          {
            es: "Lovable mezcla IA generativa y bloques listos para lanzar productos SaaS. Describe tu idea y obtienes un MVP funcional con base de datos, autenticación y dashboards.",
            en: "Lovable combines generative AI with ready-made blocks to launch SaaS products. Describe your idea and you get a functional MVP with database, auth and dashboards.",
          },
          {
            es: "El desarrollador retoma el control al personalizar estilos, agregar lógica y conectar APIs. Es ideal para validar mercados sin invertir semanas en infraestructura.",
            en: "Developers regain control by customising styles, adding logic and connecting APIs. It is ideal for validating markets without investing weeks in infrastructure.",
          },
        ],
      },
      {
        heading: {
          es: "Estrategia para equipos híbridos",
          en: "Strategy for hybrid teams",
        },
        paragraphs: [
          {
            es: "Al combinar Cursor y Lovable los equipos pueden iterar rápido: Lovable genera la base visual y de negocio, mientras Cursor garantiza calidad de código y escalabilidad.",
            en: "Combining Cursor and Lovable lets teams iterate fast: Lovable generates the visual and business foundation while Cursor ensures code quality and scalability.",
          },
          {
            es: "Lo importante es definir un protocolo: qué tareas delega la IA, cuándo revisar manualmente y cómo versionar los cambios para mantener consistencia.",
            en: "The key is defining a protocol: which tasks AI handles, when to review manually and how to version changes to keep consistency.",
          },
        ],
      },
    ],
    conclusion: {
      es: "Adoptar Cursor y Lovable con IA es abrazar una cultura de delivery continuo. La tecnología hace el trabajo pesado, pero el criterio humano define la visión y la calidad final.",
      en: "Adopting Cursor and Lovable with AI means embracing a culture of continuous delivery. Technology takes on the heavy lifting while human judgement sets vision and final quality.",
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}



