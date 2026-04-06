# Prompt: ADN Digital — Diagnóstico Interactivo Ancastav

## Descripción del Proyecto

Crea una experiencia interactiva de diagnóstico digital llamada **"ADN Digital"** para Ancastav Digital Services. Es un formulario gamificado de 15 preguntas distribuidas en 5 módulos que analiza la situación digital de un negocio cliente y entrega un informe de puntuación con recomendaciones personalizadas vinculadas a los servicios de Ancastav.

---

## Identidad Visual — Ancastav.com

Replica fielmente la identidad visual de `ancastav.com`. **No uses estilos propios ni estéticas genéricas.**

### Paleta de colores
| Token | Valor | Uso |
|---|---|---|
| Azul primario | `#2563EB` | Botones CTA, acentos, barras de progreso, score |
| Navy oscuro | `#0D1B3E` | Headings principales, fondo de pantallas de contraste |
| Gris azulado (fondo) | `#F0F4FA` | Fondo general de todas las pantallas claras |
| Blanco | `#FFFFFF` | Fondo de cards y módulos |
| Gris texto secundario | `#4A5568` | Párrafos y descripciones |
| Gris muted / labels | `#8B9CB8` | Labels técnicos, textos terciarios |
| Gris borde | `#E2E8F0` / `#CBD5E8` | Bordes de cards, inputs, separadores |
| Azul hover | `#1D4ED8` | Hover de botón primario |
| Azul claro (resultado) | `#60A5FA` | Badge de nivel en fondo oscuro |
| Azul muy claro | `#EFF6FF` | Fondo de opción seleccionada |

### Tipografía
- **Display / Headings grandes:** `Inter` — peso 900, `text-transform: uppercase`, `letter-spacing: -1px`
- **Labels, botones, tags técnicos, monospace:** `Space Mono` — peso 400/700, `letter-spacing: 2px`, `text-transform: uppercase`
- **Cuerpo / párrafos:** `Inter` — peso 400–500, sin mayúsculas, `line-height: 1.7`

### Componentes de identidad
```
Pill / badge de estado:
  border: 1px solid #CBD5E8
  border-radius: 100px
  padding: 5px 14px
  font: Space Mono 10px, letter-spacing 2px, uppercase
  punto azul (#2563EB) de 7px a la izquierda

Botón primario:
  background: #2563EB | color: #fff
  font: Space Mono bold, 11px, uppercase, letter-spacing 2px
  border-radius: 4px | padding: 13px 32px

Botón outline / secundario:
  background: transparent | border: 1.5px solid #CBD5E8
  color: #0D1B3E | misma fuente que primario

Cards:
  background: #fff | border: 1px solid #E2E8F0
  border-radius: 8px | padding: 2rem

Labels técnicos (estilo terminal):
  font: Space Mono 9–10px | color: #8B9CB8
  formato: CLAVE_SISTEMA // VALOR_ACENTO
  el valor acento usa color: #2563EB
```

### Lenguaje / Tono de sistema
Usa nomenclatura técnica tipo terminal, igual que en el sitio:
- `DIAGNÓSTICO_LAB // ADN_DIGITAL`
- `PRESENCIA_WEB`, `REDES_SOCIALES`, `REPUTACION_ONLINE`, `VENTAS_DIGITAL`, `AUTOMATIZACION`
- `MÓDULO_01`, `MÓDULO_02`...
- `NIVEL_INICIAL`, `NIVEL_INTERMEDIO`, `NIVEL_AVANZADO`
- `SYSTEM_STATUS // ACTIVE`
- `GEOPOSITION // CARIBBEAN // DO`
- `LAB_VERSION // 2026`
- `DIAGNÓSTICO_COMPLETADO // OK`
- `ANCASTAV.COM // 2026`

---

## Estructura de la Experiencia — 4 Pantallas

### Pantalla 1: Bienvenida
- Logo / badge pill: `● DIAGNOSTICO_LAB // ADN DIGITAL`
- Headline en 3 líneas, tipografía display bold, uppercase:
  - Línea 1 `TU NEGOCIO.` — color navy `#0D1B3E`
  - Línea 2 `TU DIAGNÓSTICO.` — color azul `#2563EB`
  - Línea 3 `TU CRECIMIENTO.` — color gris `#8B9CB8`
- Subtítulo: "En 3 minutos sabrás exactamente dónde está parado tu negocio digitalmente — y qué necesitas para avanzar al siguiente nivel."
- Dos botones: `INICIAR DIAGNÓSTICO` (primario) y `VER SERVICIOS` (outline)
- Estadísticas: **5 Módulos · 15 Preguntas · 3 min**
- Barra de sistema al pie: `SYSTEM_STATUS // ACTIVE · GEOPOSITION // CARIBBEAN // DO · LAB_VERSION // 2026`

