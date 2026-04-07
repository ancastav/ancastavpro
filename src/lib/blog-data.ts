import { Language } from './translations';

export interface BlogPost {
  id: string;
  slug: string;
  date: string;
  category: {
    es: string;
    en: string;
  };
  title: {
    es: string;
    en: string;
  };
  excerpt: {
    es: string;
    en: string;
  };
  content: {
    es: string;
    en: string;
  };
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'agentes-ia-automatizacion-2026',
    date: '2026-04-06',
    category: {
      es: 'INTELIGENCIA ARTIFICIAL',
      en: 'ARTIFICIAL INTELLIGENCE'
    },
    title: {
      es: 'La Era de los Agentes: Más allá de los Chatbots',
      en: 'The Era of Agents: Beyond Chatbots'
    },
    excerpt: {
      es: 'Cómo la IA agéntica está transformando la operatividad de los negocios modernos, pasando de simples respuestas a ejecuciones complejas.',
      en: 'How agentic AI is transforming modern business operations, moving from simple responses to complex executions.'
    },
    content: {
      es: `
        <p>Estamos presenciando un cambio de paradigma. La Inteligencia Artificial ya no solo responde preguntas; ahora <strong>ejecuta tareas</strong>. Los agentes autónomos son la próxima frontera de la eficiencia empresarial.</p>
        <h2>¿Qué es un Agente de IA?</h2>
        <p>A diferencia de un chatbot tradicional que espera un prompt, un agente tiene un objetivo. Utiliza herramientas, accede a bases de datos y toma decisiones secuenciales para completar una misión de negocio.</p>
        <blockquote>"La automatización ya no es un lujo, es la infraestructura base de cualquier negocio que quiera sobrevivir en 2026."</blockquote>
        <p>En Ancastav, estamos integrando estos nodos de inteligencia directamente en la arquitectura de nuestros clientes, permitiendo que sus sistemas 'piensen' y actúen proactivamente.</p>
      `,
      en: `
        <p>We are witnessing a paradigm shift. Artificial Intelligence no longer just answers questions; it now <strong>executes tasks</strong>. Autonomous agents are the next frontier of business efficiency.</p>
        <h2>What is an AI Agent?</h2>
        <p>Unlike a traditional chatbot that waits for a prompt, an agent has a goal. It uses tools, accesses databases, and makes sequential decisions to complete a business mission.</p>
        <blockquote>"Automation is no longer a luxury; it is the base infrastructure of any business that wants to survive in 2026."</blockquote>
        <p>At Ancastav, we are integrating these intelligence nodes directly into our clients' architecture, allowing their systems to 'think' and act proactively.</p>
      `
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    readTime: '5 min'
  },
  {
    id: '2',
    slug: 'nextjs-16-rendimiento-extremo',
    date: '2026-04-01',
    category: {
      es: 'DESARROLLO // PERFORMANCE',
      en: 'DEVELOPMENT // PERFORMANCE'
    },
    title: {
      es: 'Next.js 16: El Futuro de la Web ya es Presente',
      en: 'Next.js 16: The Future of the Web is Here'
    },
    excerpt: {
      es: 'Analizamos las nuevas capacidades de renderizado y optimización que permiten a Ancastav entregar experiencias de usuario instantáneas.',
      en: 'We analyze the new rendering and optimization capabilities that allow Ancastav to deliver instant user experiences.'
    },
    content: {
      es: `
        <p>La velocidad no es solo una métrica técnica; es una métrica de negocio. Un segundo de retraso puede significar la pérdida de miles de dólares en conversiones.</p>
        <h2>Turbopack y el Futuro de la Compilación</h2>
        <p>Con la llegada de Next.js 16, la velocidad de desarrollo y despliegue ha alcanzado niveles sin precedentes. La arquitectura base de Ancastav aprovecha cada milisegundo mediante el uso intensivo de Server Components y Streaming.</p>
        <p>Nuestros laboratorios de diagnóstico confirman que una web optimizada con estas tecnologías retiene un 40% más de tráfico que las infraestructuras tradicionales.</p>
      `,
      en: `
        <p>Speed is not just a technical metric; it is a business metric. A second of delay can mean the loss of thousands of dollars in conversions.</p>
        <h2>Turbopack and the Future of Compilation</h2>
        <p>With the arrival of Next.js 16, the speed of development and deployment has reached unprecedented levels. Ancastav's base architecture leverages every millisecond through the intensive use of Server Components and Streaming.</p>
        <p>Our diagnostic labs confirm that a website optimized with these technologies retains 40% more traffic than traditional infrastructures.</p>
      `
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    readTime: '4 min'
  },
  {
    id: '3',
    slug: 'seguridad-digital-elite-2026',
    date: '2026-03-25',
    category: {
      es: 'CIBERSEGURIDAD',
      en: 'CYBERSECURITY'
    },
    title: {
      es: 'Protocolos de Seguridad de Élite para Negocios',
      en: 'Elite Security Protocols for Business'
    },
    excerpt: {
      es: 'En un mundo de amenazas constantes, proteger el ADN digital de tu empresa es la prioridad estratégica número uno.',
      en: 'In a world of constant threats, protecting your company\'s digital DNA is the number one strategic priority.'
    },
    content: {
      es: `
        <p>La ciberseguridad ya no puede ser reactiva. Debe estar integrada en el corazón mismo del código. En Ancastav, implementamos capas de protección redundantes.</p>
        <h2>Arquitectura Zero Trust</h2>
        <p>Ya no confiamos en "perímetros". Cada petición, cada usuario y cada byte de información es verificado en tiempo real mediante protocolos de encriptación de grado militar.</p>
        <p>Desde la protección contra ataques DDoS hasta la seguridad de bases de datos distribuidas, nuestra visión es clara: Tu información es tu activo más valioso.</p>
      `,
      en: `
        <p>Cybersecurity can no longer be reactive. It must be integrated into the very heart of the code. At Ancastav, we implement redundant protection layers.</p>
        <h2>Zero Trust Architecture</h2>
        <p>We no longer rely on "perimeters." Every request, every user, and every byte of information is verified in real-time through military-grade encryption protocols.</p>
        <p>From DDoS attack protection to distributed database security, our vision is clear: Your information is your most valuable asset.</p>
      `
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
    readTime: '6 min'
  }
];
