// app.js

// ---------------- LOGIN ----------------
const USERNAME = "scanner2025";
const PASSWORD = "@morInfinito30";

function login(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    fetchArbitrages();
  } else {
    document.getElementById("login-error").innerText = "Usuário ou senha inválidos!";
  }
}

// ---------------- CONFIG ----------------
const API_KEY = "975e39ec8e83cf7e35230a93b8d7efaf";
const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;

// ---------------- FETCH ODDS ----------------
async function fetchArbitrages() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar dados da API");

    const sports = await response.json();

    // Exemplo de odds simuladas (porque alguns endpoints da API exigem plano pago)
    const mockArbs = [
      {
        esporte: "Futebol",
        times: "Flamengo vs Palmeiras",
        mercado: "1x2",
        odds: [
          { casa: "Bet365", odd: 2.1, link: "https://bet365.com" },
          { casa: "Pinnacle", odd: 1.95, link: "https://pinnacle.com" }
        ],
        lucro: 3.2,
        expira: "10 min"
      },
      {
        esporte: "Tênis",
        times: "Nadal vs Djokovic",
        mercado: "Over/Under 22.5 games",
        odds: [
          { casa: "Betfair", odd: 1.9, link: "https://betfair.com" },
          { casa: "Bet365", odd: 2.05, link: "https://bet365.com" }
        ],
        lucro: 1.8,
        expira: "5 min"
      }
    ];

    renderArbitrages(mockArbs);
    renderRadar(mockArbs);

  } catch (error) {
    console.error(error);
    document.getElementById("arbitrages-list").innerHTML = `<p>Erro ao carregar arbitragens.</p>`;
  }
}

// ---------------- RENDERIZAR PAINEL ----------------
function renderArbitrages(arbs) {
  const container = document.getElementById("arbitrages-list");
  container.innerHTML = "";

  arbs.forEach((arb) => {
    const div = document.createElement("div");
    div.className = "arb-card";
    div.innerHTML = `
      <h3>${arb.times} <span class="tag">${arb.esporte}</span></h3>
      <p><b>Mercado:</b> ${arb.mercado}</p>
      <div class="odds">
        ${arb.odds.map(o => `
          <a href="${o.link}" target="_blank">${o.casa}: <b>${o.odd}</b></a>
        `).join(" | ")}
      </div>
      <p class="lucro">Lucro: <b>${arb.lucro}%</b> (${(arb.lucro * 10).toFixed(2)} R$)</p>
      <p class="expira">Expira em: ${arb.expira}</p>
    `;
    container.appendChild(div);
  });

  // Palpite do dia (maior lucro)
  const best = arbs.reduce((a, b) => (a.lucro > b.lucro ? a : b));
  document.getElementById("palpite-dia").innerHTML = `
    <h3>Palpite do Dia</h3>
    <p>${best.times} (${best.mercado})</p>
    <p><b>Lucro:</b> ${best.lucro}%</p>
  `;
}

// ---------------- RADAR DE ARBITRAGEM ----------------
function renderRadar(arbs) {
  const total = arbs.length;
  const maiorLucro = Math.max(...arbs.map(a => a.lucro));
  const porEsporte = {};

  arbs.forEach(a => {
    porEsporte[a.esporte] = (porEsporte[a.esporte] || 0) + 1;
  });

  const radar = document.getElementById("radar");
  radar.innerHTML = `
    <h3>Radar de Arbitragem</h3>
    <p>Total de arbitragens: ${total}</p>
    <p>Maior lucro: ${maiorLucro}%</p>
    <p>Distribuição por esporte:</p>
    <ul>
      ${Object.entries(porEsporte).map(([esp, qtd]) => `<li>${esp}: ${qtd}</li>`).join("")}
    </ul>
  `;
}

// ---------------- INIT ----------------
document.getElementById("login-form").addEventListener("submit", login);