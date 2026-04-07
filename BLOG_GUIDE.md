# Guía de Publicación: Vanguard Insights (Ancastav Tech Blog)

Este manual te explica paso a paso cómo gestionar el contenido de tu nuevo blog tecnológico.

---

## ⚡ Fase 1: Publicación Manual (Actual)

Actualmente, el blog utiliza un sistema de datos centralizado. Es la forma más rápida y performante de tener artículos en línea de inmediato.

### ¿Dónde se edita?
El archivo principal es: `src/lib/blog-data.ts`.

### Estructura de un Artículo:
Solo tienes que añadir un nuevo bloque al array `blogPosts` siguiendo esta plantilla:

```typescript
{
  id: 'unique-id',
  slug: 'nombre-del-url', // Ejemplo: 'ia-generativa-2026'
  date: '2026-04-06',
  category: {
    es: 'CATEGORÍA EN ESPAÑOL',
    en: 'CATEGORY IN ENGLISH'
  },
  title: {
    es: 'Título de Impacto',
    en: 'High-Impact Title'
  },
  excerpt: {
    es: 'Resumen corto para la tarjeta...',
    en: 'Short summary for the card...'
  },
  content: {
    es: '<p>Contenido detallado en HTML...</p>',
    en: '<p>Detailed content in HTML...</p>'
  },
  image: 'URL_DE_IMAGEN_UNSPLASH_O_LOCAL',
  readTime: '5 min'
}
```

> [!TIP]
> **No te preocupes por el código:** Si tú me escribes el texto por aquí, yo mismo puedo formatearlo y subirlo por ti en segundos.

---

## 💎 Fase 2: Elite CMS Dashboard (Próximamente)

Estamos construyendo un **Panel Administrativo** privado (`/admin/blog`).

### ¿Cómo funcionará?
1.  Encontrarás un editor visual (lo que escribas se verá tal cual en el blog).
2.  Podrás arrastrar y soltar imágenes.
3.  Tendrás un botón de **Publicar** que actualizará el blog automáticamente.

> [!IMPORTANT]
> Todo se mantiene en **Local** hasta que me des la orden de actualizar Vercel.