### Pantalla 2: Quiz (15 preguntas)
- Header persistente con:
  - Label del módulo activo: `MÓDULO_01` en azul
  - Contador: `01 / 15` en gris mono
  - Barra de progreso delgada (3px) azul `#2563EB`
- Card blanca por pregunta con:
  - Tag del módulo en Space Mono gris arriba (ej. `PRESENCIA_WEB`)
  - Pregunta en Inter bold 18px navy
  - Opciones de respuesta tipo botón: fondo `#F8FAFC`, borde gris, hover en azul claro
  - Letra de opción (A, B, C, D) en cajita Space Mono — se rellena de azul al seleccionar
- Navegación: `← ATRÁS` (outline) y `SIGUIENTE →` (primario)
- El botón siguiente se activa solo al seleccionar una opción

**Los 5 módulos y sus preguntas:**

#### MÓDULO_01 — PRESENCIA_WEB (3 preguntas)
1. ¿Tu negocio tiene página web activa?
   - A) Sí, actualizada y funcional (4 pts)
   - B) Sí, pero está desactualizada (2 pts)
   - C) Solo estamos en redes sociales (1 pt)
   - D) No tenemos presencia digital (0 pts)

2. ¿Tu negocio aparece en Google Maps / Google My Business?
   - A) Sí, con fotos y reseñas actualizadas (4 pts)
   - B) Sí, pero sin mucha información (2 pts)
   - C) No, nunca lo hemos configurado (0 pts)

3. ¿Cómo se ve tu sitio web en celular?
   - A) Perfecta, diseño mobile-first (4 pts)
   - B) Se ve, pero no es ideal (2 pts)
   - C) No sé / no tenemos web (0 pts)

#### MÓDULO_02 — REDES_SOCIALES (3 preguntas)
4. ¿Con qué frecuencia publicas en redes sociales?
   - A) Todos los días o varias veces por semana (4 pts)
   - B) De vez en cuando, sin plan fijo (2 pts)
   - C) Muy rara vez o nunca (0 pts)

5. ¿Usas publicidad pagada en redes sociales (Meta Ads, etc.)?
   - A) Sí, con estrategia y seguimiento de resultados (4 pts)
   - B) Hemos hecho algo pero sin medir resultados (2 pts)
   - C) No hemos invertido en publicidad digital (0 pts)

6. ¿Produces contenido en video (Reels, TikTok, YouTube)?
   - A) Sí, regularmente con buen resultado (4 pts)
   - B) Alguna vez, pero no es constante (2 pts)
   - C) No producimos video (0 pts)

#### MÓDULO_03 — REPUTACION_ONLINE (3 preguntas)
7. ¿Cuántas reseñas tiene tu negocio en Google?
   - A) Más de 20 reseñas positivas (4 pts)
   - B) Entre 5 y 20 (2 pts)
   - C) Menos de 5 o ninguna (0 pts)

8. ¿Respondes los comentarios y mensajes de clientes en línea?
   - A) Siempre, rápido y con estrategia definida (4 pts)
   - B) A veces, cuando hay tiempo (2 pts)
   - C) No tenemos un proceso para esto (0 pts)

9. ¿Aparece tu negocio cuando alguien busca tu servicio en Google?
   - A) Sí, en las primeras posiciones (4 pts)
   - B) Aparece pero en páginas secundarias (2 pts)
   - C) No aparecemos / no lo hemos revisado (0 pts)

#### MÓDULO_04 — VENTAS_DIGITAL (3 preguntas)
10. ¿Cómo reciben pedidos o citas tus clientes?
    - A) Sistema automático (web, app, WhatsApp Bot) (4 pts)
    - B) Por WhatsApp o llamada directa (2 pts)
    - C) Solo en persona o sin proceso definido (0 pts)

11. ¿Vendes o cobras de forma digital?
    - A) Sí, con pasarela de pagos integrada (4 pts)
    - B) Transferencias por WhatsApp o email (2 pts)
    - C) Solo efectivo / no vendemos online (0 pts)

12. ¿Mides cuántos clientes vienen de cada canal digital?
    - A) Sí, tenemos métricas y reportes activos (4 pts)
    - B) Lo estimamos pero sin medir formalmente (2 pts)
    - C) No medimos esto (0 pts)

#### MÓDULO_05 — AUTOMATIZACION (3 preguntas)
13. ¿Usas alguna herramienta de automatización o CRM?
    - A) Sí, CRM o sistema integrado activo (4 pts)
    - B) Hojas de cálculo o herramientas básicas (2 pts)
    - C) Todo se maneja de forma manual (0 pts)

