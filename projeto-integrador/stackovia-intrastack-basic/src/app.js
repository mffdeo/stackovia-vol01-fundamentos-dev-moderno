const linksButton = document.querySelector("[data-toggle-links]");
const linksPanel = document.querySelector("#links-uteis");
const linksStatus = document.querySelector("#status-links");

if (linksButton && linksPanel && linksStatus) {
  linksButton.addEventListener("click", () => {
    const isHidden = linksPanel.classList.toggle("is-hidden");
    linksButton.setAttribute("aria-expanded", String(!isHidden));
    linksButton.textContent = isHidden ? "Mostrar links úteis" : "Ocultar links úteis";
    linksStatus.textContent = isHidden
      ? "Links úteis ocultados."
      : "Links úteis exibidos. Abra em nova aba se quiser consultar a documentação.";
  });
}

const teamList = document.querySelector("#lista-equipe");
const teamStatus = document.querySelector("#status-equipe");

if (teamList && teamStatus) {
  carregarEquipe();
}

async function carregarEquipe() {
  try {
    const response = await fetch("data/equipe.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const pessoas = await response.json();
    teamList.textContent = "";

    pessoas.forEach((pessoa) => {
      const card = document.createElement("article");
      card.className = "person-card";

      const nome = document.createElement("h3");
      nome.textContent = pessoa.nome;

      const papel = document.createElement("p");
      papel.textContent = pessoa.papel;

      const foco = document.createElement("p");
      foco.textContent = pessoa.foco;

      card.append(nome, papel, foco);
      teamList.appendChild(card);
    });

    teamStatus.textContent = `${pessoas.length} pessoas fictícias carregadas de data/equipe.json.`;
  } catch (error) {
    teamStatus.textContent =
      "Não foi possível carregar data/equipe.json. Sirva a pasta src/ com python3 -m http.server.";
  }
}

const form = document.querySelector("#form-contato");
const statusForm = document.querySelector("#status-form");

if (form && statusForm) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    limparErros();

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const mensagem = document.querySelector("#mensagem");

    const erros = validarFormulario({
      nome: nome.value,
      email: email.value,
      mensagem: mensagem.value,
    });

    if (erros.length > 0) {
      erros.forEach(({ campo, texto }) => {
        const elemento = document.querySelector(`#erro-${campo}`);
        if (elemento) {
          elemento.textContent = texto;
        }
      });
      statusForm.textContent = "Revise os campos destacados antes de simular o envio.";
      return;
    }

    statusForm.textContent =
      "Mensagem validada. Envio simulado: nenhum dado foi enviado para servidor.";
    form.reset();
  });
}

function validarFormulario({ nome, email, mensagem }) {
  const erros = [];
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  if (nome.trim().length < 2) {
    erros.push({ campo: "nome", texto: "Informe um nome com pelo menos 2 caracteres." });
  }

  if (!emailValido) {
    erros.push({ campo: "email", texto: "Informe um e-mail válido para contato." });
  }

  if (mensagem.trim().length < 10) {
    erros.push({
      campo: "mensagem",
      texto: "Explique o pedido com pelo menos 10 caracteres.",
    });
  }

  return erros;
}

function limparErros() {
  ["nome", "email", "mensagem"].forEach((campo) => {
    const elemento = document.querySelector(`#erro-${campo}`);
    if (elemento) {
      elemento.textContent = "";
    }
  });
  statusForm.textContent = "";
}

