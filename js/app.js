/* Loader */
window.onload = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 0);
    }
}

/* Menu Mobile */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

/* Hero Slider */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.hero-arrow.right');
const prevBtn = document.querySelector('.hero-arrow.left');
const hero = document.querySelector('.hero-slider');

let current = 0;
let interval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    current = index;
}

function nextSlide() {
    showSlide((current + 1) % slides.length);
}

function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
}

if (slides.length > 1 && nextBtn && prevBtn) {

    function startSlider() {
        interval = setInterval(nextSlide, 4000);
    }

    function resetSlider() {
        clearInterval(interval);
        startSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlider();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlider();
        });
    });

    startSlider();

    /* SWIPE MOBILE */
    if (hero) {
        let startX = 0;

        hero.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });

        hero.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
            }
        });
    }
}

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* Header show*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }
});

/* Aplicações Slider */
const appSlides = document.querySelectorAll('.application-slide');
const appNext = document.querySelector('.app-arrow.right');
const appPrev = document.querySelector('.app-arrow.left');

let appIndex = 0;

if (appSlides.length > 0 && appNext && appPrev) {

    function showAppSlide(index) {
        appSlides.forEach(slide => slide.classList.remove('active'));
        appSlides[index].classList.add('active');
    }

    appNext.addEventListener('click', () => {
        appIndex = (appIndex + 1) % appSlides.length;
        showAppSlide(appIndex);
    });

    appPrev.addEventListener('click', () => {
        appIndex = (appIndex - 1 + appSlides.length) % appSlides.length;
        showAppSlide(appIndex);
    });
}


document.querySelectorAll('.gallery-card, .service-card').forEach(card => {
    const images = card.querySelectorAll('.gallery-images img');
    const dots = card.querySelectorAll('.gallery-dots .dot');
    const prevBtn = card.querySelector('.product-arrow.left');
    const nextBtn = card.querySelector('.product-arrow.right');
    let index = 0;
    let autoTimer = null;

    function showImage(i) {
        // Remove active de todas as imagens
        images.forEach(img => img.classList.remove('active'));
        
        // Remove active de todos os dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona active na nova com delay para trigger animation
        setTimeout(() => {
            images[i].classList.add('active');
            if (dots[i]) dots[i].classList.add('active');
        }, 50);
        
        index = i;
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoTimer = setInterval(() => {
            showImage((index + 1) % images.length);
        }, 3000);
    }

    function stopAutoPlay() {
        if (autoTimer) clearInterval(autoTimer);
    }

    // Se houver apenas 1 imagem, esconde as setas e não inicia autoplay
    if (images.length === 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    if (prevBtn && nextBtn && images.length > 0) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (index - 1 + images.length) % images.length;
            showImage(prevIndex);
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            const nextIndex = (index + 1) % images.length;
            showImage(nextIndex);
            startAutoPlay();
        });

        // Adicionar listeners aos dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showImage(i);
                startAutoPlay();
            });
            dot.style.cursor = 'pointer';
        });

        // Iniciar autoplay
        startAutoPlay();
    }
});
document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.getElementById('image-zoom-overlay');
    if (!overlay) return;

    const zoomImg = overlay.querySelector('#zoom-image');
    const dotsContainer = overlay.querySelector('#zoom-dots');
    const closeBtn = overlay.querySelector('.zoom-close');
    const prevBtn = overlay.querySelector('.zoom-arrow.left');
    const nextBtn = overlay.querySelector('.zoom-arrow.right');

    let images = [];
    let index = 0;
    let scale = 1;

    /* Abrir Zoom */

    document.querySelectorAll(
        '.gallery-images img, .product-images img, .gallery-track img'
    ).forEach(img => {

        img.style.cursor = 'zoom-in';

        img.addEventListener('click', () => {

            const gallery =
                img.closest('.gallery-images') ||
                img.closest('.product-images') ||
                img.closest('.gallery-track');

            if (!gallery) return;

            images = [...gallery.querySelectorAll('img')];
            index = images.indexOf(img);

            openZoom();
        });
    });

    function openZoom() {
        scale = 1;
        zoomImg.classList.remove('show');
        zoomImg.style.transform = 'scale(1)';
        zoomImg.src = images[index].src;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => zoomImg.classList.add('show'), 50);

        renderDots();
    }

    function closeZoom() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* Eventos */

    closeBtn.addEventListener('click', closeZoom);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeZoom();
    });

    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    function changeImage(dir) {
        zoomImg.classList.remove('show');

        setTimeout(() => {
            index = (index + dir + images.length) % images.length;
            zoomImg.src = images[index].src;
            zoomImg.style.transform = 'scale(1)';
            scale = 1;

            zoomImg.classList.add('show');
            renderDots();
        }, 150);
    }

    /* ZOOM COM SCROLL */
    overlay.addEventListener('wheel', e => {
        e.preventDefault();
        scale += e.deltaY * -0.001;
        scale = Math.min(Math.max(1, scale), 3);
        zoomImg.style.transform = `scale(${scale})`;
    });

    /* DOTS */
    function renderDots() {
        dotsContainer.innerHTML = '';

        images.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === index) dot.classList.add('active');

            dot.addEventListener('click', () => {
                index = i;
                zoomImg.src = images[i].src;
                scale = 1;
                zoomImg.style.transform = 'scale(1)';
                renderDots();
            });

            dotsContainer.appendChild(dot);
        });
    }

    /* TECLADO */
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') closeZoom();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    });

});


/* Slider Serviços */

document.querySelectorAll('.service-slider').forEach(slider => {
    const images = slider.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }, 3500);
});

/* Galeria padão serviços (sem zoom) */

