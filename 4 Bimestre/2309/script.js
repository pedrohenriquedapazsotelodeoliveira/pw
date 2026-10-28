let visor = document.getElementById("visor");

function adicionar(valor) {
    visor.value += valor;
}

function limpar() {
    visor.value = "";
}

function apagar() {
    visor.value = visor.value.slice(0, -1);
}

function calcular() {

    if (visor.value === "") {
        return;
    }

    try {
        visor.value = eval(visor.value);
    } catch {
        visor.value = "Erro";
    }
}
