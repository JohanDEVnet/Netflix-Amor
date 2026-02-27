# Netflix-Amor

Una página web que recrea la experiencia visual de Netflix, pero con un propósito diferente: una declaración de amor para tu pareja. Sin librerías, sin frameworks. Solo HTML, CSS y JavaScript puro.

---

## Vista previa

La página arranca con la animación del logo "N" y el espectro de colores, exactamente como el intro de Netflix. Al terminar, aparece el contenido principal con imagen de fondo, carrusel de episodios y una sección de pilares.

---

## ¿Qué incluye?

**Intro animada**
- El logo SVG se construye en tres partes (barra izquierda, diagonal, barra derecha) con animación `scaleY` secuencial
- 14 barras de colores aparecen una por una de izquierda a derecha — no todas juntas
- Todo el timing está calculado en milisegundos para que coincida con el zoom de la N

**Página principal**
- Hero con imagen de fondo, overlay gradiente y texto con badge de estado pulsante
- Carrusel de episodios cinemático: imagen completa, overlay oscuro, nombre y número del episodio, botón play que aparece en hover
- Modal que se abre al hacer clic en cada episodio con la descripción completa
- Sección "Pilares de Nosotros" con 4 tarjetas (iconos SVG de línea, barra de progreso animada con IntersectionObserver)
- Cita central a ancho completo
- Footer con crédito del desarrollador y link a GitHub

---

## Tecnologías

- **HTML5** — estructura semántica
- **CSS3** — animaciones con `@keyframes`, Flexbox, Grid, `backdrop-filter`
- **JavaScript (Vanilla)** — orquestación del intro, modal, `IntersectionObserver`
- **Google Fonts** — Inter (300–900)
- **Unsplash** — imágenes de temática romántica

Sin frameworks. Sin dependencias. Sin `npm install`.

---

## Cómo usar

```bash
git clone https://github.com/JohanDEVnet/Netflix-Amor.git
cd Netflix-Amor
```

Abre `index.html` en el navegador. Si usas VS Code, puedes usar Live Server para evitar problemas con imágenes de Unsplash.

---

## Estructura

```
Netflix-Amor/
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## Timeline del intro

```
0.00s  → pantalla negra
0.05s  → barra izquierda de la N sube
0.10s  → diagonal aparece
0.22s  → barra derecha baja
0.50s  → N completa con glow rojo
1.30s  → N hace zoom (scale 1 → 28) y el espectro arranca
1.30s–2.06s → 14 barras de color aparecen una por una (55ms de stagger)
2.50s  → barras se desvanecen
3.05s  → fade out del intro
3.87s  → página principal visible
```

---

## Episodios

| # | Título | Descripción corta |
|---|--------|-------------------|
| E1 | El inicio consciente | Cuando decidimos que esto no sería casual |
| E2 | Lo que admiro de ti | No la perfección, sino quien eres de verdad |
| E3 | Lo que estamos construyendo | Comunicación, respeto, espacio seguro |
| E4 | El futuro que elegimos | Un futuro construido día a día, sin promesas vacías |

---

## Colores del espectro

| Posición | Color |
|----------|-------|
| Extremos | `#00244D` azul oscuro |
| Internos | `#0960AD` / `#3081C0` azul |
| Central | `#E50914` rojo, `#C21021` rojo oscuro |
| Acento | `#FAA916` naranja, `#FDD06F` dorado |
| Morado | `#4B3F72` / `#8168CA` |

---

## Autor

Hecho por **JohanDEVnet**

[![GitHub](https://img.shields.io/badge/GitHub-JohanDEVnet-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/JohanDEVnet)

---

© 2026 JohanDEVnet