document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-track img');
    const dots = gallery.querySelectorAll('.dot');
    const prev = gallery.querySelector('.gallery-arrow.left');
    const next = gallery.querySelector('.gallery-arrow.right');

    let index = 0;

    function showSlide(i) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        images[i].classList.add('active');
        dots[i].classList.add('active');
        index = i;
    }

    next.addEventListener('click', () => {
        showSlide((index + 1) % images.length);
    });

    prev.addEventListener('click', () => {
        showSlide((index - 1 + images.length) % images.length);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
});

/* Prodcuts Sliders */

const productSliders = {
    weld: {
        index: 0,
        images: document.querySelectorAll('.product-box:nth-child(1) .product-images img'),
        dots: document.getElementById('dots-weld'),
        timer: null,
        isAnimating: false
    },
    bolt: {
        index: 0,
        images: document.querySelectorAll('.product-box:nth-child(2) .product-images img'),
        dots: document.getElementById('dots-bolt'),
        timer: null,
        isAnimating: false
    }
};

function updateDots(type) {
    const slider = productSliders[type];
    if (!slider || !slider.dots) return;

    slider.dots.innerHTML = '';

    slider.images.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === slider.index) dot.classList.add('active');
        dot.onclick = () => {
            if (i === slider.index) return;
            // anima para o índice clicado: escolher direção baseado em posição
            const dir = i > slider.index ? 1 : -1;
            animateSlide(type, dir, true, i);
        };
        slider.dots.appendChild(dot);
    });
}

/**
 * animateSlide(type, dir, userTriggered = true, forcedIndex = undefined)
 * - type: 'weld' | 'bolt'
 * - dir: 1 para next, -1 para prev
 * - userTriggered: se true, reinicia timer (chamado por clique)
 * - forcedIndex: se informado, anima diretamente para esse índice (útil para dots)
 */
function animateSlide(type, dir, userTriggered = true, forcedIndex = undefined) {
    const slider = productSliders[type];
    if (!slider || slider.images.length === 0) return;
    if (slider.isAnimating) return; // evita reentrância

    const imgs = slider.images;
    const currentIndex = slider.index;
    const targetIndex = (typeof forcedIndex === 'number')
        ? forcedIndex
        : (currentIndex + dir + imgs.length) % imgs.length;

    if (targetIndex === currentIndex) return;

    const currentImg = imgs[currentIndex];
    const nextImg = imgs[targetIndex];

    slider.isAnimating = true;

    // LIMPA estilos / classes previstos 
    imgs.forEach(img => {
        img.classList.remove('active');
        // limpa estilos inline que possam existir
        img.style.transition = '';
        img.style.transform = '';
        img.style.opacity = '';
        img.style.zIndex = '';
    });

    // PREPARA próxima imagem (posição inicial fora da tela)
    // Sem transition para posicionar instantaneamente
    nextImg.style.transition = 'none';
    nextImg.style.transform = `translateX(${dir === 1 ? '100%' : '-100%'})`;
    nextImg.style.opacity = '1';
    nextImg.style.zIndex = '3';
    // torna visível (classe active) antes da animação para evitar "piscar"
    nextImg.classList.add('active');

    // força reflow para garantir que o browser registre a posição inicial
    // eslint-disable-next-line no-unused-expressions
    nextImg.offsetWidth;

    // Aplica transições suavemente
    const trans = 'transform 0.5s ease, opacity 0.5s ease';
    nextImg.style.transition = trans;
    currentImg.style.transition = trans;
    currentImg.style.zIndex = '2';

    // anima saída da atual e entrada da próxima
    currentImg.style.transform = `translateX(${dir === 1 ? '-100%' : '100%'})`;
    currentImg.style.opacity = '0';
    nextImg.style.transform = 'translateX(0)';

    // cleanup quando terminar a transição (ou fallback)
    const cleanup = () => {
        // remove classe active da antiga e limpa estilos inline
        currentImg.classList.remove('active');
        currentImg.style.transition = '';
        currentImg.style.transform = '';
        currentImg.style.opacity = '';
        currentImg.style.zIndex = '';

        // garante que a próxima fique limpa (apenas marcada como active)
        nextImg.style.transition = '';
        nextImg.style.transform = '';
        nextImg.style.opacity = '';
        nextImg.style.zIndex = '';

        slider.index = targetIndex;
        slider.isAnimating = false;
        updateDots(type);
    };

    // ouvir transitionend na imagem atual (a que sai)
    const onEnd = (e) => {
        if (e.target !== currentImg) return;
        currentImg.removeEventListener('transitionend', onEnd);
        cleanup();
    };

    currentImg.addEventListener('transitionend', onEnd);

    // fallback caso transitionend não dispare
    setTimeout(() => {
        if (slider.isAnimating) {
            currentImg.removeEventListener('transitionend', onEnd);
            cleanup();
        }
    }, 700);

    // se usuário clicou, reinicia o autoplay
    if (userTriggered) resetAuto(type);
}

function changeSlide(type, dir) {
    // chamada usada pelo onclick nas setas -> tratar como ação de usuário
    animateSlide(type, dir, true);
}

/* AUTOPLAY (3s sem interação avança 1 slide) */
function startAuto(type) {
    const slider = productSliders[type];
    if (!slider) return;
    stopAuto(type);
    slider.timer = setTimeout(() => {
        animateSlide(type, 1, false);
        // após avançar automaticamente, reinicia novo timeout
        startAuto(type);
    }, 3000);
}

function stopAuto(type) {
    const slider = productSliders[type];
    if (!slider) return;
    if (slider.timer) {
        clearTimeout(slider.timer);
        slider.timer = null;
    }
}

function resetAuto(type) {
    stopAuto(type);
    startAuto(type);
}

/* INICIALIZA: dots + autoplay (começa para cada slider) */
updateDots('weld');
updateDots('bolt');

startAuto('weld');
startAuto('bolt');