14. ¿Tienes email marketing o envíos automáticos a clientes?
    - A) Sí, secuencias y campañas activas (4 pts)
    - B) Enviamos mensajes pero sin automatizar (2 pts)
    - C) No tenemos estrategia de email/mensajería (0 pts)

15. ¿Tu negocio tiene WhatsApp Business con respuestas automáticas?
    - A) Sí, con catálogo y flujos configurados (4 pts)
    - B) Tenemos WhatsApp Business básico (2 pts)
    - C) Solo WhatsApp personal o no usamos (0 pts)

### Pantalla 3: Análisis (animación de escaneo)
- Fondo navy `#0D1B3E`
- Título: `Analizando tu ADN Digital` con "ADN" en azul
- Subtítulo mono: `PROCESANDO ARQUITECTURA DE DATOS`
- Barra de progreso lineal (3px, 3.5s de animación) de 0% a 100%
- 5 pasos que aparecen secuencialmente (700ms entre cada uno):
  - `PRESENCIA_WEB // evaluando nodos...`
  - `REDES_SOCIALES // analizando señales...`
  - `REPUTACION_ONLINE // escaneando...`
  - `VENTAS_DIGITAL // calculando potencial...`
  - `AUTOMATIZACION // generando informe...`
- Transición automática al resultado a los 4.8 segundos

### Pantalla 4: Resultado
- **Hero card navy** con:
  - Tag: `ADN_DIGITAL // INFORME_COMPLETO`
  - Score grande animado (contador de 0 al puntaje) en azul `#2563EB`, 70px
  - Texto: `/ 100 PUNTOS` en Space Mono gris
  - Badge de nivel según puntuación:
    - **80–100 pts:** `NIVEL_AVANZADO` → "Presencia Digital Sólida"
    - **50–79 pts:** `NIVEL_INTERMEDIO` → "En Camino al Crecimiento"
    - **0–49 pts:** `NIVEL_INICIAL` → "Alto Potencial por Desarrollar"
  - Descripción de 2 líneas según el nivel

- **Grid 2×2 de módulos:** card blanca por módulo con nombre en Space Mono, porcentaje y barra de color azul animada

- **Recomendaciones estratégicas:** hasta 3 cards con borde izquierdo azul `#2563EB`, mostrando los módulos con menos del 60% de puntuación:
  - Presencia Web < 60% → "Diseño Web Profesional"
  - Redes Sociales < 60% → "Estrategia en Redes Sociales"
  - Reputación < 60% → "Gestión de Reputación Online"
  - Ventas < 60% → "Canal de Ventas Digital"
  - Automatización < 60% → "Automatización de Procesos"

- **CTA block en azul `#2563EB`:**
  - Título: "¿Listo para transformar tu presencia digital?"
  - Botón blanco: `VER SOLUCIONES →`
  - Botón ghost: `NUEVO DIAGNÓSTICO`

- Barra de sistema al pie: `DIAGNOSTICO_COMPLETADO // OK · ANCASTAV.COM // 2026`

---

## Sistema de Puntuación

```
Puntuación por módulo:
  earned = suma de puntos de las respuestas seleccionadas
  max    = suma de puntos máximos posibles del módulo
  pct    = Math.round(earned / max * 100)

Puntuación total:
  total_earned = suma de todos los módulos
  total_max    = suma de todos los máximos (60 pts)
  score_final  = Math.round(total_earned / total_max * 100)
```

---

## Especificaciones Técnicas

- **HTML + CSS + JS vanilla** en un solo archivo
- Fuentes: Google Fonts — `Inter` (wght 300–900) + `Space Mono` (wght 400;700)
- Sin librerías externas, sin dependencias
- Las 4 pantallas coexisten en el DOM; se muestran/ocultan con clase `.active`
- Animación de entrada: `fadeUp` (opacity 0→1, translateY 8px→0, 300ms ease)
- La barra de progreso del quiz transiciona con `cubic-bezier(.4,0,.2,1)` en 500ms
- Las barras de módulo en el resultado se animan con delay escalonado (300ms + i×80ms)
- El score se anima con `setInterval` incrementando de 2 en 2 cada 22ms
- El botón "Siguiente" permanece `disabled` hasta que se seleccione una opción
- Puntuación por módulo calculada dinámicamente al mostrar resultados
- `restart()`: resetea índice y respuestas, vuelve a pantalla de bienvenida

---

## Notas de UX

- El cliente nunca ve puntuaciones durante el quiz — solo elige la opción que mejor describe su situación
- Las opciones están redactadas en lenguaje cotidiano, no técnico
- El lenguaje de sistema (Space Mono, labels técnicos) crea la sensación de un diagnóstico profesional sin intimidar
- La pantalla de escaneo genera expectativa y percepción de análisis real
- Las recomendaciones conectan directamente con los servicios de Ancastav (web, redes, reputación, e-commerce, automatización)
