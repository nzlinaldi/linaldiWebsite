/* Popup zoom Modal */

document.addEventListener('DOMContentLoaded', function() {
    
    if (!document.body.classList.contains('page-stud')) {
        return;
    }

    const overlay = document.getElementById('stud-zoom-overlay');
    if (!overlay) return;

    const zoomImgs = overlay.querySelectorAll('.zoom-img');
    const dotsBox = document.getElementById('stud-zoom-dots');
    const prevBtn = overlay.querySelector('.zoom-arrow.left');
    const nextBtn = overlay.querySelector('.zoom-arrow.right');
    const closeBtn = overlay.querySelector('.zoom-close');

    let galleryImgs = [];
    let currentIndex = 0;
    let isAnimating = false;
    let autoTimer = null;

    // Adicionar listeners para as imagens da galeria
    document.querySelectorAll('.gallery-images img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const container = img.closest('.gallery-images');
            if (container) {
                galleryImgs = Array.from(container.querySelectorAll('img'));
                currentIndex = galleryImgs.indexOf(img);
                openZoom();
            }
        });
    });

    // Funções
    function openZoom() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Exibir primeira imagem
        showSlide(currentIndex);
        renderDots();
        startAuto();
    }

    function closeZoom() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        stopAuto();
    }

    function showSlide(idx) {
        if (isAnimating) return;
        if (!galleryImgs[idx]) return;

        isAnimating = true;
        currentIndex = idx;

        // Atualizar todas as imagens
        zoomImgs.forEach((img, i) => {
            if (i === 0) {
                // Primeira imagem
                img.src = galleryImgs[idx].src;
                img.classList.add('active');
                img.style.opacity = '1';
                img.style.transform = 'translateX(0)';
            } else {
                // Outras imagens ocultas
                img.classList.remove('active');
                img.style.opacity = '0';
                img.style.transform = 'translateX(100%)';
            }
        });

        setTimeout(() => {
            isAnimating = false;
            renderDots();
        }, 450);
    }

    function renderDots() {
        dotsBox.innerHTML = '';
        galleryImgs.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', function() {
                if (i !== currentIndex && !isAnimating) {
                    showSlide(i);
                    resetAuto();
                }
            });
            dotsBox.appendChild(dot);
        });
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
            if (!isAnimating && galleryImgs.length > 0) {
                currentIndex = (currentIndex + 1) % galleryImgs.length;
                showSlide(currentIndex);
            }
        }, 3000);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    function resetAuto() {
        stopAuto();
        startAuto();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeZoom);

    prevBtn.addEventListener('click', function() {
        if (galleryImgs.length > 0 && !isAnimating) {
            currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
            showSlide(currentIndex);
            resetAuto();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (galleryImgs.length > 0 && !isAnimating) {
            currentIndex = (currentIndex + 1) % galleryImgs.length;
            showSlide(currentIndex);
            resetAuto();
        }
    });

    // Fechar ao clicar no fundo
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeZoom();
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeZoom();
        }
    });
});
