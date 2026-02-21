// Modal Zoom Universal - Funciona em Produtos, Stud Weld e Stud Bolt
document.addEventListener('DOMContentLoaded', function() {
    
    // Se a página já tem o overlay de produtos, usar ele
    const existingOverlay = document.getElementById('image-zoom-overlay');
    if (existingOverlay) {
        setupZoomProdutos();
    } else {
        // Senão, criar modal dinamicamente (para stud pages)
        setupZoomDinamico();
    }
    
    function setupZoomProdutos() {
        const overlay = document.getElementById('image-zoom-overlay');
        const zoomImage = document.getElementById('zoom-image');
        const dotsContainer = document.getElementById('zoom-dots');
        const closeBtn = overlay.querySelector('.zoom-close');
        const prevBtn = overlay.querySelector('.zoom-arrow.left');
        const nextBtn = overlay.querySelector('.zoom-arrow.right');
        
        let images = [];
        let currentIndex = 0;
        let autoPlayTimer = null;
        let zoomLevel = 1;
        
        // Adicionar listeners às imagens clicáveis
        document.querySelectorAll('.product-images img, .gallery-images img, .gallery-track img').forEach(img => {
            // Ignorar imagens dentro de cards com data-product (que têm seu próprio modal)
            if (img.closest('.gallery-card[data-product]')) {
                return;
            }
            
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const gallery = img.closest('.product-images') || img.closest('.gallery-images') || img.closest('.gallery-track');
                if (gallery) {
                    images = Array.from(gallery.querySelectorAll('img'));
                    currentIndex = images.indexOf(img);
                    openZoom();
                }
            });
        });
        
        function openZoom() {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            zoomLevel = 1;
            updateImage();
            renderDots();
            startAutoPlay();
        }
        
        function closeZoom() {
            const zoomBox = overlay.querySelector('.zoom-box');
            overlay.classList.remove('active');
            overlay.classList.add('closing-overlay');
            zoomBox.classList.add('closing');
            
            setTimeout(() => {
                overlay.classList.remove('closing-overlay');
                document.body.style.overflow = '';
                stopAutoPlay();
                zoomLevel = 1;
                zoomBox.classList.remove('closing');
            }, 300);
        }
        
        function updateImage() {
            if (images[currentIndex]) {
                zoomImage.style.opacity = '0';
                zoomImage.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    zoomImage.src = images[currentIndex].src;
                    zoomLevel = 1;
                    zoomImage.style.transform = `translateX(0) scale(${zoomLevel})`;
                    
                    setTimeout(() => {
                        zoomImage.style.opacity = '1';
                        renderDots();
                    }, 50);
                }, 200);
            }
        }
        
        function renderDots() {
            dotsContainer.innerHTML = '';
            images.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.style.cssText = `
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: ${i === currentIndex ? '#333' : '#ccc'};
                    cursor: pointer;
                    transition: background 0.3s;
                `;
                dot.addEventListener('click', () => {
                    if (i !== currentIndex) {
                        currentIndex = i;
                        updateImage();
                        resetAutoPlay();
                    }
                });
                dot.addEventListener('mouseenter', function() {
                    this.style.background = '#333';
                });
                dot.addEventListener('mouseleave', function() {
                    this.style.background = i === currentIndex ? '#333' : '#ccc';
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => {
                if (images.length > 0) {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateImage();
                }
            }, 3000);
        }
        
        function stopAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // SISTEMA DE FECHAR - Refazido do zero
        function attachCloseHandlers() {
            // Fechar ao clicar no botão X
            if (closeBtn) {
                closeBtn.onclick = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    closeZoom();
                    return false;
                };
            }
            
            // Fechar ao clicar no overlay (mas não no zoom-box)
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeZoom();
                }
            });
            
            // Fechar ao apertar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && overlay.classList.contains('active')) {
                    closeZoom();
                }
            });
        }
        
        // Chamar após setup inicial
        attachCloseHandlers();
        
        prevBtn.addEventListener('click', () => {
            if (images.length > 0) {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateImage();
                resetAutoPlay();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (images.length > 0) {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateImage();
                resetAutoPlay();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (images.length > 0) {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
                resetAutoPlay();
            }
        });
        
        // Teclas de seta para navegação
        document.addEventListener('keydown', function(e) {
            if (overlay.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateImage();
                    resetAutoPlay();
                }
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateImage();
                    resetAutoPlay();
                }
            }
        });
        
        // Zoom com scroll
        const imageWrapper = document.querySelector('.zoom-image-wrapper');
        imageWrapper.addEventListener('wheel', function(e) {
            if (overlay.classList.contains('active')) {
                e.preventDefault();
                
                const zoomStep = 0.1;
                if (e.deltaY < 0) {
                    zoomLevel = Math.min(zoomLevel + zoomStep, 3);
                } else {
                    zoomLevel = Math.max(zoomLevel - zoomStep, 1);
                }
                
                zoomImage.style.transform = `translateX(0) scale(${zoomLevel})`;
                
                if (zoomLevel > 1) {
                    stopAutoPlay();
                } else {
                    startAutoPlay();
                }
            }
        });
    }
    
    function setupZoomDinamico() {
        // Criar modal HTML dinamicamente para stud pages
        const modalHTML = `
            <div id="modalZoom" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 9999; align-items: center; justify-content: center;">
                <div style="position: relative; width: 900px; max-width: 95vw; height: 600px; max-height: 90vh; background: white; border-radius: 14px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; justify-content: center; align-items: center; transform: scale(0.9); opacity: 0; transition: transform 0.35s ease, opacity 0.35s ease;">
                    
                    <button id="closeModal" style="position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 32px; color: #555; cursor: pointer; transition: transform 0.3s, color 0.3s;">&times;</button>
                    
                    <div id="imageContainer" style="position: relative; flex: 1; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 8px;">
                        <img id="modalImage" src="" style="max-width: 90%; max-height: 90%; object-fit: contain; cursor: zoom-in; transform-origin: center; transition: transform 0.4s ease, opacity 0.4s ease; opacity: 0; transform: translateX(100%);">
                        
                        <button id="prevImg" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 40px; color: #d32f2f; cursor: pointer; transition: transform 0.3s ease, color 0.3s ease; padding: 10px; z-index: 10;">&#10094;</button>
                        
                        <button id="nextImg" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 40px; color: #d32f2f; cursor: pointer; transition: transform 0.3s ease, color 0.3s ease; padding: 10px; z-index: 10;">&#10095;</button>
                    </div>
                    
                    <div id="modalDots" style="padding: 12px 0; display: flex; gap: 8px;"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('modalZoom');
        const zoomBox = modal.querySelector('div');
        const imageContainer = document.getElementById('imageContainer');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevImg');
        const nextBtn = document.getElementById('nextImg');
        const dotsContainer = document.getElementById('modalDots');
        
        let currentGallery = [];
        let currentIndex = 0;
        let autoPlayTimer = null;
        let zoomLevel = 1;
        
        // Estilizar setas e botão fechar ao hover
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.color = '#f44336';
                this.style.transform = 'translateY(-50%) scale(1.3)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.color = '#d32f2f';
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        });
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.color = '#d32f2f';
            this.style.transform = 'scale(1.2)';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.color = '#555';
            this.style.transform = 'scale(1)';
        });
        
        // Abrir modal ao clicar em imagens
        document.addEventListener('click', function(e) {
            if (e.target.matches('.gallery-images img')) {
                const container = e.target.closest('.gallery-images');
                currentGallery = Array.from(container.querySelectorAll('img'));
                currentIndex = currentGallery.indexOf(e.target);
                openModal();
            }
        });
        
        function openModal() {
            modal.style.display = 'flex';
            zoomLevel = 1;
            
            setTimeout(() => {
                zoomBox.style.transform = 'scale(1)';
                zoomBox.style.opacity = '1';
            }, 50);
            
            updateImage();
            renderDots();
            startAutoPlay();
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            zoomBox.style.transform = 'scale(0.9)';
            zoomBox.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 350);
            
            stopAutoPlay();
            zoomLevel = 1;
        }
        
        function updateImage() {
            if (currentGallery[currentIndex]) {
                modalImage.style.opacity = '0';
                modalImage.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    modalImage.src = currentGallery[currentIndex].src;
                    zoomLevel = 1;
                    modalImage.style.transform = `translateX(0) scale(${zoomLevel})`;
                    
                    setTimeout(() => {
                        modalImage.style.opacity = '1';
                        renderDots();
                    }, 50);
                }, 200);
            }
        }
        
        function renderDots() {
            dotsContainer.innerHTML = '';
            currentGallery.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.style.cssText = `
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: ${i === currentIndex ? '#333' : '#ccc'};
                    cursor: pointer;
                    transition: background 0.3s;
                `;
                dot.addEventListener('click', () => {
                    if (i !== currentIndex) {
                        currentIndex = i;
                        updateImage();
                        resetAutoPlay();
                    }
                });
                dot.addEventListener('mouseenter', function() {
                    this.style.background = '#333';
                });
                dot.addEventListener('mouseleave', function() {
                    this.style.background = i === currentIndex ? '#333' : '#ccc';
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => {
                if (currentGallery.length > 0) {
                    currentIndex = (currentIndex + 1) % currentGallery.length;
                    updateImage();
                }
            }, 3000);
        }
        
        function stopAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // Event listeners
        closeBtn.addEventListener('click', closeModal);
        
        prevBtn.addEventListener('click', () => {
            if (currentGallery.length > 0) {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                updateImage();
                resetAutoPlay();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentGallery.length > 0) {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                updateImage();
                resetAutoPlay();
            }
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                    updateImage();
                    resetAutoPlay();
                }
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % currentGallery.length;
                    updateImage();
                    resetAutoPlay();
                }
            }
        });
        
        // Zoom com scroll
        imageContainer.addEventListener('wheel', function(e) {
            if (modal.style.display === 'flex') {
                e.preventDefault();
                
                const zoomStep = 0.1;
                if (e.deltaY < 0) {
                    zoomLevel = Math.min(zoomLevel + zoomStep, 3);
                } else {
                    zoomLevel = Math.max(zoomLevel - zoomStep, 1);
                }
                
                modalImage.style.transform = `translateX(0) scale(${zoomLevel})`;
                
                if (zoomLevel > 1) {
                    stopAutoPlay();
                } else {
                    startAutoPlay();
                }
            }
        });
    }
});
