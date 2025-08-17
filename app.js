// ---------------- LOGIN ----------------
const USERNAME = "scanner2025";
const PASSWORD = "@morInfinito30";

function login(event) {
  if (event) event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    fetchArbitrages();
  } else {
    document.getElementById("login-msg").innerText = "Usuário ou senha inválidos!";
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

    // Exemplo de odds simuladas (mock, pois alguns endpoints exigem plano pago)
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

  } catch (error) {
    console.error(error);
    document.getElementById("arbitragem-list").innerHTML = `<p>Erro ao carregar arbitragens.</p>`;
  }
}

// ---------------- RENDERIZAR PAINEL ----------------
function renderArbitrages(arbs) {
  const container = document.getElementById("arbitragem-list");
  container.innerHTML = "";

  arbs.forEach((arb) => {
    const div = document.createElement("div");
    div.className = "card arbitragem";
    div.innerHTML = `
      <h3>${arb.times} <span style="font-size:12px; color:#666">(${arb.esporte})</span></h3>
      <p><b>Mercado:</b> ${arb.mercado}</p>
      <p><b>Odds:</b> 
        ${arb.odds.map(o => `<a class="link-aposta" href="${o.link}" target="_blank">${o.casa}: <b>${o.odd}</b></a>`).join(" ")}
      </p>
      <p class="lucro">Lucro: <b>${arb.lucro}%</b></p>
      <p><i>Expira em ${arb.expira}</i></p>
    `;
    container.appendChild(div);
  });
}