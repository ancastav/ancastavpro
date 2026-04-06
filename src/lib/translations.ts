export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      solutions: 'Soluciones',
      pricing: 'Inversión',
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
      cta2: 'Ver Planes de Inversión'
    },
    dna: {
      badge: 'Socio Tecnológico Estratégico',
      title: 'Digital DNA Architecture',
      description: 'Fusionamos la ingeniería de software más avanzada con un diseño orientado a resultados, construyendo los cimientos del éxito digital para negocios de élite.',
      pillars: [
        {
          id: 'velocity',
          label: 'PERFORMANCE',
          title: 'Velocidad de Vanguardia',
          description: 'Arquitectura Next.js que garantiza tiempos de carga instantáneos para maximizar la retención de usuarios.'
        },
        {
          id: 'conversion',
          label: 'BUSINESS',
          title: 'Conversión por Diseño',
          description: 'Estructuras SEO y flujos de usuario optimizados para transformar cada visita en un lead estratégico.'
        },
        {
          id: 'security',
          label: 'CLOUD',
          title: 'Seguridad de Élite',
          description: 'Infraestructura en la nube con encriptación avanzada y protección de datos a nivel empresarial.'
        },
        {
          id: 'design',
          label: 'VANGUARD',
          title: 'Identidad Digital',
          description: 'Diseño UX/UI de última generación que eleva el valor percibido de tu marca y genera confianza.'
        }
      ]
    },
    services: {
      badge: 'Especialización Sectorial',
      title: 'Soluciones Verticales',
      description: 'Desplegamos inteligencia digital especializada en industrias clave, asegurando que cada línea de código esté optimizada para las demandas únicas de tu mercado.',
      explore: 'Explorar Arquitectura',
      items: [
        { 
          id: 'RE', 
          title: 'Inmobiliarias (Real Estate)', 
          description: 'Motores de búsqueda avanzados y sistemas automatizados de emparejamiento de propiedades.', 
          tag: 'HIGH_CONVERSION'
        },
        { 
          id: 'HC', 
          title: 'Clínicas y Salud', 
          description: 'Plataformas de gestión de pacientes con agendamiento integrado y expedientes digitales.', 
          tag: 'SECURE_DATA'
        },
        { 
          id: 'EC', 
          title: 'E-Commerce Avanzado', 
          description: 'Tiendas de última generación con inventario en tiempo real y optimización de checkout.', 
          tag: 'SCALABLE'
        },
        { 
          id: 'RS', 
          title: 'Restaurantes y Gastro', 
          description: 'Menú digital dinámico y gestión de reservas para locales de alto tráfico.', 
          tag: 'MOBILE_FIRST'
        },
        { 
          id: 'AC', 
          title: 'Academias y LMS', 
          description: 'Entornos de aprendizaje personalizados diseñados para la educación moderna a distancia.', 
          tag: 'INTERACTIVE'
        },
        { 
          id: 'PS', 
          title: 'Servicios Profesionales', 
          description: 'Herramientas administrativas a medida para bufetes, contabilidad y consultoría.', 
          tag: 'EFFICIENCY'
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
      status: 'CORE_SYSTEM_NODES: RUNNING_STABLE',
      technologies: [
       { name: 'Next.js', category: 'FRAMEWORK', icon: '⚡', description: 'La arquitectura React definitiva para velocidad y SSR.' },
       { name: 'TypeScript', category: 'ENCRYPTION', icon: '🛡️', description: 'Código robusto y libre de errores para mayor seguridad.' },
       { name: 'Tailwind CSS', category: 'DESIGN', icon: '🎨', description: 'Estilos ultra-rápidos con una estética moderna y limpia.' },
       { name: 'Firebase', category: 'DATABASE', icon: '🔥', description: 'Base de datos en tiempo real para interacción instantánea.' },
       { name: 'Google Cloud', category: 'INFRA', icon: '☁️', description: 'Despliegues escalables con 99.9% de tiempo de actividad.' },
       { name: 'AI Integration', category: 'GENERIC', icon: '🧠', description: 'Automatización inteligente para captación de leads.' }
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
      rights: 'All Rights Reserved.',
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
      errorMessage: 'Ocurrió un error. Verifique su conexión e intente de nuevo.'
    }
  },
  en: {
    nav: {
      solutions: 'Solutions',
      pricing: 'Investment',
      diagnostic: 'Lab Diagnostic',
      portal: 'Client Portal'
    },
    hero: {
      badge: 'Experts in Digital Transformation',
      title1: 'Your Web.',
      title2: 'Your Brand.',
      title3: 'More Clients.',
      description: 'We design next-generation infrastructures for the new era of business leaders. Extreme speed, impeccable design, and intelligent conversion.',
      cta1: 'Explore Solutions',
      cta2: 'View Investment Plans'
    },
    dna: {
      badge: 'Strategic Technology Partner',
      title: 'Digital DNA Architecture',
      description: 'We fuse advanced software engineering with results-oriented design, building the digital foundations for elite business success.',
      pillars: [
        {
          id: 'velocity',
          label: 'PERFORMANCE',
          title: 'Vanguard Velocity',
          description: 'Next.js architecture ensuring instant load times to maximize user retention.'
        },
        {
          id: 'conversion',
          label: 'BUSINESS',
          title: 'Conversion by Design',
          description: 'SEO structures and user flows optimized to transform every visit into a strategic lead.'
        },
        {
          id: 'security',
          label: 'CLOUD',
          title: 'Elite Security',
          description: 'Cloud infrastructure with advanced encryption and enterprise-level data protection.'
        },
        {
          id: 'design',
          label: 'VANGUARD',
          title: 'Digital Identity',
          description: 'Next-generation UX/UI design that elevates your brand\'s perceived value and builds trust.'
        }
      ]
    },
    services: {
      badge: 'Sector Specialization',
      title: 'Vertical Solutions',
      description: 'We deploy specialized digital intelligence in key industries, ensuring every line of code is optimized for your market\'s unique demands.',
      explore: 'Explore Architecture',
      items: [
        { 
          id: 'RE', 
          title: 'Real Estate', 
          description: 'Advanced search engines and automated property matching systems.', 
          tag: 'HIGH_CONVERSION'
        },
        { 
          id: 'HC', 
          title: 'Clinics & Healthcare', 
          description: 'Patient management platforms with integrated scheduling and digital records.', 
          tag: 'SECURE_DATA'
        },
        { 
          id: 'EC', 
          title: 'Advanced E-Commerce', 
          description: 'Next-gen stores with real-time inventory and checkout optimization.', 
          tag: 'SCALABLE'
        },
        { 
          id: 'RS', 
          title: 'Restaurants & F&B', 
          description: 'Dynamic digital menus and booking management for high-traffic venues.', 
          tag: 'MOBILE_FIRST'
        },
        { 
          id: 'AC', 
          title: 'Academies & LMS', 
          description: 'Custom learning environments designed for modern distance education.', 
          tag: 'INTERACTIVE'
        },
        { 
          id: 'PS', 
          title: 'Professional Services', 
          description: 'Tailored administrative tools for law firms, accounting, and consulting.', 
          tag: 'EFFICIENCY'
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
      errorMessage: 'An error occurred. Please check your connection and try again.'
    }
  }
};
