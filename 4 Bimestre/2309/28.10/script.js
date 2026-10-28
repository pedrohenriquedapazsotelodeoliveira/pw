
const formulario = document.getElementById("formCadastro");
const painelResultado = document.getElementById("painelResultado");
const mensagemResultado = document.getElementById("resultado");
const campoSenha = document.getElementById("senha");
const campoConfirmarSenha = document.getElementById("confirmarSenha");
const campoNascimento = document.getElementById("dataNascimento");
const campoIdade = document.getElementById("idade");
const botaoNovoCadastro = document.getElementById("novoCadastro");

// Define a data máxima de nascimento como hoje.
campoNascimento.max = new Date().toLocaleDateString("en-CA");

// Calcula a idade usando a data de nascimento.
function calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento + "T00:00:00");
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (
            hoje.getMonth() === nascimento.getMonth() &&
            hoje.getDate() < nascimento.getDate()
        );

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;
}

// Atualiza a idade quando a data de nascimento muda.
campoNascimento.addEventListener("change", function () {
    if (!campoNascimento.value) {
        return;
    }

    const idade = calcularIdade(campoNascimento.value);

    if (idade < 0 || idade > 120) {
        campoNascimento.setCustomValidity(
            "Informe uma data de nascimento válida."
        );

        campoNascimento.reportValidity();
        campoIdade.value = "";
        return;
    }

    campoNascimento.setCustomValidity("");
    campoIdade.value = idade;
});

// Valida se as senhas são iguais.
function validarSenhas() {
    if (
        campoConfirmarSenha.value &&
        campoSenha.value !== campoConfirmarSenha.value
    ) {
        campoConfirmarSenha.setCustomValidity(
            "As senhas não coincidem."
        );
    } else {
        campoConfirmarSenha.setCustomValidity("");
    }
}

campoSenha.addEventListener("input", validarSenhas);
campoConfirmarSenha.addEventListener("input", validarSenhas);

// Realiza o cadastro.
function cadastrarUsuario(event) {
    event.preventDefault();

    validarSenhas();

    if (!formulario.reportValidity()) {
        return;
    }

    const dados = Object.fromEntries(
        new FormData(formulario).entries()
    );

    // Confirma a idade com base na data de nascimento.
    if (dados.dataNascimento) {
        const idadeCalculada = calcularIdade(dados.dataNascimento);

        if (idadeCalculada < 0 || idadeCalculada > 120) {
            campoNascimento.setCustomValidity(
                "Informe uma data de nascimento válida."
            );

            campoNascimento.reportValidity();
            return;
        }

        dados.idade = String(idadeCalculada);
    }

    // Não exibe nem registra a senha.
    const dadosSeguros = { ...dados };

    delete dadosSeguros.senha;
    delete dadosSeguros.confirmarSenha;

    console.log("Dados do cadastro:", dadosSeguros);

    // Exibe a confirmação sem inserir dados como HTML.
    mensagemResultado.textContent =
        "Parabéns, " + dados.nome +
        "! Seus dados foram validados com sucesso.";

    painelResultado.hidden = false;
    formulario.hidden = true;

    painelResultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Limpa as mensagens de validação quando o formulário é reiniciado.
formulario.addEventListener("reset", function () {
    campoSenha.setCustomValidity("");
    campoConfirmarSenha.setCustomValidity("");
    campoNascimento.setCustomValidity("");

    painelResultado.hidden = true;
    formulario.hidden = false;
});

// Registra os eventos.
formulario.addEventListener("submit", cadastrarUsuario);

// Inicia um novo cadastro.
botaoNovoCadastro.addEventListener("click", function () {
    formulario.reset();

    formulario.hidden = false;
    painelResultado.hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
