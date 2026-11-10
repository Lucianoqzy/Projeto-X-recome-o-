
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS DO SITE
  const campoBusca = document.querySelector("#buscarDoacao");
  const cards = document.querySelectorAll(".card-doacao");
  const botoesFiltro = document.querySelectorAll(
    ".filtros button[data-categoria]"
  );
  const mensagemSemResultados = document.querySelector(
    "#mensagemSemResultados"
  );

  let categoriaAtual = "todos";

  // PESQUISA E FILTROS DE DOAÇÕES
  function filtrarDoacoes() {
    const pesquisa = campoBusca
      ? campoBusca.value.toLowerCase().trim()
      : "";

    let quantidadeVisivel = 0;

    cards.forEach((card) => {
      const texto = card.textContent.toLowerCase();
      const categoria = (
        card.dataset.categoria || ""
      ).toLowerCase();

      const correspondePesquisa = texto.includes(pesquisa);
      const correspondeCategoria =
        categoriaAtual === "todos" ||
        categoria === categoriaAtual;

      const mostrar =
        correspondePesquisa && correspondeCategoria;

      card.hidden = !mostrar;

      if (mostrar) {
        quantidadeVisivel++;
      }
    });

    if (mensagemSemResultados) {
      mensagemSemResultados.hidden = quantidadeVisivel > 0;
    }
  }

  if (campoBusca) {
    campoBusca.addEventListener("input", filtrarDoacoes);
  }

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      categoriaAtual = (
        botao.dataset.categoria || "todos"
      ).toLowerCase();

      botoesFiltro.forEach((outroBotao) => {
        outroBotao.classList.remove("ativo");
        outroBotao.setAttribute("aria-pressed", "false");
      });

      botao.classList.add("ativo");
      botao.setAttribute("aria-pressed", "true");

      filtrarDoacoes();
    });
  });

  // BOTÕES DE INTERESSE NAS DOAÇÕES
  document.querySelectorAll(".btnInteresse").forEach((botao) => {
    botao.addEventListener("click", () => {
      const alimento = botao.dataset.alimento || "esta doação";

      alert(
        `Você demonstrou interesse em ${alimento}!\n\n` +
        "Esta é uma demonstração do Recomeço. " +
        "Para conectar doadores e instituições, " +
        "ainda será necessário criar um sistema de cadastro e contato."
      );
    });
  });

  // FORMULÁRIO DE DOAÇÃO
  const formDoacao = document.querySelector("#formDoacao");
  const resultadoDoacao = document.querySelector("#resultadoDoacao");

  if (formDoacao) {
    formDoacao.addEventListener("submit", (evento) => {
      evento.preventDefault();

      if (!formDoacao.reportValidity()) return;

      if (resultadoDoacao) {
        resultadoDoacao.textContent =
          "Formulário preenchido! Esta é uma demonstração: " +
          "a doação ainda não foi cadastrada nem publicada.";
        resultadoDoacao.hidden = false;
      } else {
        alert(
          "Formulário preenchido! O cadastro real ainda não está conectado."
        );
      }

      formDoacao.reset();
    });
  }

  // FORMULÁRIO DE CADASTRO DE INSTITUIÇÃO
  const formInstituicao = document.querySelector("#formInstituicao");
  const resultadoInstituicao = document.querySelector(
    "#resultadoInstituicao"
  );

  if (formInstituicao) {
    formInstituicao.addEventListener("submit", (evento) => {
      evento.preventDefault();

      if (!formInstituicao.reportValidity()) return;

      if (resultadoInstituicao) {
        resultadoInstituicao.textContent =
          "Formulário preenchido! Esta é uma demonstração: " +
          "os dados da instituição não foram salvos.";
        resultadoInstituicao.hidden = false;
      } else {
        alert(
          "Formulário preenchido! O cadastro real ainda não está conectado."
        );
      }

      formInstituicao.reset();
    });
  }

  // BOTÃO PARA IR ATÉ O FORMULÁRIO DE DOAÇÃO
  const botaoQueroDoar = document.querySelector("#btnQueroDoar");
  const formularioDoacao = document.querySelector("#formulario-doacao");

  if (botaoQueroDoar && formularioDoacao) {
    botaoQueroDoar.addEventListener("click", () => {
      formularioDoacao.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  // JANELA DE ENTRADA
  const modalEntrar = document.querySelector("#modalEntrar");
  const botaoEntrar = document.querySelector("#btnEntrar");
  const botaoFecharEntrar = document.querySelector("#fecharEntrar");
  const formEntrar = document.querySelector("#formEntrar");
  const resultadoLogin = document.querySelector("#resultadoLogin");

  if (botaoEntrar && modalEntrar) {
    botaoEntrar.addEventListener("click", () => {
      if (typeof modalEntrar.showModal === "function") {
        modalEntrar.showModal();
      } else {
        alert("Seu navegador não oferece suporte a esta janela.");
      }
    });
  }

  if (botaoFecharEntrar && modalEntrar) {
    botaoFecharEntrar.addEventListener("click", () => {
      modalEntrar.close();
    });
  }

  if (formEntrar) {
    formEntrar.addEventListener("submit", (evento) => {
      evento.preventDefault();

      if (!formEntrar.reportValidity()) return;

      if (resultadoLogin) {
        resultadoLogin.textContent =
          "A tela de entrada é apenas demonstrativa. " +
          "O login ainda não está conectado a um sistema real.";
        resultadoLogin.hidden = false;
      } else {
        alert(
          "O login ainda não está conectado a um sistema real."
        );
      }
    });
  }

  // ANO ATUAL NO RODAPÉ, SE HOUVER ESSE ELEMENTO
  const anoAtual = document.querySelector("#anoAtual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // ATUALIZA OS FILTROS AO ABRIR A PÁGINA
  filtrarDoacoes();
});

/* ========================================
   SISTEMA DE RECICLAGEM DO RECOMEÇO
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DO HTML
    const formularioReciclagem = document.getElementById("formReciclagem");
    const tipoReciclavel = document.getElementById("tipoReciclavel");
    const pesoReciclavel = document.getElementById("pesoReciclavel");
    const saldoPontos = document.getElementById("saldoPontos");
    const resultadoReciclagem = document.getElementById("resultadoReciclagem");
    const historicoReciclagem = document.getElementById("historicoReciclagem");
    const botoesResgate = document.querySelectorAll(".btnResgatar");

    // PONTOS POR QUILOGRAMA
    const pontuacaoMateriais = {
        aluminio: 30,
        pet: 10,
        papel: 5,
        vidro: 3
    };

    // NOMES DOS MATERIAIS
    const nomesMateriais = {
        aluminio: "Latas de alumínio",
        pet: "Garrafas PET",
        papel: "Papel e papelão",
        vidro: "Vidro"
    };

    // CHAVES DE SALVAMENTO
    const chaveSaldo = "recomeco-pontos-v1";
    const chaveHistorico = "recomeco-historico-v1";

    // RECUPERA OS DADOS SALVOS
    let pontos = 0;
    let historico = [];

    try {
        const saldoSalvo = Number(localStorage.getItem(chaveSaldo));
        pontos = Number.isFinite(saldoSalvo) && saldoSalvo >= 0
            ? saldoSalvo
            : 0;

        const historicoSalvo = JSON.parse(
            localStorage.getItem(chaveHistorico) || "[]"
        );

        historico = Array.isArray(historicoSalvo)
            ? historicoSalvo
            : [];
    } catch (erro) {
        console.warn("Não foi possível recuperar os dados salvos.", erro);
    }

    // SALVA OS DADOS
    function salvarDados() {
        try {
            localStorage.setItem(chaveSaldo, String(pontos));
            localStorage.setItem(chaveHistorico, JSON.stringify(historico));
        } catch (erro) {
            console.warn("Não foi possível salvar os dados.", erro);
            mostrarMensagem(
                "Não foi possível salvar os dados neste navegador.",
                false
            );
        }
    }

    // ATUALIZA O SALDO NA TELA
    function atualizarSaldo() {
        saldoPontos.textContent = `${pontos} pontos`;
    }

    // MOSTRA MENSAGENS AO USUÁRIO
    function mostrarMensagem(mensagem, sucesso = true) {
        resultadoReciclagem.hidden = false;
        resultadoReciclagem.textContent = mensagem;

        resultadoReciclagem.style.background = sucesso
            ? "var(--verde-claro)"
            : "#fce8e8";

        resultadoReciclagem.style.color = sucesso
            ? "var(--verde-escuro)"
            : "#9b2929";
    }

    // ATUALIZA O HISTÓRICO
    function atualizarHistorico() {
        historicoReciclagem.replaceChildren();

        if (historico.length === 0) {
            const item = document.createElement("li");
            item.textContent = "Nenhuma atividade registrada ainda.";
            historicoReciclagem.appendChild(item);
            return;
        }

        historico.slice(0, 20).forEach(registro => {
            const item = document.createElement("li");
            item.textContent = registro;
            historicoReciclagem.appendChild(item);
        });
    }

    // ADICIONA UMA ATIVIDADE AO HISTÓRICO
    function registrarHistorico(descricao) {
        const data = new Date().toLocaleString("pt-BR");

        historico.unshift(`${data} — ${descricao}`);

        // Mantém somente os últimos 50 registros
        historico = historico.slice(0, 50);

        atualizarHistorico();
    }

    // REGISTRO DE RECICLÁVEIS
    formularioReciclagem.addEventListener("submit", function(event) {
        event.preventDefault();

        const material = tipoReciclavel.value;
        const peso = Number(pesoReciclavel.value);

        if (!pontuacaoMateriais[material]) {
            mostrarMensagem("Selecione um material válido.", false);
            return;
        }

        if (!Number.isFinite(peso) || peso < 0.1 || peso > 100) {
            mostrarMensagem(
                "Informe um peso entre 0,1 kg e 100 kg.",
                false
            );
            return;
        }

        // CALCULA OS PONTOS
        const pontosGanhos = Math.floor(
            peso * pontuacaoMateriais[material]
        );

        if (pontosGanhos < 1) {
            mostrarMensagem(
                "Esse peso não gera pontos. Informe uma quantidade maior.",
                false
            );
            return;
        }

        // ADICIONA OS PONTOS
        pontos += pontosGanhos;

        // REGISTRA NO HISTÓRICO
        registrarHistorico(
            `Reciclagem: ${peso} kg de ${nomesMateriais[material]} — +${pontosGanhos} pontos`
        );

        salvarDados();
        atualizarSaldo();

        mostrarMensagem(
            `Parabéns! Você acumulou ${pontosGanhos} pontos. Seu novo saldo é de ${pontos} pontos!`
        );

        formularioReciclagem.reset();
    });

    // RESGATE DE ALIMENTOS
    botoesResgate.forEach(botao => {

        botao.addEventListener("click", function() {

            const produto = botao.dataset.produto;
            const custo = Number(botao.dataset.pontos);

            if (!produto || !Number.isFinite(custo) || custo <= 0) {
                mostrarMensagem("Não foi possível identificar esse alimento.", false);
                return;
            }

            // VERIFICA SE POSSUI PONTOS SUFICIENTES
            if (pontos < custo) {
                mostrarMensagem(
                    `Você precisa de ${custo} pontos para resgatar ${produto}. Seu saldo atual é de ${pontos} pontos.`,
                    false
                );
                return;
            }

            // DESCONTA OS PONTOS
            pontos -= custo;

            // REGISTRA O RESGATE
            registrarHistorico(
                `Resgate: ${produto} — -${custo} pontos`
            );

            salvarDados();
            atualizarSaldo();

            mostrarMensagem(
                `Resgate simulado de ${produto} realizado! Foram utilizados ${custo} pontos.`
            );

        });

    });

    // INICIA A SEÇÃO COM OS DADOS SALVOS
    atualizarSaldo();
    atualizarHistorico();

});
