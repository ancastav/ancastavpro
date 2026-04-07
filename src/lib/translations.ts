export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      solutions: 'Soluciones',
      pricing: 'Inversión',
      blog: 'Insights',
      diagnostic: 'Diagnóstico Lab',
      portal: 'Portal Clientes'
    },
    hero: {
      badge: 'Expertos en Transformación Digital',
      title1: 'Tu Web.',
      title2: 'Tu Marca.',
      title3: 'Más Clientes.',
      description: 'Diseñamos infraestructuras de última generación para la nueva era de líderes empresariales. Velocidad extrema, diseño impecable y conversión inteligente.',
      cta1: 'Explorar Soluciones',
      cta2: 'Ver Planes de Inversión',
      system_status: 'Estado del Sistema',
      geoposition: 'Geoposición'
    },
    dna: {
      badge: 'Socio Tecnológico Estratégico',
      title: 'Arquitectura ADN Digital',
      description: 'Fusionamos la ingeniería de software más avanzada con un diseño orientado a resultados, construyendo los cimientos del éxito digital para negocios de élite.',
      pillars: [
        {
          id: 'velocity',
          label: 'CORE // RENDIMIENTO',
          title: 'Velocidad de Vanguardia',
          description: 'Arquitectura Next.js que garantiza tiempos de carga instantáneos para maximizar la retención de usuarios.'
        },
        {
          id: 'conversion',
          label: 'CORE // NEGOCIOS',
          title: 'Conversión por Diseño',
          description: 'Estructuras SEO y flujos de usuario optimizados para transformar cada visita en un lead estratégico.'
        },
        {
          id: 'security',
          label: 'CORE // NUBE',
          title: 'Seguridad de Élite',
          description: 'Infraestructura en la nube con encriptación avanzada y protección de datos a nivel empresarial.'
        },
        {
          id: 'design',
          label: 'CORE // VANGUARDIA',
          title: 'Identidad Digital',
          description: 'Diseño UX/UI de última generación que eleva el valor percibido de tu marca y genera confianza.'
        }
      ]
    },
    dna_modules: {
      badge: 'DIAGNÓSTICO_LAB // ADN_DIGITAL',
      title: 'Módulos de Arquitectura',
      subtitle: 'Diseñado para escala de alto rendimiento',
      items: [
        { 
          id: 'WR', 
          title: 'Web Reality', 
          description: 'Optimización total en motores de búsqueda y arquitectura de carga instantánea.', 
          tag: 'PRESENCIA_WEB'
        },
        { 
          id: 'SN', 
          title: 'Social Nexus', 
          description: 'Sincronización estratégica de canales digitales para un alcance omnicanal.', 
          tag: 'REDES_SOCIALES'
        },
        { 
          id: 'TG', 
          title: 'Trust Guard', 
          description: 'Sistemas de monitoreo y construcción de autoridad de marca en tiempo real.', 
          tag: 'REPUTACION_ONLINE'
        },
        { 
          id: 'GS', 
          title: 'Ventas Globales', 
          description: 'Ecosistemas de conversión automatizados para maximizar el ROI comercial.', 
          tag: 'VENTAS_DIGITAL'
        },
        { 
          id: 'AO', 
          title: 'Operaciones Alpha', 
          description: 'Flujos de trabajo inteligentes y chatbots de última generación para atención 24/7.', 
          tag: 'AUTOMATIZACION'
        }
      ],
      quiz: {
        welcome: {
          title: '¿Cuál es el ADN Digital de tu Negocio?',
          subtitle: 'Descubre en 3 minutos las debilidades y fortalezas de tu arquitectura digital actual.',
          cta: 'INICIAR DIAGNÓSTICO',
          footer: 'Análisis basado en 15 indicadores clave de rendimiento (KPIs).'
        },
        steps: [
          {
            module: 'PRESENCIA_WEB',
            questions: [
              { id: 'q1', text: '¿Tu sitio web carga en menos de 3 segundos?' },
              { id: 'q2', text: '¿Está perfectamente optimizado para dispositivos móviles?' },
              { id: 'q3', text: '¿Aparece en la primera página de Google para tus servicios?' }
            ]
          },
          {
            module: 'REDES_SOCIALES',
            questions: [
              { id: 'q4', text: '¿Publicas contenido de valor al menos 3 veces por semana?' },
              { id: 'q5', text: '¿Tus perfiles tienen una estética profesional y coherente?' },
              { id: 'q6', text: '¿Interactúas con tu comunidad en menos de 2 horas?' }
            ]
          },
          {
            module: 'REPUTACION_ONLINE',
            questions: [
              { id: 'q7', text: '¿Tienes más de 20 reseñas positivas en Google My Business?' },
              { id: 'q8', text: '¿Monitorizas lo que se dice de tu marca en internet?' },
              { id: 'q9', text: '¿Cuentas con testimonios en video de clientes reales?' }
            ]
          },
          {
            module: 'VENTAS_DIGITAL',
            questions: [
              { id: 'q10', text: '¿Tienes un embudo de ventas (funnel) automatizado?' },
              { id: 'q11', text: '¿Aceptas pagos en línea de forma segura?' },
              { id: 'q12', text: '¿Haces remarketing a quienes visitaron tu web?' }
            ]
          },
          {
            module: 'AUTOMATIZACION',
            questions: [
              { id: 'q13', text: '¿Usas un CRM para gestionar tus prospectos?' },
              { id: 'q14', text: '¿Tienes respuestas automáticas en WhatsApp/Messenger?' },
              { id: 'q15', text: '¿Tus procesos internos están digitalizados y conectados?' }
            ]
          }
        ],
        options: [
          { text: 'Sí, totalmente', value: 100 },
          { text: 'En proceso', value: 50 },
          { text: 'No, pero lo necesito', value: 25 },
          { text: 'No me interesa', value: 0 }
        ],
        analysis: {
          title: 'GENERANDO ADN DIGITAL...',
          subtitle: 'Procesando indicadores de rendimiento y benchmarks del sector.',
          steps: [
            'Escaneando arquitectura web...',
            'Analizando alcance social...',
            'Verificando protocolos de confianza...',
            'Calculando proyecciones de venta...',
            'Optimizando flujos operativos...'
          ]
        },
        results: {
          title: 'Resultados del Análisis',
          cta: 'VER SOLUCIONES ESTRATÉGICAS',
          score_label: 'Índice de Madurez Digital',
          levels: {
            low: {
              status: 'Nivel Inicial',
              message: 'Alto Potencial por Desarrollar. Estás perdiendo visibilidad frente a tu competencia. Urge una arquitectura web profesional.'
            },
            medium: {
              status: 'Nivel Intermedio',
              message: 'Crecimiento en Marcha. Tienes bases sólidas, pero falta automatización para escalar sin límites.'
            },
            high: {
              status: 'Nivel Avanzado',
              message: 'Presencia Digital Sólida. Tu negocio está a la vanguardia, ahora es momento de optimizar conversiones al máximo.'
            },
            restart: 'REINICIAR DIAGNÓSTICO'
          },
          recommendation_title: 'Plan Recomendado',
          recommendation_why: '¿Por qué este plan?',
          sending_report: 'Enviando Plan de Acción...',
          report_sent: '¡Plan de Acción enviado a Ancastav!',
          report_error: 'Error al enviar reporte.'
        }
      }
    },
    seo: {
      title: 'ancastav | Arquitectura Digital de Vanguardia',
      description: 'Expertos en transformación digital. Diseño de sitios web, SEO estratégico e inteligencia artificial para negocios de élite.',
      keywords: 'diseño web, next.js, seo, inteligencia artificial, transformación digital, ancastav, optimización web',
      og_title: 'ancastav - Socio Tecnológico Estratégico',
      og_description: 'Construimos el ADN digital de tu negocio con tecnología de última generación.'
    },
    services: {
      badge: 'ESPECIALIZACIÓN // SECTORIAL',
      title: 'Soluciones Verticales',
      description: 'Desplegamos inteligencia digital especializada en industrias clave, asegurando que cada línea de código esté optimizada para las demandas únicas de tu mercado.',
      explore: 'Explorar Arquitectura',
      items: [
        { 
          id: 'RE', 
          title: 'Inmobiliarias (Real Estate)', 
          description: 'Motores de búsqueda avanzados y sistemas automatizados de emparejamiento de propiedades.', 
          tag: 'ESTADO // ALTA_CONVERSIÓN'
        },
        { 
          id: 'HC', 
          title: 'Clínicas y Salud', 
          description: 'Plataformas de gestión de pacientes con agendamiento integrado y expedientes digitales.', 
          tag: 'ESTADO // DATOS_SEGUROS'
        },
        { 
          id: 'EC', 
          title: 'E-Commerce Avanzado', 
          description: 'Tiendas de última generación con inventario en tiempo real y optimización de checkout.', 
          tag: 'ESTADO // ESCALABLE'
        },
        { 
          id: 'RS', 
          title: 'Restaurantes y Gastro', 
          description: 'Menú digital dinámico y gestión de reservas para locales de alto tráfico.', 
          tag: 'ESTADO // MOBILE_FIRST'
        },
        { 
          id: 'AC', 
          title: 'Academias y LMS', 
          description: 'Entornos de aprendizaje personalizados diseñados para la educación moderna a distancia.', 
          tag: 'ESTADO // INTERACTIVO'
        },
        { 
          id: 'PS', 
          title: 'Servicios Profesionales', 
          description: 'Herramientas administrativas a medida para bufetes, contabilidad y consultoría.', 
          tag: 'ESTADO // EFICIENCIA'
        }
      ]
    },
    stats: {
      title: 'Diseñando para Escala Estratégica',
      description: 'La plataforma Ancastav es más que un sitio web; es una infraestructura de misión crítica diseñada para propelir tu visión comercial.',
      uptime: 'Tiempo de Actividad',
      conversion: 'Conversión Media',
      latency: 'Latencia Sistemas',
      growth: 'Crecimiento Cliente'
    },
    investment: {
      title: 'Planes de Inversión Digital',
      description: 'Inversiones claras, resultados medibles. Selecciona el nivel de potencia que tu marca necesita para dominar el mercado.',
      plans: {
        alpha: 'Presencia Alpha',
        sigma: 'Business Sigma',
        delta: 'Enterprise Delta'
      },
      descriptions: {
        alpha: 'Ideal para profesionales y emprendedores que buscan una identidad digital sólida y rápida.',
        sigma: 'La solución completa para empresas en expansión. Incluye herramientas de marketing y visibilidad.',
        delta: 'E-commerce y plataformas complejas. Diseñado para maximizar ventas y automatizar procesos.'
      },
      features: {
        alpha: [
          '1-3 Secciones Estratégicas',
          'Arquitectura Responsive PRO',
          'Dominio + Hosting (1er Año)',
          'Integración WhatsApp Directo',
          'SEO Estructural Básico',
          'Certificado SSL Incluido'
        ],
        sigma: [
          'Secciones Ilimitadas',
          'Blog Corporativo para SEO',
          'Google Analytics Avanzado',
          'Gestión de Redes Integrada',
          'Formularios de Captación PRO',
          'Soporte Prioritario 6 Meses'
        ],
        delta: [
          'Tienda Online Completa',
          'Pasarela de Pagos Segura',
          'Gestión de Inventario Automática',
          'Notificaciones Push / Email',
          'Audit de Rendimiento Mensual',
          'Soporte 24/7 Dedicado'
        ]
      },
      cta: {
        alpha: 'Comenzar Alpha',
        sigma: 'Elegir Sigma',
        delta: 'Desplegar Delta'
      },
      popular: 'MÁS POPULAR',
      footnote: '* Precios únicos de desarrollo. Hosting y mantenimiento opcional.'
    },
    roadmap: {
      title: 'Ciclo de Vida del Proyecto',
      status: {
        complete: 'COMPLETADO',
        progress: 'EN PROGRESO',
        queued: 'EN COLA'
      },
      steps: [
        { id: '01', title: 'Startups & Strategy', date: 'FASE_ALPHA', description: 'Investigación profunda del posicionamiento de la industria y definición del ADN de la marca.', originalStatus: 'COMPLETE' },
        { id: '02', title: 'Fundación Digital', date: 'FASE_BETA', description: 'Construyendo la infraestructura digital central con frameworks React/Next.js.', originalStatus: 'IN_PROGRESS' },
        { id: '03', title: 'Integración IA', date: 'FASE_GAMMA', description: 'Despliegue de nodos de inteligencia personalizados para el engagement automatizado del cliente.', originalStatus: 'QUEUED' },
        { id: '04', title: 'Lanzamiento Vanguardia', date: 'FASE_RELEASE', description: 'Optimización completa de la plataforma y despliegue estratégico en el mercado.', originalStatus: 'QUEUED' }
      ]
    },
    techstack: {
      title: 'Arquitectura de Vanguardia',
      status: 'NODOS_SISTEMA_CORE: EJECUCIÓN_ESTABLE',
      technologies: [
       { name: 'Next.js', category: 'FRAMEWORK', icon: '⚡', description: 'La arquitectura React definitiva para velocidad y SSR.' },
       { name: 'TypeScript', category: 'ENCRIPTACIÓN', icon: '🛡️', description: 'Código robusto y libre de errores para mayor seguridad.' },
       { name: 'Tailwind CSS', category: 'DISEÑO', icon: '🎨', description: 'Estilos ultra-rápidos con una estética moderna y limpia.' },
       { name: 'Firebase', category: 'BASE_DE_DATOS', icon: '🔥', description: 'Base de datos en tiempo real para interacción instantánea.' },
       { name: 'Google Cloud', category: 'INFRAESTRUCTURA', icon: '☁️', description: 'Despliegues escalables con 99.9% de tiempo de actividad.' },
       { name: 'Integración IA', category: 'GENERICO', icon: '🧠', description: 'Automatización inteligente para captación de leads.' }
      ]
    },
    footer: {
      bio: 'Impulsando marcas profesionales hacia el futuro del comercio digital y la inteligencia automatizada.',
      sections: {
        systems: 'Sistemas',
        company: 'Empresa',
        legal: 'Legal'
      },
      links: {
        nodes: 'Nodos Principales',
        assistant: 'Asistente Digital v3',
        security: 'Protocolos de Seguridad',
        cloud: 'Arquitectura Nube',
        vision: 'Nuestra Visión',
        success: 'Casos de Éxito',
        lab: 'Lab Diagnóstico',
        contact: 'Contacto Directo',
        privacy: 'Privacidad de Datos',
        terms: 'Términos de Servicio',
        cookies: 'Cookies'
      },
      rights: 'Todos los derechos reservados.',
      powered: 'Desarrollado por Inteligencia de Vanguardia'
    },
    diagnostic: {
      badge: 'Consultoría Estratégica',
      title1: 'Inicie su',
      title2: 'Diagnóstico Digital',
      description: 'Defina su infraestructura. Nosotros construimos el futuro.',
      fields: {
        name: 'Nombre Completo',
        email: 'Email Corporativo',
        phone: 'Teléfono / WhatsApp',
        sector: 'Sector / Interés',
        message: 'Objetivo del Proyecto'
      },
      placeholders: {
        name: 'Ej. Juan Pérez',
        email: 'juan@empresa.com',
        phone: '+1 809 000 0000',
        message: 'Cuéntenos sus requerimientos técnicos o metas comerciales...'
      },
      submit: 'Enviar Solicitud',
      successTitle: 'Solicitud Recibida',
      successMessage: 'Un consultor de Ancastav Digital Services lo contactará en menos de 24 horas.',
      errorMessage: 'Ocurrió un error. Verifique su conexión e intente de nuevo.',
      sectors: [
        { value: 'RE', label: 'Bienes Raíces' },
        { value: 'HC', label: 'Salud & Clínicas' },
        { value: 'EC', label: 'E-Commerce PRO' },
        { value: 'RS', label: 'Restauración' },
        { value: 'AC', label: 'Academias Digitales' },
        { value: 'PS', label: 'Servicios Profesionales' },
      ]
    },
    blog: {
      badge: 'ARTÍCULOS // NODOS_MUNDO',
      title: 'Vanguard Insights',
      description: 'Análisis de última milla sobre las tecnologías que están redefiniendo el comercio global.',
      viewAll: 'Ver todos los artículos',
      readMore: 'Leer Artículo',
      back: 'Volver al Blog',
      share: 'Compartir',
      latest: 'Últimas Noticias',
      categories: {
        all: 'Todos',
        ai: 'Inteligencia Artificial',
        dev: 'Desarrollo',
        security: 'Seguridad'
      }
    }
  },
  en: {
    nav: {
      solutions: 'Solutions',
      pricing: 'Investment',
      diagnostic: 'Lab Diagnostic',
      blog: 'Insights',
      portal: 'Client Portal'
    },
    hero: {
      badge: 'Experts in Digital Transformation',
      title1: 'Your Web.',
      title2: 'Your Brand.',
      title3: 'More Clients.',
      description: 'We design next-generation infrastructures for the new era of business leaders. Extreme speed, impeccable design, and intelligent conversion.',
      cta1: 'Explore Solutions',
      cta2: 'View Investment Plans',
      system_status: 'System Status',
      geoposition: 'Geoposition'
    },
    dna: {
      badge: 'Strategic Technology Partner',
      title: 'Digital DNA Architecture',
      description: 'We fuse advanced software engineering with results-oriented design, building the digital foundations for elite business success.',
      pillars: [
        {
          id: 'velocity',
          label: 'CORE // PERFORMANCE',
          title: 'Vanguard Velocity',
          description: 'Next.js architecture ensuring instant load times to maximize user retention.'
        },
        {
          id: 'conversion',
          label: 'CORE // BUSINESS',
          title: 'Conversion by Design',
          description: 'SEO structures and user flows optimized to transform every visit into a strategic lead.'
        },
        {
          id: 'security',
          label: 'CORE // CLOUD',
          title: 'Elite Security',
          description: 'Cloud infrastructure with advanced encryption and enterprise-level data protection.'
        },
        {
          id: 'design',
          label: 'CORE // VANGUARD',
          title: 'Digital Identity',
          description: 'Next-generation UX/UI design that elevates your brand\'s perceived value and builds trust.'
        }
      ]
    },
    dna_modules: {
      badge: 'DIAGNOSTIC_LAB // DIGITAL_DNA',
      title: 'Architecture Modules',
      subtitle: 'Engineered for high-performance scale',
      items: [
        { 
          id: 'WR', 
          title: 'Web Reality', 
          description: 'Total search engine optimization and instant-load architecture.', 
          tag: 'WEB_PRESENCE'
        },
        { 
          id: 'SN', 
          title: 'Social Nexus', 
          description: 'Strategic synchronization of digital channels for omnichannel reach.', 
          tag: 'SOCIAL_NETWORKS'
        },
        { 
          id: 'TG', 
          title: 'Trust Guard', 
          description: 'Real-time monitoring and brand authority building systems.', 
          tag: 'ONLINE_REPUTATION'
        },
        { 
          id: 'GS', 
          title: 'Global Sales', 
          description: 'Automated conversion ecosystems to maximize commercial ROI.', 
          tag: 'DIGITAL_SALES'
        },
        { 
          id: 'AO', 
          title: 'Alpha Ops', 
          description: 'Intelligent workflows and next-gen chatbots for 24/7 care.', 
          tag: 'AUTOMATION'
        }
      ],
      quiz: {
        welcome: {
          title: "What is your Business's Digital DNA?",
          subtitle: "Discover the weaknesses and strengths of your current digital architecture in 3 minutes.",
          cta: "START DIAGNOSTIC",
          footer: "Analysis based on 15 key performance indicators (KPIs)."
        },
        steps: [
          {
            module: 'WEB_PRESENCE',
            questions: [
              { id: 'q1', text: 'Does your website load in less than 3 seconds?' },
              { id: 'q2', text: 'Is it perfectly optimized for mobile devices?' },
              { id: 'q3', text: 'Does it appear on the first page of Google for your services?' }
            ]
          },
          {
            module: 'SOCIAL_NETWORKS',
            questions: [
              { id: 'q4', text: 'Do you publish value-driven content at least 3 times a week?' },
              { id: 'q5', text: 'Do your profiles have a professional and consistent aesthetic?' },
              { id: 'q6', text: 'Do you interact with your community in less than 2 hours?' }
            ]
          },
          {
            module: 'ONLINE_REPUTATION',
            questions: [
              { id: 'q7', text: 'Do you have more than 20 positive reviews on Google My Business?' },
              { id: 'q8', text: 'Do you monitor what is said about your brand on the internet?' },
              { id: 'q9', text: 'Do you have video testimonials from real clients?' }
            ]
          },
          {
            module: 'DIGITAL_SALES',
            questions: [
              { id: 'q10', text: 'Do you have an automated sales funnel?' },
              { id: 'q11', text: 'Do you accept online payments securely?' },
              { id: 'q12', text: 'Do you remarket to those who visited your website?' }
            ]
          },
          {
            module: 'AUTOMATION',
            questions: [
              { id: 'q13', text: 'Do you use a CRM to manage your prospects?' },
              { id: 'q14', text: 'Do you have automatic replies on WhatsApp/Messenger?' },
              { id: 'q15', text: 'Are your internal processes digitized and connected?' }
            ]
          }
        ],
        options: [
          { text: 'Yes, totally', value: 100 },
          { text: 'In progress', value: 50 },
          { text: 'No, but I need it', value: 25 },
          { text: 'Not interested', value: 0 }
        ],
        analysis: {
          title: 'GENERATING DIGITAL DNA...',
          subtitle: 'Processing performance indicators and sector benchmarks.',
          steps: [
            'Scanning web architecture...',
            'Analyzing social reach...',
            'Verifying trust protocols...',
            'Calculating sales projections...',
            'Optimizing operational flows...'
          ]
        },
        results: {
          title: 'YOUR DNA RESULT',
          cta: 'VIEW STRATEGIC SOLUTIONS',
          score_label: 'Digital Maturity Index',
          levels: {
            low: {
              status: 'Initial Level',
              message: 'High Potential to Develop. You are losing visibility to your competition. A professional web architecture is urgent.'
            },
            medium: {
              status: 'Intermediate Level',
              message: 'Growth in Progress. You have solid foundations, but lack automation to scale without limits.'
            },
            high: {
              status: 'Advanced Level',
              message: 'Solid Digital Presence. Your business is at the forefront, now is the time to optimize conversions to the maximum.'
            },
            restart: 'RESTART DIAGNOSTIC'
          },
          recommendation_title: 'Recommended Plan',
          recommendation_why: 'Why this plan?',
          sending_report: 'Sending Action Plan...',
          report_sent: 'Action Plan sent to Ancastav!',
          report_error: 'Error sending report.'
        }
      }
    },
    seo: {
      title: 'ancastav | Next-Gen Digital Architecture',
      description: 'Experts in digital transformation. Web design, strategic SEO, and AI for elite businesses.',
      keywords: 'web design, next.js, seo, artificial intelligence, digital transformation, ancastav, web optimization',
      og_title: 'ancastav - Strategic Technology Partner',
      og_description: 'We build your business\'s digital DNA with next-generation technology.'
    },
    services: {
      badge: 'SPECIALIZATION // SECTORIAL',
      title: 'Vertical Solutions',
      description: 'We deploy specialized digital intelligence in key industries, ensuring every line of code is optimized for your market\'s unique demands.',
      explore: 'Explore Architecture',
      items: [
        { 
          id: 'RE', 
          title: 'Real Estate', 
          description: 'Advanced search engines and automated property matching systems.', 
          tag: 'STATUS // HIGH_CONVERSION'
        },
        { 
          id: 'HC', 
          title: 'Clinics & Healthcare', 
          description: 'Patient management platforms with integrated scheduling and digital records.', 
          tag: 'STATUS // SECURE_DATA'
        },
        { 
          id: 'EC', 
          title: 'Advanced E-Commerce', 
          description: 'Next-gen stores with real-time inventory and checkout optimization.', 
          tag: 'STATUS // SCALABLE'
        },
        { 
          id: 'RS', 
          title: 'Restaurants & F&B', 
          description: 'Dynamic digital menus and booking management for high-traffic venues.', 
          tag: 'STATUS // MOBILE_FIRST'
        },
        { 
          id: 'AC', 
          title: 'Academies & LMS', 
          description: 'Custom learning environments designed for modern distance education.', 
          tag: 'STATUS // INTERACTIVE'
        },
        { 
          id: 'PS', 
          title: 'Professional Services', 
          description: 'Tailored administrative tools for law firms, accounting, and consulting.', 
          tag: 'STATUS // EFFICIENCY'
        }
      ]
    },
    stats: {
      title: 'Designing for Strategic Scale',
      description: 'The Ancastav platform is more than a website; it is mission-critical infrastructure designed to propel your business vision.',
      uptime: 'System Uptime',
      conversion: 'Avg. Conversion',
      latency: 'System Latency',
      growth: 'Client Growth'
    },
    investment: {
      title: 'Digital Investment Plans',
      description: 'Clear investments, measurable results. Select the power level your brand needs to dominate the market.',
      plans: {
        alpha: 'Alpha Presence',
        sigma: 'Business Sigma',
        delta: 'Enterprise Delta'
      },
      descriptions: {
        alpha: 'Ideal for professionals and entrepreneurs looking for a solid and fast digital identity.',
        sigma: 'The complete solution for expanding companies. Includes marketing and visibility tools.',
        delta: 'E-commerce and complex platforms. Designed to maximize sales and automate processes.'
      },
      features: {
        alpha: [
          '1-3 Strategic Sections',
          'Responsive PRO Architecture',
          'Domain + Hosting (1st Year)',
          'Direct WhatsApp Integration',
          'Basic Structural SEO',
          'SSL Certificate Included'
        ],
        sigma: [
          'Unlimited Sections',
          'Corporate Blog for SEO',
          'Advanced Google Analytics',
          'Integrated Social Management',
          'PRO Lead Capture Forms',
          '6 Months Priority Support'
        ],
        delta: [
          'Complete Online Store',
          'Secure Payment Gateway',
          'Automatic Inventory Mgmt',
          'Push / Email Notifications',
          'Monthly Performance Audit',
          'Dedicated 24/7 Support'
        ]
      },
      cta: {
        alpha: 'Start Alpha',
        sigma: 'Choose Sigma',
        delta: 'Deploy Delta'
      },
      popular: 'MOST POPULAR',
      footnote: '* One-time development fees. Hosting and maintenance optional.'
    },
    roadmap: {
      title: 'Project Lifecycle',
      status: {
        complete: 'COMPLETE',
        progress: 'IN PROGRESS',
        queued: 'QUEUED'
      },
      steps: [
        { id: '01', title: 'Strategy Architecture', date: 'PHASE_ALPHA', description: 'Deep dive into industry positioning and brand DNA definition.', originalStatus: 'COMPLETE' },
        { id: '02', title: 'Digital Foundation', date: 'PHASE_BETA', description: 'Building the core digital infrastructure with React/Next.js frameworks.', originalStatus: 'IN_PROGRESS' },
        { id: '03', title: 'AI Integration', date: 'PHASE_GAMMA', description: 'Deploying custom intelligence nodes for automated client engagement.', originalStatus: 'QUEUED' },
        { id: '04', title: 'Vanguard Launch', date: 'PHASE_RELEASE', description: 'Full platform optimization and strategic market deployment.', originalStatus: 'QUEUED' }
      ]
    },
    techstack: {
      title: 'Vanguard Architecture',
      status: 'CORE_SYSTEM_NODES: RUNNING_STABLE',
      technologies: [
       { name: 'Next.js', category: 'FRAMEWORK', icon: '⚡', description: 'The ultimate React architecture for speed and SSR.' },
       { name: 'TypeScript', category: 'ENCRYPTION', icon: '🛡️', description: 'Robust, bug-free code for enhanced security.' },
       { name: 'Tailwind CSS', category: 'DESIGN', icon: '🎨', description: 'Ultra-fast styles with a clean, modern aesthetic.' },
       { name: 'Firebase', category: 'DATABASE', icon: '🔥', description: 'Real-time database for instant interaction.' },
       { name: 'Google Cloud', category: 'INFRA', icon: '☁️', description: 'Scalable deployments with 99.9% uptime.' },
       { name: 'AI Integration', category: 'GENERIC', icon: '🧠', description: 'Intelligent automation for lead capture.' }
      ]
    },
    footer: {
      bio: 'Propelling professional brands towards the future of digital commerce and automated intelligence.',
      sections: {
        systems: 'Systems',
        company: 'Company',
        legal: 'Legal'
      },
      links: {
        nodes: 'Main Nodes',
        assistant: 'Digital Assistant v3',
        security: 'Security Protocols',
        cloud: 'Cloud Architecture',
        vision: 'Our Vision',
        success: 'Success Cases',
        lab: 'Diagnostic Lab',
        contact: 'Direct Contact',
        privacy: 'Data Privacy',
        terms: 'Terms of Service',
        cookies: 'Cookies'
      },
      rights: 'All Rights Reserved.',
      powered: 'Powered by Vanguard Intelligence'
    },
    diagnostic: {
      badge: 'Strategic Consulting',
      title1: 'Start Your',
      title2: 'Digital Diagnostic',
      description: 'Define your infrastructure. We build the future.',
      fields: {
        name: 'Full Name',
        email: 'Corporate Email',
        phone: 'Phone / WhatsApp',
        sector: 'Sector / Interest',
        message: 'Project Objective'
      },
      placeholders: {
        name: 'e.g. John Doe',
        email: 'john@company.com',
        phone: '+1 809 000 0000',
        message: 'Tell us about your technical requirements or business goals...'
      },
      submit: 'Send Request',
      successTitle: 'Request Received',
      successMessage: 'An Ancastav Digital Services consultant will contact you in less than 24 hours.',
      errorMessage: 'An error occurred. Please check your connection and try again.',
      sectors: [
        { value: 'RE', label: 'Real Estate' },
        { value: 'HC', label: 'Health & Clinics' },
        { value: 'EC', label: 'E-Commerce PRO' },
        { value: 'RS', label: 'Restoration' },
        { value: 'AC', label: 'Digital Academies' },
        { value: 'PS', label: 'Professional Services' },
      ]
    },
    blog: {
      badge: 'ARTICLES // WORLD_NODES',
      title: 'Vanguard Insights',
      description: 'Last-mile analysis of the technologies redefining global commerce.',
      viewAll: 'View all articles',
      readMore: 'Read Article',
      back: 'Back to Blog',
      share: 'Share',
      latest: 'Latest News',
      categories: {
        all: 'All',
        ai: 'Artificial Intelligence',
        dev: 'Development',
        security: 'Security'
      }
    }
  }
};
