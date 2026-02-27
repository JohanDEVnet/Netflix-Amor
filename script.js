// ===================================================================
//  SPECTRUM CONFIG — colores del spectrum clásico de Netflix
//  14 barras, entran de izquierda a derecha, una por una
// ===================================================================
const BARS = [
    '#00244D', '#0960AD', '#3081C0',
    '#E50914', '#FAA916', '#FDD06F',
    '#E50914', '#C21021', '#E50914',
    '#4B3F72', '#8168CA',
    '#E50914', '#0960AD', '#00244D'
];

const BAR_STAGGER_MS = 55;   // ms entre cada barra (aparición secuencial)
const BAR_GROW_MS = 220;  // duración del crecimiento de cada barra
const SPECTRUM_START = 1300; // ms desde el inicio — sincronizado con el zoom de la N
const HOLD_MS = 400;  // tiempo que permanece el spectrum visible
const FADE_MS = 400;  // duración del fade-out del spectrum

// ===================================================================
//  CONSTRUCT SPECTRUM — genera barras y las anima una a una
// ===================================================================
function buildAndAnimateSpectrum() {
    const container = document.getElementById('spectrum');
    container.style.display = 'flex';
    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.zIndex = '5';

    const bars = [];

    BARS.forEach((color, i) => {
        const bar = document.createElement('div');
        bar.style.cssText = `
            flex: 1;
            height: 100%;
            background: ${color};
            transform: scaleY(0);
            transform-origin: top center;
            transition: transform ${BAR_GROW_MS}ms cubic-bezier(0.16, 1, 0.3, 1);
        `;
        container.appendChild(bar);
        bars.push(bar);
    });

    // Fase 1: Cada barra aparece de arriba abajo con stagger
    bars.forEach((bar, i) => {
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
        }, SPECTRUM_START + i * BAR_STAGGER_MS);
    });

    // Fase 2: Cuando la última barra terminó de crecer → mantener → fade-out
    const lastBarDone = SPECTRUM_START + (BARS.length - 1) * BAR_STAGGER_MS + BAR_GROW_MS;
    const fadeStart = lastBarDone + HOLD_MS;

    setTimeout(() => {
        bars.forEach(bar => {
            bar.style.transition = `opacity ${FADE_MS}ms ease-in`;
            bar.style.opacity = '0';
        });
        // Ocultar el contenedor al terminar el fade
        setTimeout(() => { container.style.display = 'none'; }, FADE_MS + 50);
    }, fadeStart);

    // Devolver el tiempo en que todo termina para calcular cuándo revelar la app
    return fadeStart + FADE_MS;
}

// ===================================================================
//  INTRO ORCHESTRATION
// ===================================================================
function runIntro() {
    const spectrumDone = buildAndAnimateSpectrum();

    const intro = document.getElementById('intro');
    const app = document.getElementById('app');

    // Esperar a que el spectrum termine + 150ms de margen
    setTimeout(() => {
        intro.classList.add('out');          // CSS: opacity → 0, transition 0.8s
        setTimeout(() => {
            intro.style.display = 'none';
            app.classList.add('app-visible');
            initApp();
        }, 820);
    }, spectrumDone + 150);
}

// ===================================================================
//  PAGE INTERACTIONS
// ===================================================================
function initApp() {

    // ── Modal de episodio ────────────────────────────────────
    const modal = document.getElementById('modal');
    const mNum = document.getElementById('modal-num');
    const mTitle = document.getElementById('modal-title');
    const mDur = document.getElementById('modal-dur');
    const mDesc = document.getElementById('modal-desc');
    const mClose = document.getElementById('modal-close');

    document.querySelectorAll('.ep-card').forEach(card => {
        card.addEventListener('click', () => {
            mNum.textContent = card.dataset.num;
            mTitle.textContent = card.dataset.title;
            mDur.textContent = card.dataset.duration;
            mDesc.textContent = card.dataset.desc;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };
    mClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // ── Barras de Pilares con IntersectionObserver ────────────
    const pillarBars = document.querySelectorAll('.pillar-bar');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.target + '%';
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    pillarBars.forEach(b => io.observe(b));
}

// ===================================================================
//  BOOT
// ===================================================================
document.addEventListener('DOMContentLoaded', runIntro);