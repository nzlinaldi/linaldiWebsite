// Dados dos produtos Stud Bolt
const productDetails = {
    'pistola-indutiva': {
        title: 'PISTOLA DE SOLDA INDUTIVA',
        category: 'STUD BOLT',
        description: 'Fabricadas em material de alta resistência, as pistolas de solda da série TGC permitem grande precisão e repetibilidade de solda, além da fácil troca de pinça (porta pino) e ajustes de solda. Juntamente com as máquinas de solda stud séries TSI, as pistolas de solda atendem as mais variadas aplicações. O movimento mecânico é garantido por rolamento linear e eixo retificado. Modelos para alta corrente (2.000A) possuem amortecedor hidráulico para minimizar espirros de solda.',
        image: '../img/produtos-stud-bolt/Pistola de Solda Indutiva.png',
        specs: {
            'Modelo': 'TGC54',
            'Aplicação': 'Máquinas Stud Indutivas - Drawn Arc - até 2.000 A',
            'Capacidade / Range': 'Pinos / Conectores até Ø 25mm',
            'Cabo de corrente': '6 metros',
            'Elevação do pino': 'ajustável',
            'Amortecimento': 'Amortecedor Hidráulico',
            'Peso (sem cabo)': '2,3 Kg',
            'Dimensões (sem cabo)': '305 x 165 x 54 mm'
        }
    },
    'pistola-capacitiva': {
        title: 'PISTOLAS DE SOLDA CAPACITIVA',
        category: 'STUD BOLT',
        description: 'Fabricadas em material de alta resistência, as pistolas de solda da série TGC permitem grande precisão e repetibilidade de solda, além da fácil troca de pinça (porta pino) e ajustes de solda. Juntamente com as máquinas de solda stud séries TSW, as pistolas de solda atendem as mais variadas aplicações. O movimento mecânico é garantido por rolamento linear e eixo retificado.',
        image: '../img/produtos-stud-bolt/Pistola de Solda Capacitiva.png',
        specs: {
            'Modelo': 'TGC51-R10 / TGC51-R12',
            'Aplicação': 'Máquinas Stud por Descarga Capacitiva',
            'Capacidade / Range': 'Pinos / Parafusos até Ø 12mm / M10',
            'Diâmetro da Pinça': 'Ø 10mm / Ø 12mm',
            'Comprimento Pino/Parafuso': 'Até 40mm - Consultar para comprimentos maiores',
            'Pressão de solda': 'Ajustável',
            'Gatilho': 'Externo',
            'Cabo de corrente': '3 metros',
            'Conector de corrente': 'DKJ',
            'Peso (sem cabo)': '1,3 Kg',
            'Dimensões (sem cabo)': '180 x 140 x 62 mm'
        }
    },
    'acessorios': {
        title: 'ACESSÓRIOS PARA SOLDAGEM',
        category: 'STUD BOLT',
        description: 'Linha completa de acessórios para soldagem Stud Bolt. Inclui bocais, pincas, grampos terra, porta cerâmica e outros componentes essenciais para o funcionamento perfeito do sistema.',
        image: '../img/produtos-stud-bolt/Acessórios para soldagem Stud Bolt.jpg',
        specs: {
            'Bocal 40 para TGC37R': 'Diâmetro de 40 mm - Protege operador de faíscas',
            'Tripé para TGC37R': 'Fácil posicionamento da solda',
            'Grampo terra TGC24': 'Cabo de solda com 3 metros - Grampo de 2"',
            'Pincas (porta pino) para solda': 'Bitolas de M3 a M10 - Pinos de até 40 mm de comprimento - Limitador (batente) incluso - Material latão (cobre sob encomenda)',
            'Porta Cerâmica': 'Para Solda Stud Bolt - Fabricada sob encomenda - Adequada à necessidade'
        }
    },
    'stud-capacitiva': {
        title: 'STUD WELD CAPACITIVA',
        category: 'STUD WELD',
        description: 'As máquinas de solda Stud por Descarga Capacitiva (CD), encontram aplicações na indústria naval, metalúrgica, automobilística, estamparia, etc. Solda pinos em chapas a partir de 0,5mm de espessura sem marcar o lado oposto da chapa e sem comprometer o acabamento.\n\nNesse processo de solda, a energia armazenada em uma banca de capacitores é descarregada através do pino/parafuso, fazendo romper sua ponta de ignição gerando assim o arco de solda para realizar a fusão dos materiais. Nesse momento, a pistola de solda pressiona o pino contra a base, concretizando a soldagem. O tempo dessa descarga é extremamente curto – de 0,001 a 0,015s, o que possibilita a soldagem em chapas a partir de 0,5mm de espessura sem que ocorra deformação ou que o outro lado da chapa fique marcado, mesmo que esse outro lado esteja com algum revestimento plástico ou pintado. Esse processo dispensa a utilização de cerâmicas de contenção.',
        image: '../img/produtos-stud-bolt/Stud Weld Capacitiva.png',
        specs: {
            'Modelo': 'TSW525 / TSW555 / TSW575',
            'Ajuste de energia de solda': 'Digital',
            'Bitolas soldáveis': 'M3 a M6 (M8) / M3 a M8 / M3 a M10',
            'Materiais soldáveis': 'aço, aço inox, latão, alumínio',
            'Produção por min.': '7 a 20 soldas / min.',
            'Energia máx. - J': '1.320 / 1.760 / 2.200',
            'Banca de capacitores - uF': '66.000 / 88.000 / 110.000',
            'Conectores de Corrente': 'WM - DKJ',
            'Alimentação - 220Vac': '1A / 2A / 3A',
            'Dimensões (LxAxP) - mm': '200x200x380 / 200x200x380 / 210x250x430',
            'Peso - Kg': '15,6 / 16,9 / 21,5'
        }
    },
    'pincas': {
        title: 'PINÇAS DE SOLDA',
        category: 'STUD BOLT',
        description: 'Pinças de solda para sistemas Stud Bolt. Disponíveis em diferentes tipos e tamanhos para se adequar a diversas aplicações.',
        image: '../img/PINÇA STUD BOLT.png',
        specs: {
            'Aplicação': 'Sistemas Stud Bolt',
            'Tipos': 'Múltiplas configurações',
            'Material': 'Aço especial',
            'Durabilidade': 'Alta resistência ao desgaste'
        }
    },
    'suportes': {
        title: 'SUPORTES PARA PINÇA',
        category: 'STUD BOLT',
        description: 'Suportes e bases para fixação de pinças de solda. Garantem estabilidade e precisão durante o trabalho.',
        image: '../img/produtos-stud-bolt/BASE PARA PINÇA 34\'\'.png',
        specs: {
            'Tipo': 'Base para pinça',
            'Tamanho': '34"',
            'Aplicação': 'Fixação de pinças',
            'Material': 'Aço reforçado'
        }
    },
    'pinos-parafusos': {
        title: 'PINOS, BUCHAS E PARAFUSOS CAPACITIVOS',
        category: 'STUD BOLT',
        description: 'Os pinos, buchas e parafusos para solda possuem características próprias para soldagem com máquinas de solda por descarga capacitiva. Suas características mecânicas conferem estabilidade e repetibilidade nas soldas.',
        image: '../img/produtos-stud-bolt/PINOS, BUCHAS E PARAFUSOS CAPACITIVOS.png',
        specs: {
            'Parafusos - Bitolas (métrica)': 'M3, M4, M5, M6 e M8',
            'Parafusos - Comprimentos': 'de 8 a 40mm',
            'Parafusos - Material': 'aço carbono cobreado, aço inox, alumínio',
            'Pinos - Bitolas': 'Ø 2,6 ; Ø 3,4',
            'Pinos - Comprimentos': 'até 160mm - dependendo do diâmetro',
            'Pinos - Material': 'aço carbono cobreado, aço inox',
            'Buchas': 'Fabricadas em aço carbono cobreado, segundo possibilidade de fabricação e necessidades do cliente',
            'Outras bitolas / comprimentos': 'Parafusos e pinos sob consulta'
        }
    },
    'stud-indutiva': {
        title: 'STUD INDUTIVA - DRAWN ARC',
        category: 'STUD WELD',
        description: 'O sistema de solda Stud Weld Indutiva – Drawn Arc – é largamente utilizado na soldagem de pinos, prisioneiros, âncoras e outros elementos metálicos de fixação em superfícies metálicas. É bastante utilizado na construção civil, indústria automobilística, etc.\n\nNesse processo, a corrente de solda é obtida através de um retificador de corrente contínua, e tem seu valor ajustado conforme a necessidade de solda. Inicialmente o pino (stud) está em contato com a chapa e ao se iniciar o processo, o pino é eguido, surgindo o arco piloto. Após um tempo, automaticamente o arco piloto dá lugar a corrente de solda. O tempo dessa descarga é extremamente curto – de 0,001 a 1,50s, dependendo do equipamento utilizado. Transcorrido esse tempo, o pino avança em direção à base, sendo pressionado pela pistola de solda, quando então a corrente de solda é desligada e a solda concluída.\n\nPara se utilizar esse método, deve-se avaliar qual pino e corrente de solda serão utilizadas para que se possa especificar a espessura mínima de chapa, pois a penetração do pino pode variar em até 3mm.',
        image: '../img/produtos-stud-bolt/STUD INDUTIVA - DRAWN ARC.png',
        specs: {
            'Modelo': 'TSI600 / TSI800 / TSI2001',
            'Ajuste de solda': 'Digital - tempo e corrente',
            'Bitolas soldáveis': 'até Ø10 (3/8") / até Ø12,7 (1/2") / até Ø22 (7/8")',
            'Materiais soldáveis': 'aço, aço inox, latão, alumínio',
            'Produção por min.': '5 a 20 soldas / min. (dependendo da bitola do pino)',
            'Corrente de saidaΩ': '600A / 800A / 2.000A',
            'Tempo de soldagem': 'até 0,50s',
            'Tensão em aberto': '90 VDC',
            'Alimentação Trifásica': '380 VAC - 60Hz (consultar para outras alimentações)',
            'Corrente em 380VAC': '80A / 100A / 150A',
            'Dimensões - mm': '370 x 410 x 520 / 370 x 410 x 520 / 400 x 400 x 700',
            'Peso - Kg': '100 / 120 / 195'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-details-modal');
    const closeBtn = document.querySelector('.product-modal-close');
    const modalContent = document.querySelector('.product-modal-content');
    const galleryCards = document.querySelectorAll('.gallery-card[data-product]');

    if (!modal) return;

    // Função para fechar o modal com animação
    function closeModal() {
        modalContent.classList.add('closing');
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalContent.classList.remove('closing');
        }, 300);
    }

    // Fechar modal ao clicar no botão X
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
            return false;
        };
    }

    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal ao apertar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Abrir modal ao clicar no card
    galleryCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        // Prevenir propagação de qualquer clique dentro do card
        card.addEventListener('click', (e) => {
            // Não abrir se clicou nas setas de navegação
            if (e.target.classList.contains('product-arrow')) {
                return;
            }

            const productId = card.getAttribute('data-product');
            const productData = productDetails[productId];

            if (productData) {
                e.stopPropagation();
                e.preventDefault();
                openProductModal(productData);
            }
        }, true); // Captura na fase de captura para parar antes
    });

    function openProductModal(product) {
        const modalBody = document.getElementById('product-modal-body');

        // Criar HTML do conteúdo
        let specsHTML = '';
        if (product.specs) {
            specsHTML = '<table>';
            for (const [key, value] of Object.entries(product.specs)) {
                specsHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
            }
            specsHTML += '</table>';
        }

        const content = `
            <h2>${product.title}</h2>
            <div class="product-category">${product.category}</div>
            <p>${product.description}</p>
            
            <div class="product-modal-layout">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-specs">
                    ${specsHTML}
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid var(--primary);">
                        <p style="font-size: 14px; color: #999; margin: 0;">*informações podem ser alteradas sem prévio aviso</p>
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});
