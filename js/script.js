/**
 * ARTMETAL - Lógica Principal, SPA de Serviços e Configurador Dinâmico de Portões
 */

document.addEventListener('DOMContentLoaded', function () {
    // Inicialização dos ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Menu Mobile
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }

    // Toggle Dropdown Mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 1. BASE DE DADOS DOS SERVIÇOS (SEM PREÇOS - SOMENTE APRESENTAÇÃO)
    // -------------------------------------------------------------------------
    const servicosDB = {
        portoes: {
            titulo: "Portões Residenciais e Comerciais",
            descricao: "Fabricação sob medida de portões basculantes, pivotantes e deslizantes. Unimos alta tecnologia, segurança reforçada e acabamento impecável em chapas, tubos e perfis veneziana.",
            imagem: "assets/servicos/portoes/galeria-01.jpg",
            solucoes: [
                "Portões de Chapa Fechada e Chapa Bico de Diamante",
                "Modelos Tubulares, Gradis e Combinados (Chapa e Tubo)",
                "Modelos em Veneziana com passagem de ar e privacidade",
                "Sistemas Basculante, Pivotante e Deslizante",
                "Tratamento com Galvanização a Fogo contra ferrugem",
                "Porta social embutida e automação de alta velocidade"
            ],
            imagensAdicionais: [
                "assets/servicos/portoes/portao-chapa-tubo.jpg",
                "assets/servicos/portoes/portao-veneziana.jpg",
                "assets/servicos/portoes/portao-tubo.jpg",
                "assets/servicos/portoes/portao-chapa.jpg",
                "assets/servicos/portoes/portao-chapa-diamante.jpg",
                "assets/servicos/portoes/galeria-02.jpg",
                "assets/servicos/portoes/galeria-03.jpg",
                "assets/servicos/portoes/galeria-04.jpg",
                "assets/servicos/portoes/galeria-05.jpg",
                "assets/servicos/portoes/galeria-06.jpg",
                "assets/servicos/portoes/galeria-07.jpg",
                "assets/servicos/portoes/galeria-08.jpg",
                "assets/servicos/portoes/galeria-09.jpg",
                "assets/servicos/portoes/galeria-10.jpg",
                "assets/servicos/portoes/galeria-11.jpg",
                "assets/servicos/portoes/galeria-12.jpg",
                "assets/servicos/portoes/galeria-13.jpg",
                "assets/servicos/portoes/galeria-14.jpg"
            ],
            exibirConfigurador: true
        },
        grades: {
            titulo: "Grades de Proteção",
            descricao: "Grades de alta resistência para janelas, portas, sacadas e muros. Fabricadas sob medida para garantir máxima segurança contra invasões com design limpo e durável.",
            imagem: "assets/servicos/grades.svg",
            solucoes: [
                "Grades tubo quadrado e redondo",
                "Grades de enrolar e de ferro fundido",
                "Grades para janelas residenciais e comerciais",
                "Pintura eletrostática com proteção anti-corrosão"
            ]
        },
        corrimao: {
            titulo: "Corrimãos",
            descricao: "Corrimãos em aço inox, aço carbono e alumínio, projetados em estrita conformidade com as normas de acessibilidade e segurança (NBR 9050). Ideal para escadas, rampas e mezaninos.",
            imagem: "assets/servicos/corrimao.svg",
            solucoes: [
                "Corrimão tubular em Aço Inox 304 Polido ou Escovado",
                "Corrimão de parede com suportes reforçados",
                "Corrimão duplo para rampas de acessibilidade",
                "Modelos personalizados para interiores e exteriores"
            ]
        },
        guardaCorpo: {
            titulo: "Guarda-Corpos",
            descricao: "Proteção indispensável para sacadas, varandas, mezaninos e escadas. Combinamos a rigidez das estruturas metálicas com a modernidade dos fechamentos em vidro temperado.",
            imagem: "assets/servicos/guarda-corpo.svg",
            solucoes: [
                "Guarda-corpo em Aço Inox com Vidro Temperado",
                "Guarda-corpo panorâmico com fixação bottom/torres",
                "Estruturas em metalon industrial para lofts e escritórios",
                "Encaixes e presilhas de alta resistência"
            ]
        },
        estruturas: {
            titulo: "Estruturas Metálicas",
            descricao: "Desenvolvimento e montagem de estruturas metálicas de pequeno, médio e grande porte. Soluções ágeis, com alta capacidade de carga e durabilidade estrutural.",
            imagem: "assets/servicos/estruturas.svg",
            solucoes: [
                "Mezaninos metálicos para comércios e galpões",
                "Coberturas em telha termoacústica (sanduíche) ou policarbonato",
                "Escadas metálicas marinhas, caracol e retas",
                "Vigas e pilares de sustentação estrutural"
            ]
        },
        vidracaria: {
            titulo: "Vidraçaria Especializada",
            descricao: "Corte, lapidação e instalação de vidros temperados e laminados para projetos arquitetônicos. Soluções sob medida para valorizar a iluminação natural e o conforto térmico.",
            imagem: "assets/servicos/vidracaria.svg",
            solucoes: [
                "Portas e janelas em vidro temperado (8mm e 10mm)",
                "Divisórias de ambientes para escritórios e residências",
                "Espelhos lapidados e bisotados sob medida",
                "Peles de vidro e Fachadas Structural Glazing"
            ]
        },
        box: {
            titulo: "Box de Banheiro",
            descricao: "Linha completa de box para banheiro em vidro temperado com roldanas aparentes em aço inox ou perfis tradicionais de alumínio. Elegância e fácil higienização.",
            imagem: "assets/servicos/box.svg",
            solucoes: [
                "Box Elegance com roldanas aparentes em Aço Inox",
                "Box de Canto (L), Abrir e Deslizante",
                "Vidros incolor, fumê, verde e jateado",
                "Vedação especial contra vazamentos de água"
            ]
        },
        sacada: {
            titulo: "Sacadas e Varandas",
            descricao: "Fechamento de sacadas com sistema de envidraçamento retrátil (sistema cortina de vidro) e estruturas de proteção em aço ou alumínio para integração de espaços.",
            imagem: "assets/servicos/sacada.svg",
            solucoes: [
                "Envidraçamentos de Sacadas com abertura total",
                "Proteção contra chuvas, ventos e ruídos urbanos",
                "Trilhos de alumínio com vedação em silicone e escovinhas",
                "Estruturas complementares de sustentação metálica"
            ]
        },
        personalizado: {
            titulo: "Projetos Personalizados",
            descricao: "Transformamos ideias ousadas em projetos reais de serralheria e vidraçaria. Desenvolvemos peças exclusivas mediante desenho técnico ou necessidade específica do cliente.",
            imagem: "assets/servicos/personalizado.svg",
            solucoes: [
                "Móveis em estilo industrial (ferro e madeira)",
                "Pérgolas metálicas e brises decorativos",
                "Portas pivotantes de grande porte com puxadores especiais",
                "Desenvolvimento sob demanda técnica e arquitetônica"
            ]
        }
    };

    // -------------------------------------------------------------------------
    // 2. SPA DA ÁREA DE DETALHES DOS SERVIÇOS
    // -------------------------------------------------------------------------
    const mainContent = document.getElementById('main-content');
    const serviceDetailView = document.getElementById('service-detail-view');

    window.abrirServicoDetalhe = function (key) {
        const item = servicosDB[key];
        if (!item) return;

        const imgEl = document.getElementById('view-servico-img');
        const titEl = document.getElementById('view-servico-titulo');
        const descEl = document.getElementById('view-servico-desc');
        const listEl = document.getElementById('view-servico-lista');
        const btnEl = document.getElementById('view-servico-btn');
        const btnConfig = document.getElementById('view-servico-btn-config');

        if (imgEl) imgEl.src = item.imagem;
        if (titEl) titEl.textContent = item.titulo;
        if (descEl) descEl.textContent = item.descricao;

        if (listEl) {
            listEl.innerHTML = '';
            item.solucoes.forEach(function (sol) {
                const li = document.createElement('li');
                li.textContent = sol;
                listEl.appendChild(li);
            });
        }

        // Galeria de imagens adicionais (quando disponível para o serviço)
        const galeriaEl = document.getElementById('view-servico-galeria');
        if (galeriaEl) {
            galeriaEl.innerHTML = '';
            if (Array.isArray(item.imagensAdicionais) && item.imagensAdicionais.length > 0) {
                item.imagensAdicionais.forEach(function (src) {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = item.titulo;
                    img.loading = 'lazy';
                    galeriaEl.appendChild(img);
                });
                galeriaEl.classList.remove('hidden');
            } else {
                galeriaEl.classList.add('hidden');
            }
        }

        if (btnEl) {
            const msg = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para " + item.titulo + ".");
            btnEl.href = "https://wa.me/5511975335113?text=" + msg;
        }

        if (btnConfig) {
            if (item.exibirConfigurador) {
                btnConfig.classList.remove('hidden');
            } else {
                btnConfig.classList.add('hidden');
            }
        }

        if (mainContent && serviceDetailView) {
            mainContent.classList.add('hidden');
            serviceDetailView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    window.fecharServicoDetalhe = function () {
        if (mainContent && serviceDetailView) {
            serviceDetailView.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }
    };

    // Sempre que o usuário clicar em qualquer link interno de navegação
    // (INÍCIO, SOBRE, COMO FUNCIONA, CONTATO, logo, botões "Monte seu Portão" etc.),
    // a view de detalhes de serviço (que oculta o #main-content) precisa ser
    // fechada primeiro. Caso contrário o link aponta para uma seção que está
    // com "display: none" e a navegação parece "não funcionar".
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (serviceDetailView && !serviceDetailView.classList.contains('hidden')) {
                fecharServicoDetalhe();
            }
            // Fecha o menu mobile (hambúrguer), se estiver aberto
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. CONFIGURADOR DE PORTÕES & REGRAS DE PREÇO PRESERVADAS
    // -------------------------------------------------------------------------
    const projeto = {
        modelo: 'chapa',
        largura: 3.50,
        altura: 2.20,
        quantidade: 1,
        area: 7.70,
        abertura: 'basculante',
        automacao: 'nao',
        galvanizado: 'sim',
        social: 'sim',
        precoM2: 620,
        precoTotal: 0
    };

    const tabelaPrecos = {
        chapaTubo: 620,
        veneziana: 650,
        tubo: 600,
        chapa: 620,
        chapaDiamante: 800
    };

    // DOM Elements
    const inputLargura = document.getElementById('input-largura');
    const inputAltura = document.getElementById('input-altura');
    const inputQuantidade = document.getElementById('input-quantidade');
    const displayAreaCalculada = document.getElementById('display-area-calculada');
    const svgGateElement = document.getElementById('gate-svg-element');
    const gateLeafGroup = document.getElementById('gate-leaf-group');
    const gateLeafBg = document.getElementById('gate-leaf-bg');
    const gatePatternsContainer = document.getElementById('gate-patterns-container');
    const gateSocialContainer = document.getElementById('gate-social-container');

    // Seleção de Modelo
    const modelCards = document.querySelectorAll('.card-model-select');
    modelCards.forEach(function (card) {
        card.addEventListener('click', function () {
            modelCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            projeto.modelo = this.getAttribute('data-model');
            atualizarCalculos();
        });
    });

    // Inputs de Medidas (Proporções Mantidas)
    if (inputLargura) {
        inputLargura.addEventListener('input', function () {
            projeto.largura = parseFloat(this.value) || 0;
            const wVal = document.getElementById('blueprint-w-val');
            if (wVal) wVal.textContent = projeto.largura.toFixed(2) + 'm';
            atualizarCalculos();
        });
    }

    if (inputAltura) {
        inputAltura.addEventListener('input', function () {
            projeto.altura = parseFloat(this.value) || 0;
            const hVal = document.getElementById('blueprint-h-val');
            if (hVal) hVal.textContent = projeto.altura.toFixed(2) + 'm';
            atualizarCalculos();
        });
    }

    if (inputQuantidade) {
        inputQuantidade.addEventListener('input', function () {
            projeto.quantidade = parseInt(this.value) || 1;
            atualizarCalculos();
        });
    }

    // Handlers para Opcionais e Abertura
    function setupRadioGroup(groupId, propName) {
        const group = document.getElementById(groupId);
        if (!group) return;
        const cards = group.querySelectorAll('.radio-card');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                cards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                const input = this.querySelector('input[type="radio"]');
                if (input) {
                    input.checked = true;
                    projeto[propName] = input.value;
                    atualizarCalculos();
                }
            });
        });
    }

    setupRadioGroup('group-abertura', 'abertura');
    setupRadioGroup('group-automacao', 'automacao');
    setupRadioGroup('group-galvanizado', 'galvanizado');
    setupRadioGroup('group-social', 'social');

    // Navegação Stepper
    const stepPanes = document.querySelectorAll('.config-step-pane');
    const stepItems = document.querySelectorAll('.step-item');

    function goToStep(stepNum) {
        stepPanes.forEach(pane => pane.classList.remove('active'));
        stepItems.forEach(item => item.classList.remove('active'));

        const targetPane = document.getElementById('step-pane-' + stepNum);
        if (targetPane) targetPane.classList.add('active');

        stepItems.forEach(item => {
            if (parseInt(item.getAttribute('data-step')) <= stepNum) {
                item.classList.add('active');
            }
        });
    }

    document.querySelectorAll('.btn-next-step').forEach(btn => {
        btn.addEventListener('click', function () {
            const next = this.getAttribute('data-next');
            goToStep(parseInt(next));
        });
    });

    document.querySelectorAll('.btn-prev-step').forEach(btn => {
        btn.addEventListener('click', function () {
            const prev = this.getAttribute('data-prev');
            goToStep(parseInt(prev));
        });
    });

    // -------------------------------------------------------------------------
    // 4. ATUALIZAÇÃO VISUAL DO SVG SEM DESTRUIR ELEMENTOS (PRESERVA ANIMAÇÃO)
    // -------------------------------------------------------------------------
    function atualizarSVGPreview() {
        if (!svgGateElement) return;

        // OBS: o tipo de abertura ativo (classe gate-opening-*) e a posição
        // aberta/fechada da folha (atributo transform, via requestAnimationFrame)
        // são controlados exclusivamente por tocarAnimacaoAbertura(), para não
        // reiniciar a animação sempre que o modelo, medidas ou opcionais mudarem.

        // 1. Atualizar padrão visual do modelo
        if (gateLeafBg && gatePatternsContainer) {
            let fillColor = '#1a202c';
            let patternHTML = '';

            if (projeto.modelo === 'chapa') {
                fillColor = '#1a202c';
                patternHTML = `
                    <line x1="12" y1="40" x2="188" y2="40" stroke="#334155" stroke-width="1.5" />
                    <line x1="12" y1="70" x2="188" y2="70" stroke="#334155" stroke-width="1.5" />
                    <line x1="12" y1="95" x2="188" y2="95" stroke="#334155" stroke-width="1.5" />
                `;
            } else if (projeto.modelo === 'tubo') {
                fillColor = '#0f172a';
                patternHTML = `
                    <line x1="35" y1="12" x2="35" y2="118" stroke="#64748b" stroke-width="2.5" />
                    <line x1="60" y1="12" x2="60" y2="118" stroke="#64748b" stroke-width="2.5" />
                    <line x1="85" y1="12" x2="85" y2="118" stroke="#64748b" stroke-width="2.5" />
                    <line x1="110" y1="12" x2="110" y2="118" stroke="#64748b" stroke-width="2.5" />
                    <line x1="135" y1="12" x2="135" y2="118" stroke="#64748b" stroke-width="2.5" />
                    <line x1="160" y1="12" x2="160" y2="118" stroke="#64748b" stroke-width="2.5" />
                `;
            } else if (projeto.modelo === 'chapaTubo') {
                fillColor = '#1e293b';
                patternHTML = `
                    <rect x="12" y="12" width="176" height="50" fill="#0f172a" />
                    <line x1="40" y1="12" x2="40" y2="62" stroke="#64748b" stroke-width="2" />
                    <line x1="70" y1="12" x2="70" y2="62" stroke="#64748b" stroke-width="2" />
                    <line x1="100" y1="12" x2="100" y2="62" stroke="#64748b" stroke-width="2" />
                    <line x1="130" y1="12" x2="130" y2="62" stroke="#64748b" stroke-width="2" />
                    <line x1="160" y1="12" x2="160" y2="62" stroke="#64748b" stroke-width="2" />
                    <line x1="12" y1="62" x2="188" y2="62" stroke="#f39c12" stroke-width="2" />
                `;
            } else if (projeto.modelo === 'veneziana') {
                fillColor = '#1e293b';
                patternHTML = `
                    <line x1="12" y1="25" x2="188" y2="25" stroke="#475569" stroke-width="2.5" />
                    <line x1="12" y1="40" x2="188" y2="40" stroke="#475569" stroke-width="2.5" />
                    <line x1="12" y1="55" x2="188" y2="55" stroke="#475569" stroke-width="2.5" />
                    <line x1="12" y1="70" x2="188" y2="70" stroke="#475569" stroke-width="2.5" />
                    <line x1="12" y1="85" x2="188" y2="85" stroke="#475569" stroke-width="2.5" />
                    <line x1="12" y1="100" x2="188" y2="100" stroke="#475569" stroke-width="2.5" />
                `;
            } else if (projeto.modelo === 'chapaDiamante') {
                fillColor = '#334155';
                patternHTML = `
                    <polygon points="50,30 65,50 50,70 35,50" fill="none" stroke="#f39c12" stroke-width="1.5" />
                    <polygon points="100,30 115,50 100,70 85,50" fill="none" stroke="#f39c12" stroke-width="1.5" />
                    <polygon points="150,30 165,50 150,70 135,50" fill="none" stroke="#f39c12" stroke-width="1.5" />
                `;
            }

            gateLeafBg.setAttribute('fill', fillColor);
            gatePatternsContainer.innerHTML = patternHTML;
        }

        // 2. Integração Visual da Porta Social (Movimenta-se junto com a folha)
        if (gateSocialContainer) {
            if (projeto.social === 'sim') {
                gateSocialContainer.innerHTML = `
                    <g transform="translate(25, 35)">
                        <rect width="38" height="75" fill="rgba(0,0,0,0.2)" stroke="#f39c12" stroke-width="2" stroke-dasharray="3,2" rx="1" />
                        <circle cx="6" cy="38" r="2" fill="#f39c12" />
                    </g>
                `;
            } else {
                gateSocialContainer.innerHTML = '';
            }
        }
    }

    // -------------------------------------------------------------------------
    // 4b. ANIMAÇÃO DE ABERTURA DO PORTÃO (FECHADO -> ABERTO)
    // -------------------------------------------------------------------------
    // A animação é feita 100% via JavaScript (requestAnimationFrame),
    // escrevendo diretamente o atributo SVG "transform" da folha a cada
    // quadro, em unidades do próprio viewBox (0 0 200 130). Isso evita
    // depender de CSS transform/transition sobre elementos SVG (rotateX,
    // rotateY, transform-origin, transform-box), que se comportam de forma
    // inconsistente entre navegadores e causavam o portão aparecer sempre
    // "aberto"/deformado e vazando do card em telas menores.
    let animFrameId = null;

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function aplicarTransformFolha(tipo, progresso) {
        // Ponto de dobradiça/pivô (em unidades do viewBox) conforme o tipo
        const pivoX = (tipo === 'pivotante') ? 12 : 100;
        const pivoY = (tipo === 'basculante') ? 12 : 65;

        let tx = 0, ty = 0, sx = 1, sy = 1;

        if (tipo === 'basculante') {
            // Sobe e recolhe verticalmente, como uma folha basculante subindo
            ty = -95 * progresso;
            sy = 1 - (0.9 * progresso);
        } else if (tipo === 'pivotante') {
            // Fecha lateralmente a partir da dobradiça, como uma porta vista de frente
            sx = 1 - (0.94 * progresso);
        } else { // deslizante
            tx = 105 * progresso;
        }

        gateLeafGroup.setAttribute(
            'transform',
            `translate(${tx} ${ty}) translate(${pivoX} ${pivoY}) scale(${sx} ${sy}) translate(${-pivoX} ${-pivoY})`
        );
    }

    function tocarAnimacaoAbertura() {
        if (!svgGateElement || !gateLeafGroup) return;

        const tipo = projeto.abertura;

        // Define o TIPO de abertura ativo (controla o destaque do trilho, etc.)
        svgGateElement.classList.remove('gate-opening-basculante', 'gate-opening-pivotante', 'gate-opening-deslizante');
        svgGateElement.classList.add('gate-opening-' + tipo);

        if (animFrameId) cancelAnimationFrame(animFrameId);

        // Garante que a folha comece sempre do estado FECHADO (identidade)
        aplicarTransformFolha(tipo, 0);

        const duracaoMs = 950;
        const inicio = performance.now();

        function passo(agora) {
            const t = Math.min(1, (agora - inicio) / duracaoMs);
            aplicarTransformFolha(tipo, easeOutCubic(t));
            if (t < 1) {
                animFrameId = requestAnimationFrame(passo);
            } else {
                animFrameId = null;
            }
        }

        // Aguarda um quadro para garantir que o estado fechado foi pintado
        // antes de iniciar a transição até o estado aberto.
        requestAnimationFrame(function () {
            animFrameId = requestAnimationFrame(passo);
        });
    }

    // Clicar em qualquer card do grupo "Tipo de Abertura" (passo 3) reproduz a animação
    (function ligarAnimacaoAbertura() {
        const grupoAbertura = document.getElementById('group-abertura');
        if (grupoAbertura) {
            grupoAbertura.querySelectorAll('.radio-card').forEach(function (card) {
                card.addEventListener('click', tocarAnimacaoAbertura);
            });
        }
    })();

    // Botão "SIMULAR ABERTURA" junto ao preview (passo 2 - Medidas)
    const btnSimularAbertura = document.getElementById('btn-simular-abertura');
    if (btnSimularAbertura) {
        btnSimularAbertura.addEventListener('click', tocarAnimacaoAbertura);
    }

    // -------------------------------------------------------------------------
    // 5. CÁLCULO DE PREÇOS INTEGRAL E IMPRESSÃO
    // -------------------------------------------------------------------------
    function atualizarCalculos() {
        // Área
        projeto.area = projeto.largura * projeto.altura;
        if (displayAreaCalculada) {
            displayAreaCalculada.textContent = projeto.area.toFixed(2).replace('.', ',') + ' m²';
        }

        // Valor Base
        let valorBase = 0;
        if (projeto.modelo === 'chapaDiamante') {
            valorBase = tabelaPrecos.chapaDiamante * projeto.quantidade;
        } else {
            const precoM2 = tabelaPrecos[projeto.modelo] || 620;
            valorBase = projeto.area * precoM2 * projeto.quantidade;
        }

        // Opcionais
        let adicionalAutomacao = 0;
        if (projeto.automacao === 'dezoitoSegundos') adicionalAutomacao = 800;
        if (projeto.automacao === 'noveSegundos') adicionalAutomacao = 1100;

        let adicionalSocial = 0;
        if (projeto.social === 'sim') adicionalSocial = 500;

        // Total
        projeto.precoTotal = valorBase + adicionalAutomacao + adicionalSocial;
        const precoFormatado = projeto.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Displays de Preço
        const livePrice = document.getElementById('sidebar-live-price');
        const sumTotalFinal = document.getElementById('sum-total-final');
        const printTotalPrice = document.getElementById('print-total-price');

        if (livePrice) livePrice.textContent = precoFormatado;
        if (sumTotalFinal) sumTotalFinal.textContent = precoFormatado;
        if (printTotalPrice) printTotalPrice.textContent = precoFormatado;

        // Atualizar Textos de Resumo
        const sumModelo = document.getElementById('sum-modelo');
        const sumMedidas = document.getElementById('sum-medidas');
        const sumArea = document.getElementById('sum-area');
        const sumAbertura = document.getElementById('sum-abertura');
        const sumAutomacao = document.getElementById('sum-automacao');
        const sumGalvanizado = document.getElementById('sum-galvanizado');
        const sumSocial = document.getElementById('sum-social');

        const modeloNomes = {
            chapaTubo: 'Chapa e Tubo',
            veneziana: 'Veneziana',
            tubo: 'Tubular Gradil',
            chapa: 'Chapa Fechada',
            chapaDiamante: 'Chapa Bico de Diamante'
        };

        const modeloImagens = {
            chapaTubo: 'assets/servicos/portoes/portao-chapa-tubo.jpg',
            veneziana: 'assets/servicos/portoes/portao-veneziana.jpg',
            tubo: 'assets/servicos/portoes/portao-tubo.jpg',
            chapa: 'assets/servicos/portoes/portao-chapa.jpg',
            chapaDiamante: 'assets/servicos/portoes/portao-chapa-diamante.jpg'
        };

        const nomeModeloAtual = modeloNomes[projeto.modelo] || projeto.modelo;
        const imagemModeloAtual = modeloImagens[projeto.modelo] || modeloImagens.chapa;
        const medidasTexto = projeto.largura.toFixed(2) + 'm x ' + projeto.altura.toFixed(2) + 'm (' + projeto.quantidade + ' un)';

        if (sumModelo) sumModelo.textContent = nomeModeloAtual;
        if (sumMedidas) sumMedidas.textContent = medidasTexto;
        if (sumArea) sumArea.textContent = projeto.area.toFixed(2).replace('.', ',') + ' m²';
        if (sumAbertura) sumAbertura.textContent = projeto.abertura.charAt(0).toUpperCase() + projeto.abertura.slice(1);
        
        let autTexto = "Sem Motor";
        if (projeto.automacao === 'dezoitoSegundos') autTexto = "Motor Padrão";
        if (projeto.automacao === 'noveSegundos') autTexto = "Motor Rápido";
        if (sumAutomacao) sumAutomacao.textContent = autTexto;

        if (sumGalvanizado) sumGalvanizado.textContent = projeto.galvanizado === 'sim' ? 'Sim' : 'Não';
        if (sumSocial) sumSocial.textContent = projeto.social === 'sim' ? 'Sim' : 'Não';

        // Atualização do Card Lateral (Sidebar "Resumo do Pedido") - antes ficava
        // sempre travado em "Chapa Fechada", agora reflete o modelo escolhido.
        const sidebarModelTitle = document.getElementById('sidebar-model-title');
        const sidebarMeasuresInfo = document.getElementById('sidebar-measures-info');
        const sidebarImgThumb = document.getElementById('sidebar-img-thumb');

        if (sidebarModelTitle) sidebarModelTitle.textContent = nomeModeloAtual;
        if (sidebarMeasuresInfo) sidebarMeasuresInfo.textContent = medidasTexto;
        if (sidebarImgThumb) {
            sidebarImgThumb.src = imagemModeloAtual;
            sidebarImgThumb.alt = 'Portão ' + nomeModeloAtual;
        }

        // Atualização Visual do SVG
        atualizarSVGPreview();
    }

    // Impressão
    function atualizarResumoImpressao() {
        const modeloNomes = {
            chapaTubo: 'Chapa e Tubo',
            veneziana: 'Veneziana',
            tubo: 'Tubular Gradil',
            chapa: 'Chapa Fechada',
            chapaDiamante: 'Chapa Bico de Diamante'
        };
        const modeloImagens = {
            chapaTubo: 'assets/servicos/portoes/portao-chapa-tubo.jpg',
            veneziana: 'assets/servicos/portoes/portao-veneziana.jpg',
            tubo: 'assets/servicos/portoes/portao-tubo.jpg',
            chapa: 'assets/servicos/portoes/portao-chapa.jpg',
            chapaDiamante: 'assets/servicos/portoes/portao-chapa-diamante.jpg'
        };

        const nomeModeloAtual = modeloNomes[projeto.modelo] || projeto.modelo;

        let autTexto = "Sem Motor";
        if (projeto.automacao === 'dezoitoSegundos') autTexto = "Motor Padrão";
        if (projeto.automacao === 'noveSegundos') autTexto = "Motor Rápido";

        const setTexto = function (id, valor) {
            const el = document.getElementById(id);
            if (el) el.textContent = valor;
        };

        setTexto('print-sum-modelo', nomeModeloAtual);
        setTexto('print-sum-medidas', projeto.largura.toFixed(2).replace('.', ',') + 'm x ' + projeto.altura.toFixed(2).replace('.', ',') + 'm (' + projeto.quantidade + ' un)');
        setTexto('print-sum-area', projeto.area.toFixed(2).replace('.', ',') + ' m²');
        setTexto('print-sum-abertura', projeto.abertura.charAt(0).toUpperCase() + projeto.abertura.slice(1));
        setTexto('print-sum-automacao', autTexto);
        setTexto('print-sum-galvanizado', projeto.galvanizado === 'sim' ? 'Sim' : 'Não');
        setTexto('print-sum-social', projeto.social === 'sim' ? 'Sim' : 'Não');
        setTexto('print-total-price', projeto.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        const printImg = document.getElementById('print-gate-image');
        if (printImg) printImg.src = modeloImagens[projeto.modelo] || modeloImagens.chapa;

        // Dados do cliente (Passo 5), se já preenchidos
        const nomeInput = document.getElementById('lead-nome');
        const foneInput = document.getElementById('lead-whatsapp');
        const emailInput = document.getElementById('lead-email');
        const cidadeInput = document.getElementById('lead-cidade');

        setTexto('print-client-name', (nomeInput && nomeInput.value.trim()) || 'Não informado');
        setTexto('print-client-phone', (foneInput && foneInput.value.trim()) || 'Não informado');
        setTexto('print-client-email', (emailInput && emailInput.value.trim()) || 'Não informado');
        setTexto('print-client-city', (cidadeInput && cidadeInput.value.trim()) || 'Não informado');

        const dataDisplay = document.getElementById('print-date-display');
        if (dataDisplay) {
            dataDisplay.textContent = 'Data: ' + new Date().toLocaleDateString('pt-BR');
        }
    }

    const btnPrint = document.getElementById('btn-print-quote');
    if (btnPrint) {
        btnPrint.addEventListener('click', function () {
            atualizarResumoImpressao();
            window.print();
        });
    }

    // Formulário WhatsApp
    const formLead = document.getElementById('form-configurator-lead');
    if (formLead) {
        formLead.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('lead-nome').value;
            const phone = document.getElementById('lead-whatsapp').value;
            const email = document.getElementById('lead-email').value || 'Não informado';
            const cidade = document.getElementById('lead-cidade').value;
            const obs = document.getElementById('lead-observacoes').value || 'Nenhuma';

            const textoMsg = `*NOVO ORÇAMENTO DE PORTÃO - ARTMETAL*\n\n` +
                `*Cliente:* ${nome}\n` +
                `*WhatsApp:* ${phone}\n` +
                `*E-mail:* ${email}\n` +
                `*Cidade/Bairro:* ${cidade}\n\n` +
                `*ESPECIFICAÇÕES DO PORTÃO:*\n` +
                `• *Modelo:* ${projeto.modelo}\n` +
                `• *Medidas:* ${projeto.largura}m x ${projeto.altura}m (${projeto.quantidade} un)\n` +
                `• *Área Total:* ${projeto.area.toFixed(2)} m²\n` +
                `• *Abertura:* ${projeto.abertura}\n` +
                `• *Automação:* ${projeto.automacao}\n` +
                `• *Galvanizado:* ${projeto.galvanizado}\n` +
                `• *Social Embutido:* ${projeto.social}\n` +
                `• *Valor Estimado:* ${projeto.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n` +
                `*Observações:* ${obs}`;

            const urlWa = "https://wa.me/5511975335113?text=" + encodeURIComponent(textoMsg);
            window.open(urlWa, '_blank');
        });
    }

    // Inicialização
    atualizarCalculos();

    // Estado inicial do portão = FECHADO. O usuário controla a animação
    // clicando no botão "SIMULAR ABERTURA" ou escolhendo um tipo no passo 3.
    if (svgGateElement) {
        svgGateElement.classList.add('gate-opening-' + projeto.abertura);
    }
});