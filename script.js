const celulas = document.querySelectorAll('.celula');
let vezDoX = true;
let jogoAtivo = true; // Controla se o jogo está em andamento

// Adiciona o evento para reiniciar o jogo
document.getElementById("botaoReiniciar").addEventListener('click', iniciarJogo);

// Função para iniciar o jogo
function iniciarJogo() {
    celulas.forEach(celula => {
        celula.textContent = ""; // Limpa as células
        celula.addEventListener('click', tratarClique, { once: true }); // Permite clicar apenas uma vez
    });
    jogoAtivo = true; // Reativa o jogo
    document.getElementById("vencedor").textContent = ""; // Limpa a mensagem de vencedor
}

// Função para tratar o clique nas células
function tratarClique(evento) {
    if (!jogoAtivo) return; // Impede jogadas após o fim do jogo

    evento.target.textContent = vezDoX ? "X" : "O"; // Alterna entre X e O
    vezDoX = !vezDoX; // Alterna a vez entre os jogadores

    // Verifica se há vencedor após cada jogada
    if (verificarVitoria()) {
        document.getElementById("vencedor").textContent = `Jogador ${evento.target.textContent} venceu!`; // Exibe o vencedor
        jogoAtivo = false; // Termina o jogo
    }
}

// Função para verificar se alguém ganhou
function verificarVitoria() {
    const combinacoesDeVitoria = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (let combinacao of combinacoesDeVitoria) {
        const [a, b, c] = combinacao;
        if (celulas[a].textContent && celulas[a].textContent === celulas[b].textContent && celulas[a].textContent === celulas[c].textContent) {
            return true; // Se a combinação for igual, alguém ganhou
        }
    }
    return false;
}

// Inicia o jogo quando a página é carregada
iniciarJogo();
