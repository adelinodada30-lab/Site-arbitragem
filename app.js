// app.js - versão JavaScript puro

// ======= LOGIN =======
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === 'scanner2025' && pass === '@morInfinito30') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        carregarArbitragem();
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// ======= FUNÇÃO PARA BUSCAR ARBITRAGEM =======
async function carregarArbitragem() {
    try {
        const url = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=${API_KEY}&regions=eu&markets=h2h,over_under&oddsFormat=decimal`;

        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro ao buscar dados da API");

        const dados = await resposta.json();

        exibirDados(dados);
    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível carregar as odds. Verifique a API Key e conexão.");
    }
}

// ======= EXIBIR DADOS =======
function exibirDados(lista) {
    const tabela = document.getElementById('tabelaOdds');
    tabela.innerHTML = ""; // limpar

    lista.forEach(jogo => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${jogo.home_team} vs ${jogo.away_team}</td>
            <td>${jogo.bookmakers[0]?.markets[0]?.outcomes[0]?.price || '-'}</td>
            <td>${jogo.bookmakers[0]?.markets[0]?.outcomes[1]?.price || '-'}</td>
            <td>${jogo.sport_title}</td>
        `;
        tabela.appendChild(linha);
    });
}