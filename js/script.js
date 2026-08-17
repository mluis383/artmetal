/**
 * ARTMETAL - Serralheria & Soluções sob Medida
 * Script Principal, Configurador Digital e Impressão A4
 */

document.addEventListener('DOMContentLoaded', () => {

    const configuracaoPrecos = {
        modelos: {
            chapa: 380,      
            tubo: 320,       
            chapaTubo: 350,  
            veneziana: 390   
        },
        abertura: {
            basculante: 450, 
            correr: 250,
            pivotante: 350
        },
        automacao: {
            nao: 0,
            noveSegundos: 850,
            dezoitoSegundos: 600
        },
        galvanizado: {
            sim: 0.15, // Adiciona 15% ao subtotal base
            nao: 0
        },
        social: {
            sim: 300,  
            nao: 0
        }
    };

    const modelosImagens = {
        chapa: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        tubo: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
        chapaTubo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        veneziana: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    };

    const whatsappArtmetal = "5511975335113";

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

    const inputLargura = document.getElementById('input-largura');
    const inputAltura = document.getElementById('input-altura');
    const inputQuantidade = document.getElementById('input-quantidade');

    const displayAreaCalculada = document.getElementById('display-area-calculada');
    const displayLivePriceSidebar = document.getElementById('sidebar-live-price');

    const blueprintWVal = document.getElementById('blueprint-w-val');
    const blueprintHVal = document.getElementById('blueprint-h-val');
    const blueprintImgPreview = document.getElementById('blueprint-img-preview');
    const sidebarImgThumb = document.getElementById('sidebar-img-thumb');
    const sidebarModelTitle = document.getElementById('sidebar-model-title');
    const sidebarMeasuresInfo = document.getElementById('sidebar-measures-info');

    const inputLeadNome = document.getElementById('lead-nome');
    const inputLeadWhatsapp = document.getElementById('lead-whatsapp');
    const inputLeadEmail = document.getElementById('lead-email');
    const inputLeadCidade = document.getElementById('lead-cidade');
    const inputLeadObservacoes = document.getElementById('lead-observacoes');

    window.irParaEtapa = function(etapa) {
        if (etapa < 1 || etapa > 5) return;

        projeto.etapaAtual = etapa;

        document.querySelectorAll('.step-item').forEach(item => {
            const stepNum = parseInt(item.getAttribute('data-step'), 10);
            if (stepNum <= etapa) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.config-step-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`step-pane-${etapa}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        if (etapa >= 4) {
            atualizarDadosCliente();
            atualizarTelaResumo();
        }

        const secConfig = document.getElementById('configurador');
        if (secConfig) {
            secConfig.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    function validarEObterMedidas() {
        if (!inputLargura || !inputAltura || !inputQuantidade) return;

        let larg = parseFloat(inputLargura.value);
        let alt = parseFloat(inputAltura.value);
        let qtd = parseInt(inputQuantidade.value, 10);

        if (isNaN(larg) || larg < 1.0) larg = 1.0;
        if (larg > 10.0) larg = 10.0;

        if (isNaN(alt) || alt < 1.0) alt = 1.0;
        if (alt > 5.0) alt = 5.0;

        if (isNaN(qtd) || qtd < 1) qtd = 1;
        if (qtd > 10) qtd = 10;

        projeto.largura = larg;
        projeto.altura = alt;
        projeto.quantidade = qtd;
    }

    function calcularOrcamento() {
        validarEObterMedidas();

        projeto.areaTotal = (projeto.largura * projeto.altura) * projeto.quantidade;

        const precoMetro = configuracaoPrecos.modelos[projeto.modelo] || 0;
        let subtotalBase = projeto.areaTotal * precoMetro;

        if (projeto.galvanizado === 'sim') {
            subtotalBase += (subtotalBase * configuracaoPrecos.galvanizado.sim);
        }

        const precoAbertura = configuracaoPrecos.abertura[projeto.abertura] || 0;
        const precoAutomacao = configuracaoPrecos.automacao[projeto.automacao] || 0;
        const precoSocial = configuracaoPrecos.social[projeto.social] || 0;

        const subtotalAdicionais = precoAbertura + precoAutomacao + precoSocial;

        projeto.valorCalculado = subtotalBase + subtotalAdicionais;

        renderizarPrecos(subtotalBase, subtotalAdicionais);
    }

    function renderizarPrecos(subtotalBase = 0, subtotalAdicionais = 0) {
        const valorFormatado = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (displayAreaCalculada) displayAreaCalculada.innerText = `${projeto.areaTotal.toFixed(2).replace('.', ',')} m²`;
        if (displayLivePriceSidebar) displayLivePriceSidebar.innerText = valorFormatado;

        if (blueprintWVal) blueprintWVal.innerText = `${projeto.largura.toFixed(2)}m`;
        if (blueprintHVal) blueprintHVal.innerText = `${projeto.altura.toFixed(2)}m`;
        if (sidebarMeasuresInfo) sidebarMeasuresInfo.innerText = `${projeto.largura.toFixed(2)}m x ${projeto.altura.toFixed(2)}m (${projeto.quantidade} un)`;

        const elemSubBase = document.getElementById('sum-subtotal-base');
        const elemSubAdic = document.getElementById('sum-subtotal-adicionais');
        if (elemSubBase) elemSubBase.innerText = subtotalBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (elemSubAdic) elemSubAdic.innerText = subtotalAdicionais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function atualizarDadosCliente() {
        projeto.cliente.nome = inputLeadNome ? inputLeadNome.value.trim() : "";
        projeto.cliente.whatsapp = inputLeadWhatsapp ? inputLeadWhatsapp.value.trim() : "";
        projeto.cliente.email = inputLeadEmail ? inputLeadEmail.value.trim() : "";
        projeto.cliente.cidade = inputLeadCidade ? inputLeadCidade.value.trim() : "";
        projeto.cliente.observacoes = inputLeadObservacoes ? inputLeadObservacoes.value.trim() : "";
    }

    document.querySelectorAll('.card-model-select').forEach(card => {
        const selecionarCard = () => {
            document.querySelectorAll('.card-model-select').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            projeto.modelo = card.getAttribute('data-model');

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
        };

        card.addEventListener('click', selecionarCard);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selecionarCard();
            }
        });
    });

    if (inputLargura) {
        inputLargura.addEventListener('input', calcularOrcamento);
        inputLargura.addEventListener('change', calcularOrcamento);
    }
    if (inputAltura) {
        inputAltura.addEventListener('input', calcularOrcamento);
        inputAltura.addEventListener('change', calcularOrcamento);
    }
    if (inputQuantidade) {
        inputQuantidade.addEventListener('input', calcularOrcamento);
        inputQuantidade.addEventListener('change', calcularOrcamento);
    }

    function escutarGrupoRadio(idGrupo, chaveProjeto) {
        const container = document.getElementById(idGrupo);
        if (!container) return;

        container.querySelectorAll('.radio-card').forEach(card => {
            const radio = card.querySelector('input[type="radio"]');

            const marcarOpcao = () => {
                container.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                if (radio) {
                    radio.checked = true;
                    projeto[chaveProjeto] = radio.value;
                }
                calcularOrcamento();
            };

            card.addEventListener('click', marcarOpcao);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    marcarOpcao();
                }
            });
        });
    }

    escutarGrupoRadio('group-abertura', 'abertura');
    escutarGrupoRadio('group-automacao', 'automacao');
    escutarGrupoRadio('group-galvanizado', 'galvanizado');
    escutarGrupoRadio('group-social', 'social');

    function atualizarTelaResumo() {
        const nomesModelos = {
            chapa: "Portão de Chapa Fechada",
            tubo: "Portão Tubular Gradil",
            chapaTubo: "Chapa e Tubo Misto",
            veneziana: "Portão Veneziana"
        };
        const nomesAbertura = { basculante: "Basculante", correr: "De Correr", pivotante: "Pivotante" };
        const nomesAutomacao = { nao: "Manual (Sem Motor)", noveSegundos: "Motor Rápido (9s)", dezoitoSegundos: "Motor Padrão (18s)" };

        const elemModelo = document.getElementById('sum-modelo');
        const elemMedidas = document.getElementById('sum-medidas');
        const elemArea = document.getElementById('sum-area');
        const elemAbertura = document.getElementById('sum-abertura');
        const elemAutomacao = document.getElementById('sum-automacao');
        const elemGalv = document.getElementById('sum-galvanizado');
        const elemSocial = document.getElementById('sum-social');
        const elemTotal = document.getElementById('sum-total-final');

        const textoGalvanizado = projeto.galvanizado === 'sim' ? "Sim (+15% ao subtotal base)" : "Não";

        if (elemModelo) elemModelo.innerText = nomesModelos[projeto.modelo] || "Modelo Especial";
        if (elemMedidas) elemMedidas.innerText = `${projeto.largura.toFixed(2)}m x ${projeto.altura.toFixed(2)}m (${projeto.quantidade} un)`;
        if (elemArea) elemArea.innerText = `${projeto.areaTotal.toFixed(2).replace('.', ',')} m²`;
        if (elemAbertura) elemAbertura.innerText = nomesAbertura[projeto.abertura] || projeto.abertura;
        if (elemAutomacao) elemAutomacao.innerText = nomesAutomacao[projeto.automacao] || projeto.automacao;
        if (elemGalv) elemGalv.innerText = textoGalvanizado;
        if (elemSocial) elemSocial.innerText = projeto.social === 'sim' ? "Sim (Embutido)" : "Não";

        if (elemTotal) elemTotal.innerText = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString('pt-BR');
        const elemData = document.getElementById('summary-current-date');
        const elemDataPrint = document.getElementById('print-date-display');
        if (elemData) elemData.innerText = `Data: ${dataFormatada}`;
        if (elemDataPrint) elemDataPrint.innerText = `Data: ${dataFormatada}`;

        // Atualização dos campos exclusivos da Impressão
        const printModelo = document.getElementById('print-sum-modelo');
        const printMedidas = document.getElementById('print-sum-medidas');
        const printArea = document.getElementById('print-sum-area');
        const printAbertura = document.getElementById('print-sum-abertura');
        const printAutomacao = document.getElementById('print-sum-automacao');
        const printGalv = document.getElementById('print-sum-galvanizado');
        const printSocial = document.getElementById('print-sum-social');

        if (printModelo) printModelo.innerText = nomesModelos[projeto.modelo] || "Modelo Especial";
        if (printMedidas) printMedidas.innerText = `${projeto.largura.toFixed(2)}m x ${projeto.altura.toFixed(2)}m (${projeto.quantidade} un)`;
        if (printArea) printArea.innerText = `${projeto.areaTotal.toFixed(2).replace('.', ',')} m²`;
        if (printAbertura) printAbertura.innerText = nomesAbertura[projeto.abertura] || projeto.abertura;
        if (printAutomacao) printAutomacao.innerText = nomesAutomacao[projeto.automacao] || projeto.automacao;
        if (printGalv) printGalv.innerText = textoGalvanizado;
        if (printSocial) printSocial.innerText = projeto.social === 'sim' ? "Sim (Embutido)" : "Não";

        const imgPrint = document.getElementById('print-gate-image');
        if (imgPrint) {
            imgPrint.src = modelosImagens[projeto.modelo] || modelosImagens.chapa;
        }

        const printClientName = document.getElementById('print-client-name');
        const printClientPhone = document.getElementById('print-client-phone');
        const printClientEmail = document.getElementById('print-client-email');
        const printClientCity = document.getElementById('print-client-city');
        const printTotalVal = document.getElementById('print-total-price');

        if (printClientName) printClientName.innerText = projeto.cliente.nome || "Não informado";
        if (printClientPhone) printClientPhone.innerText = projeto.cliente.whatsapp || "Não informado";
        if (printClientEmail) printClientEmail.innerText = projeto.cliente.email || "Não informado";
        if (printClientCity) printClientCity.innerText = projeto.cliente.cidade || "Não informado";
        if (printTotalVal) printTotalVal.innerText = projeto.valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const btnPrint = document.getElementById('btn-print-quote');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            atualizarTelaResumo();
            window.print();
        });
    }

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

            window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
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
- *Galvanização:* ${projeto.galvanizado === 'sim' ? 'Sim (+15%)' : 'Não'}
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

    // Controle de Navegação Mobile & Dropdown
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggle = document.getElementById('dropdown-servicos-toggle');
    const dropdownItem = document.getElementById('dropdown-servicos-item');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const foiAberto = navMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', foiAberto ? 'true' : 'false');
        });
    }

    if (dropdownToggle && dropdownItem) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const foiAberto = dropdownItem.classList.toggle('open');
                dropdownToggle.setAttribute('aria-expanded', foiAberto ? 'true' : 'false');
            }
        });
    }

    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && link.classList.contains('dropdown-toggle')) return;
            if (navMenu) {
                navMenu.classList.remove('active');
                if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
            if (dropdownItem) {
                dropdownItem.classList.remove('open');
                if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const currentYearElem = document.getElementById('current-year');
    if (currentYearElem) currentYearElem.innerText = new Date().getFullYear();

    // Inicialização do cálculo para sincronizar com o carregamento da página
    calcularOrcamento();

    if (window.lucide) {
        window.lucide.createIcons();
    }
});