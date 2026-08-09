/**
 * ARTMETAL - Serralheria & Soluções sob Medida
 * Script Principal, Auditoria e Correção do Configurador Digital
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ESTRUTURA CENTRAL DE PREÇOS FICTÍCIOS
    // ==========================================
    const configuracaoPrecos = {
        modelos: {
            chapa: 380,      // Preço em R$ por m²
            tubo: 320,       // Preço em R$ por m²
            chapaTubo: 350,  // Preço em R$ por m²
            veneziana: 390   // Preço em R$ por m²
        },
        abertura: {
            basculante: 450, // Adicional em R$
            correr: 250,
            pivotante: 350,
            social: 0
        },
        automacao: {
            nao: 0,
            noveSegundos: 850,
            dezoitoSegundos: 600
        },
        galvanizado: {
            sim: 0.15, // Porcentagem adicional (15% sobre a área base)
            nao: 0
        },
        social: {
            sim: 300,  // Adicional fixo em R$
            nao: 0
        }
    };

    // Imagens fictícias dos modelos
    const modelosImagens = {
        chapa: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        tubo: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
        chapaTubo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        veneziana: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    };

    // Número Fictício do WhatsApp mantido intacto
    const whatsappArtmetal = "5511999999999";

    // Base de dados das Categorias / Serviços para Modais Dinâmicos
    const dadosServicos = {
        vidracaria: {
            titulo: "Vidraçaria Artmetal",
            imagem: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
            descricao: "Projetos em vidro temperado e laminado com acabamento de alto padrão e instalação de extrema precisão.",
            itens: ["Vidros temperados e laminados", "Portas de vidro pivotantes e de correr", "Janelas sob medida", "Fechamentos de ambientes", "Projetos personalizados em vidro"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para um serviço de vidraçaria."
        },
        box: {
            titulo: "Box de Banheiro",
            imagem: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
            descricao: "Soluções em box para banheiro que unificam elegância, facilidade de limpeza e segurança para sua família.",
            itens: ["Box tradicional de correr", "Box elegante até o teto", "Vidro temperado de alta segurança", "Diferentes acabamentos de ferragens", "Projetos sob medida"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para box de banheiro."
        },
        corrimao: {
            titulo: "Corrimãos",
            imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            descricao: "Corrimãos projetados conforme normas técnicas de segurança, garantindo acessibilidade e estática superior.",
            itens: ["Corrimão metálico pintado", "Corrimão em aço inox escovado ou polido", "Corrimão com fechamento em vidro", "Projetos residenciais e comerciais sob medida"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para corrimão."
        },
        guardaCorpo: {
            titulo: "Guarda-Corpos",
            imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            descricao: "Proteção indispensável para escadas, mezaninos e sacadas com design arquitetônico moderno.",
            itens: ["Guarda-corpo metálico industrial", "Guarda-corpo em vidro temperado", "Estruturas para escadas internas e externas", "Sistemas para sacadas e varandas"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para guarda-corpo."
        },
        sacada: {
            titulo: "Sacadas e Varandas",
            imagem: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            descricao: "Fechamentos e guarda-corpos especiais para valorizar a área externa do seu imóvel.",
            itens: ["Guarda-corpos reforçados", "Fechamentos retráteis em vidro", "Estruturas metálicas de suporte", "Projetos sob medida para apartamentos e casas"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para sacadas e varandas."
        },
        grades: {
            titulo: "Grades de Proteção",
            imagem: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
            descricao: "Máxima segurança residencial e comercial contra intrusões com ótimo acabamento estético.",
            itens: ["Grades reforçadas para janelas", "Grades de elevação para muros", "Grades residenciais decorativas", "Grades de contenção para comércios"],
            mensagem: "Olá, Artmetal! Gostaria de solicitar um orçamento para grades de proteção."
        },
        estruturas: {
            titulo: "Estruturas Metálicas",
            imagem: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
            descricao: "Execução de estruturas metálicas leves e pesadas para coberturas, galpões e mezaninos.",
            itens: ["Coberta metálica e policarbonato", "Mezaninos industriais e residenciais", "Estruturas para comércios e indústrias", "Projetos estruturais completos"],
            mensagem: "Olá, Artmetal! Gostaria de falar com a Artmetal sobre estruturas metálicas."
        },
        personalizado: {
            titulo: "Projetos Personalizados",
            imagem: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
            descricao: "Tem uma necessidade específica? A Artmetal desenvolve soluções sob medida para seu projeto especial.",
            itens: ["Desenvolvimento a partir de desenho arquitetônico", "Atendimento consultivo especializado", "Mão de obra altamente qualificada", "Garantia de fabricação e instalação"],
            mensagem: "Olá, Artmetal! Tenho um projeto personalizado e gostaria de falar com um especialista."
        }
    };

    // ==========================================
    // 2. ESTADO CENTRAL DO CONFIGURADOR
    // ==========================================
    const projeto = {
        etapaAtual: 1,
        modelo: 'chapa',
        largura: 3.50,
        altura: 2.20,
        quantidade: 1,
        areaTotal: 7.70,
        abertura: 'basculante',
        automacao: 'noveSegundos',
        galvanizado: 'sim',
        social: 'sim',
        valorCalculado: 0,
        cliente: {
            nome: "",
            whatsapp: "",
            email: "",
            cidade: "",
            observacoes: ""
        }
    };

    // ==========================================
    // 3. SELETORES DO DOM
    // ==========================================
    const inputLargura = document.getElementById('input-largura');
    const inputAltura = document.getElementById('input-altura');
    const inputQuantidade = document.getElementById('input-quantidade');

    const displayAreaCalculada = document.getElementById('display-area-calculada');
    const displayLivePriceSidebar = document.getElementById('sidebar-live-price');
    const displayLivePriceMobile = document.getElementById('mobile-live-price');

    const blueprintWVal = document.getElementById('blueprint-w-val');
    const blueprintHVal = document.getElementById('blueprint-h-val');
    const blueprintImgPreview = document.getElementById('blueprint-img-preview');
    const sidebarImgThumb = document.getElementById('sidebar-img-thumb');
    const sidebarModelTitle = document.getElementById('sidebar-model-title');
    const sidebarMeasuresInfo = document.getElementById('sidebar-measures-info');

    // ==========================================
    // 4. LÓGICA DO STEPPER DO CONFIGURADOR
    // ==========================================
    window.irParaEtapa = function(etapa) {
        if (etapa < 1 || etapa > 5) return;

        projeto.etapaAtual = etapa;

        // Atualiza botões no topo
        document.querySelectorAll('.step-item').forEach(item => {
            const stepNum = parseInt(item.getAttribute('data-step'), 10);
            if (stepNum <= etapa) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Visibilidade dos painéis
        document.querySelectorAll('.config-step-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`step-pane-${etapa}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        // Se for para a etapa de resumo, atualizar dados
        if (etapa === 4) {
            atualizarTelaResumo();
        }

        // Rolar até o configurador
        const secConfig = document.getElementById('configurador');
        if (secConfig) {
            secConfig.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Botões Avançar / Voltar
    document.querySelectorAll('.btn-next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const proxima = parseInt(btn.getAttribute('data-next'), 10);
            irParaEtapa(proxima);
        });
    });

    document.querySelectorAll('.btn-prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const anterior = parseInt(btn.getAttribute('data-prev'), 10);
            irParaEtapa(anterior);
        });
    });

    // ==========================================
    // 5. CÁLCULO DE ORÇAMENTO EM TEMPO REAL
    // ==========================================
    function calcularOrcamento() {
        if (!inputLargura || !inputAltura || !inputQuantidade) return;

        projeto.largura = parseFloat(inputLargura.value) || 0;
        projeto.altura = parseFloat(inputAltura.value) || 0;
        projeto.quantidade = parseInt(inputQuantidade.value, 10) || 1;

        // Área Total
        projeto.areaTotal = (projeto.largura * projeto.altura) * projeto.quantidade;

        // Preço base por m²
        const precoMetro = configuracaoPrecos.modelos[projeto.modelo] || 0;
        let subtotalBase = projeto.areaTotal * precoMetro;

        // Galvanização
        if (projeto.galvanizado === 'sim') {
            subtotalBase += (subtotalBase * configuracaoPrecos.galvanizado.sim);
        }

        // Adicionais fixos
        const precoAbertura = configuracaoPrecos.abertura[projeto.abertura] || 0;
        const precoAutomacao = configuracaoPrecos.automacao[projeto.automacao] || 0;
        const precoSocial = configuracaoPrecos.social[projeto.social] || 0;

        const subtotalAdicionais = precoAbertura + precoAutomacao + precoSocial;

        // Valor Calculado Total
        projeto.valorCalculado = subtotalBase + subtotalAdicionais;

        renderizarPrecos(subtotalBase, subtotalAdicionais);
    }

    function renderizarPrecos(subtotalBase = 0, subtotalAdicionais = 0) {
        const valorFormatado = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (displayAreaCalculada) displayAreaCalculada.innerText = `${projeto.areaTotal.toFixed(2).replace('.', ',')} m²`;
        if (displayLivePriceSidebar) displayLivePriceSidebar.innerText = valorFormatado;
        if (displayLivePriceMobile) displayLivePriceMobile.innerText = valorFormatado;

        if (blueprintWVal) blueprintWVal.innerText = `${projeto.largura.toFixed(2)}m`;
        if (blueprintHVal) blueprintHVal.innerText = `${projeto.altura.toFixed(2)}m`;
        if (sidebarMeasuresInfo) sidebarMeasuresInfo.innerText = `${projeto.largura.toFixed(2)}m x ${projeto.altura.toFixed(2)}m (${projeto.quantidade} un)`;

        // Atualizar também no resumo em texto se elementos existirem
        const elemSubBase = document.getElementById('sum-subtotal-base');
        const elemSubAdic = document.getElementById('sum-subtotal-adicionais');
        if (elemSubBase) elemSubBase.innerText = subtotalBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (elemSubAdic) elemSubAdic.innerText = subtotalAdicionais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // ==========================================
    // 6. SELEÇÃO DE MODELOS & INPUTS
    // ==========================================
    document.querySelectorAll('.card-model-select').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.card-model-select').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            projeto.modelo = card.getAttribute('data-model');

            // Atualiza imagens e preview
            const novaImg = modelosImagens[projeto.modelo] || modelosImagens.chapa;
            if (blueprintImgPreview) blueprintImgPreview.src = novaImg;
            if (sidebarImgThumb) sidebarImgThumb.src = novaImg;

            const titulos = {
                chapa: "Portão de Chapa",
                tubo: "Portão Tubular",
                chapaTubo: "Chapa & Tubo (Misto)",
                veneziana: "Portão Veneziana"
            };
            if (sidebarModelTitle) sidebarModelTitle.innerText = titulos[projeto.modelo] || "Portão Personalizado";

            calcularOrcamento();
        });
    });

    // Inputs de Medidas
    if (inputLargura) inputLargura.addEventListener('input', calcularOrcamento);
    if (inputAltura) inputAltura.addEventListener('input', calcularOrcamento);
    if (inputQuantidade) inputQuantidade.addEventListener('input', calcularOrcamento);

    // Opcionais Radios
    function escutarGrupoRadio(idGrupo, chaveProjeto) {
        const container = document.getElementById(idGrupo);
        if (!container) return;

        container.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                container.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const radio = card.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    projeto[chaveProjeto] = radio.value;
                }
                calcularOrcamento();
            });
        });
    }

    escutarGrupoRadio('group-abertura', 'abertura');
    escutarGrupoRadio('group-automacao', 'automacao');
    escutarGrupoRadio('group-galvanizado', 'galvanizado');
    escutarGrupoRadio('group-social', 'social');

    // ==========================================
    // 7. ATUALIZAÇÃO DO RESUMO & IMPRESSÃO
    // ==========================================
    function atualizarTelaResumo() {
        const nomesModelos = {
            chapa: "Portão de Chapa Fechada",
            tubo: "Portão Tubular Gradil",
            chapaTubo: "Chapa e Tubo Misto",
            veneziana: "Portão Veneziana"
        };
        const nomesAbertura = { basculante: "Basculante", correr: "De Correr", pivotante: "Pivotante", social: "Social Apenas" };
        const nomesAutomacao = { nao: "Manual (Sem Motor)", noveSegundos: "Motor Rápido (9s)", dezoitoSegundos: "Motor Padrão (18s)" };

        const elemModelo = document.getElementById('sum-modelo');
        const elemMedidas = document.getElementById('sum-medidas');
        const elemArea = document.getElementById('sum-area');
        const elemAbertura = document.getElementById('sum-abertura');
        const elemAutomacao = document.getElementById('sum-automacao');
        const elemGalv = document.getElementById('sum-galvanizado');
        const elemSocial = document.getElementById('sum-social');
        const elemTotal = document.getElementById('sum-total-final');

        if (elemModelo) elemModelo.innerText = nomesModelos[projeto.modelo] || "Modelo Especial";
        if (elemMedidas) elemMedidas.innerText = `${projeto.largura.toFixed(2)}m x ${projeto.altura.toFixed(2)}m (${projeto.quantidade} un)`;
        if (elemArea) elemArea.innerText = `${projeto.areaTotal.toFixed(2).replace('.', ',')} m²`;
        if (elemAbertura) elemAbertura.innerText = nomesAbertura[projeto.abertura] || projeto.abertura;
        if (elemAutomacao) elemAutomacao.innerText = nomesAutomacao[projeto.automacao] || projeto.automacao;
        if (elemGalv) elemGalv.innerText = projeto.galvanizado === 'sim' ? "Sim (Incluso)" : "Não";
        if (elemSocial) elemSocial.innerText = projeto.social === 'sim' ? "Sim (Embutido)" : "Não";

        if (elemTotal) elemTotal.innerText = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const hoje = new Date();
        const elemData = document.getElementById('summary-current-date');
        if (elemData) elemData.innerText = `Data: ${hoje.toLocaleDateString('pt-BR')}`;

        // Atualiza imagem do portão no resumo se houver
        const imgPrint = document.getElementById('print-gate-image');
        if (imgPrint) {
            imgPrint.src = modelosImagens[projeto.modelo] || modelosImagens.chapa;
        }

        // Atualiza dados do cliente na área imprimível se informados
        const printClientName = document.getElementById('print-client-name');
        const printClientPhone = document.getElementById('print-client-phone');
        const printClientEmail = document.getElementById('print-client-email');
        const printClientCity = document.getElementById('print-client-city');

        if (printClientName) printClientName.innerText = projeto.cliente.nome || "Não informado";
        if (printClientPhone) printClientPhone.innerText = projeto.cliente.whatsapp || "Não informado";
        if (printClientEmail) printClientEmail.innerText = projeto.cliente.email || "Não informado";
        if (printClientCity) printClientCity.innerText = projeto.cliente.cidade || "Não informado";
    }

    // Botão de Impressão do Orçamento
    const btnPrint = document.getElementById('btn-print-quote');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            atualizarTelaResumo();
            window.print();
        });
    }

    // ==========================================
    // 8. FILTROS DO CATÁLOGO & BOTÕES PERSONALIZAR
    // ==========================================
    const filterBtns = document.querySelectorAll('.btn-filter');
    const catalogCards = document.querySelectorAll('.card-portao');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            catalogCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Botões PERSONALIZAR no Catálogo
    document.querySelectorAll('.btn-select-model').forEach(btn => {
        btn.addEventListener('click', () => {
            const modelKey = btn.getAttribute('data-model');
            const targetCard = document.querySelector(`.card-model-select[data-model="${modelKey}"]`);

            if (targetCard) {
                targetCard.click();
            }

            irParaEtapa(1);
            const configuradorSec = document.getElementById('configurador');
            if (configuradorSec) {
                configuradorSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 9. MODAL DINÂMICO PARA CATEGORIAS / SERVIÇOS
    // ==========================================
    const modalServico = document.getElementById('modal-servico');
    const modalServicoTitulo = document.getElementById('modal-servico-titulo');
    const modalServicoImg = document.getElementById('modal-servico-img');
    const modalServicoDesc = document.getElementById('modal-servico-desc');
    const modalServicoLista = document.getElementById('modal-servico-lista');
    const modalServicoBtn = document.getElementById('modal-servico-btn');
    const modalServicoClose = document.getElementById('modal-servico-close');

    window.abrirServicoModal = function(chaveServico) {
        const dados = dadosServicos[chaveServico];
        if (!dados || !modalServico) return;

        if (modalServicoTitulo) modalServicoTitulo.innerText = dados.titulo;
        if (modalServicoImg) modalServicoImg.src = dados.imagem;
        if (modalServicoDesc) modalServicoDesc.innerText = dados.descricao;

        if (modalServicoLista) {
            modalServicoLista.innerHTML = '';
            dados.itens.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${item}</span>`;
                modalServicoLista.appendChild(li);
            });
            if (window.lucide) window.lucide.createIcons();
        }

        if (modalServicoBtn) {
            const url = `https://wa.me/${whatsappArtmetal}?text=${encodeURIComponent(dados.mensagem)}`;
            modalServicoBtn.href = url;
        }

        modalServico.classList.add('active');
    };

    if (modalServicoClose) {
        modalServicoClose.addEventListener('click', () => {
            modalServico.classList.remove('active');
        });
    }

    // Fechar modais ao clicar no overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Eventos nos Links do Menu e Cards de Serviços
    document.querySelectorAll('[data-open-service]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const servico = elem.getAttribute('data-open-service');
            abrirServicoModal(servico);
        });
    });

    // ==========================================
    // 10. ENVIO FORMULÁRIO LEADS / WHATSAPP
    // ==========================================
    const formLead = document.getElementById('form-configurator-lead');
    if (formLead) {
        formLead.addEventListener('submit', (e) => {
            e.preventDefault();

            projeto.cliente.nome = document.getElementById('lead-nome')?.value || "";
            projeto.cliente.whatsapp = document.getElementById('lead-whatsapp')?.value || "";
            projeto.cliente.email = document.getElementById('lead-email')?.value || "Não informado";
            projeto.cliente.cidade = document.getElementById('lead-cidade')?.value || "";
            projeto.cliente.observacoes = document.getElementById('lead-observacoes')?.value || "Nenhuma";

            atualizarTelaResumo();

            const mensagem = gerarMensagemWhatsApp();
            const urlWhatsApp = `https://wa.me/${whatsappArtmetal}?text=${encodeURIComponent(mensagem)}`;

            window.open(urlWhatsApp, '_blank');
        });
    }

    function gerarMensagemWhatsApp() {
        const nomesModelos = { chapa: "Portão de Chapa", tubo: "Portão Tubular", chapaTubo: "Chapa e Tubo Misto", veneziana: "Portão Veneziana" };
        const valorFormatado = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return `*NOVA SOLICITAÇÃO DE ORÇAMENTO - ARTMETAL*

Olá, equipe Artmetal! Montei meu portão no site e gostaria de solicitar a validação técnica.

*CONFIGURAÇÃO DO PROJETO:*
- *Modelo:* ${nomesModelos[projeto.modelo] || 'Personalizado'}
- *Medidas:* ${projeto.largura.toFixed(2)}m (largura) x ${projeto.altura.toFixed(2)}m (altura)
- *Quantidade:* ${projeto.quantidade}
- *Área Total:* ${projeto.areaTotal.toFixed(2)} m²
- *Abertura:* ${projeto.abertura}
- *Motor/Automação:* ${projeto.automacao}
- *Galvanização:* ${projeto.galvanizado === 'sim' ? 'Sim' : 'Não'}
- *Social Embutido:* ${projeto.social === 'sim' ? 'Sim' : 'Não'}

*VALOR ESTIMADO:* ${valorFormatado}

*DADOS DO CLIENTE:*
- *Nome:* ${projeto.cliente.nome}
- *WhatsApp:* ${projeto.cliente.whatsapp}
- *E-mail:* ${projeto.cliente.email}
- *Cidade/Bairro:* ${projeto.cliente.cidade}
- *Observações:* ${projeto.cliente.observacoes}

Aguardo o contato para combinarmos a avaliação técnica!`;
    }

    // ==========================================
    // 11. NAVEGAÇÃO MOBILE & RECURSOS INTERATIVOS
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown em dispositivos móveis
    const dropdownItem = document.querySelector('.dropdown-item');
    if (dropdownItem) {
        dropdownItem.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                dropdownItem.classList.toggle('open');
            }
        });
    }

    // Modal Pagamento
    const modalPagamento = document.getElementById('modal-pagamento');
    const btnOpenPay = document.getElementById('btn-open-payment-modal');
    const btnClosePay = document.getElementById('btn-close-modal');

    if (btnOpenPay && modalPagamento) {
        btnOpenPay.addEventListener('click', () => modalPagamento.classList.add('active'));
    }
    if (btnClosePay && modalPagamento) {
        btnClosePay.addEventListener('click', () => modalPagamento.classList.remove('active'));
    }

    // Lightbox Galeria
    const modalLightbox = document.getElementById('modal-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnCloseLightbox = document.getElementById('btn-close-lightbox');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightboxImg && modalLightbox) {
                lightboxImg.src = img.src;
                modalLightbox.classList.add('active');
            }
        });
    });

    if (btnCloseLightbox && modalLightbox) {
        btnCloseLightbox.addEventListener('click', () => modalLightbox.classList.remove('active'));
    }

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(accHeader => {
        accHeader.addEventListener('click', () => {
            const item = accHeader.parentElement;
            if (item) item.classList.toggle('active');
        });
    });

    // Ano Atual no Rodapé
    const currentYearElem = document.getElementById('current-year');
    if (currentYearElem) {
        currentYearElem.innerText = new Date().getFullYear();
    }

    // Inicialização do cálculo
    calcularOrcamento();

    // Inicialização dos ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }
});