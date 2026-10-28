
function cadastrarUsuario(event) {
    event.preventDefault();

    const formulario = event.target;

    const dados = Object.fromEntries(
        new FormData(formulario)
    );

    console.log("Dados cadastrados:", dados);
    console.log("Nome:", dados.nome);
    console.log("E-mail:", dados.email);
    console.log("Idade:", dados.idade);

    document.getElementById("resultado").textContent =
        "Cadastro realizado com sucesso, " + dados.nome + "!";

    formulario.reset();
}

const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", cadastrarUsuario);
