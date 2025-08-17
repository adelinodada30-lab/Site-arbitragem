// app.js
const API_KEY = "975e39ec8e83cf7e35230a93b8d7efaf";
const API_URL = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu&markets=h2h,totals,spreads&oddsFormat=decimal&apiKey=${API_KEY}`;

// Função para login simples
function login(event) {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "scanner2025" && pass === "@morInfinito30") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app-container").style.display = "block";
        fetchOdds();
    } else {
        document.getElementById("login-error").innerText = "Usuário ou senha incorretos!";
    }
}

// Função para buscar odds reais
async function fetchOdds() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!Array.isArray(data)) {
            document.getElementById("odds-list").innerHTML = "<p>Erro ao carregar odds da API.</p>";
            return;
        }

        renderOdds(data);
    } catch (error) {
        console.error("Erro na API:", error);
        document.getElementById("odds-list").innerHTML = "<p>Erro ao conectar à API.</p>";
    }
}

// Renderizar odds no painel
function renderOdds(games) {
    const container = document.getElementById("odds-list");
    container.innerHTML = "";

    if (games.length === 0) {
        container.innerHTML = "<p>Nenhuma arbitragem encontrada no momento.</p>";
        return;
    }

    games.forEach(game => {
        const bookmakers = game.bookmakers || [];
        if (bookmakers.length < 2) return; // precisa de pelo menos 2 casas

        const div = document.createElement("div");
        div.className = "odd-card";
        div.innerHTML = `
            <h3>${game.sport_title} - ${game.home_team} vs ${game.away_team}</h3>
            <p><strong>Início:</strong> ${new Date(game.commence_time).toLocaleString()}</p>
            <div class="bookmakers">
                ${bookmakers.map(bm => `
                    <div class="bookmaker">
                        <h4>${bm.title}</h4>
                        ${bm.markets.map(market => `
                            <p>${market.key}: 
                                ${market.outcomes.map(out => `${out.name} (${out.price})`).join(" | ")}
                            </p>
                        `).join("")}
                    </div>
                `).join("")}
            </div>
        `;
        container.appendChild(div);
    });
}