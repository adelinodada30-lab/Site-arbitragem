/* APP.JS
*/

// ===== CONFIGURAÇÃO =====
const API_KEY = "975e39ec8e83cf7e35230a93b8d7efaf"; // sua chave The Odds API
const API_BASE = "https://api.the-odds-api.com/v4";

// ===== LOGIN =====
const loginScreen = document.getElementById("login-screen");
const appDiv = document.getElementById("app");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");

btnLogin.addEventListener("click", () => {
  const user = document.getElementById("input-user").value.trim();
  const pass = document.getElementById("input-pass").value.trim();
  if (user === "scanner2025" && pass === "@morInfinito30") {
    loginScreen.classList.add("hidden");
    appDiv.classList.remove("hidden");
    loadArbitragem();
  } else {
    alert("Usuário ou senha incorretos!");
  }
});

btnLogout.addEventListener("click", () => {
  appDiv.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

// ===== ABAS =====
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    document.getElementById(`tab-${btn.dataset.tab}`).classList.remove("hidden");
  });
});

// ===== FUNÇÃO: Carregar Arbitragem =====
async function loadArbitragem() {
  document.querySelector("#arb-table tbody").innerHTML = "<tr><td colspan='8'>Carregando...</td></tr>";

  try {
    const markets = [];
    if (document.getElementById("filter-1x2").checked) markets.push("h2h");
    if (document.getElementById("filter-both").checked) markets.push("btts");

    const resp = await fetch(`${API_BASE}/sports/soccer_odds/odds/?apiKey=${API_KEY}&regions=eu&markets=${markets.join(",")}&oddsFormat=decimal`);
    const data = await resp.json();

    const minProfit = parseFloat(document.getElementById("input-minprofit").value) || 0;
    const totalStake = parseFloat(document.getElementById("input-total").value) || 100;

    const tableBody = document.querySelector("#arb-table tbody");
    tableBody.innerHTML = "";

    let maxProfit = 0;
    let bestEvent = "—";
    let count = 0;

    data.forEach(event => {
      // Simulação: vamos assumir 2 casas de aposta
      if (event.bookmakers.length < 2) return;

      const bm1 = event.bookmakers[0];
      const bm2 = event.bookmakers[1];

      bm1.markets.forEach(m1 => {
        bm2.markets.forEach(m2 => {
          if (m1.key === m2.key) {
            // odds de cada casa
            const odds1 = m1.outcomes[0].price;
            const odds2 = m2.outcomes[1].price;

            const inv1 = 1 / odds1;
            const inv2 = 1 / odds2;
            const sum = inv1 + inv2;

            if (sum < 1) {
              const profitPct = (1 - sum) * 100;
              const profitValue = (profitPct / 100) * totalStake;

              if (profitPct >= minProfit) {
                count++;
                if (profitPct > maxProfit) {
                  maxProfit = profitPct;
                  bestEvent = `${event.home_team} vs ${event.away_team}`;
                }

                const stake1 = (totalStake * inv1) / sum;
                const stake2 = (totalStake * inv2) / sum;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                  <td>${event.home_team} vs ${event.away_team}</td>
                  <td>${m1.key}</td>
                  <td><a href="${bm1.url}" target="_blank">${bm1.title} (${odds1})</a></td>
                  <td><a href="${bm2.url}" target="_blank">${bm2.title} (${odds2})</a></td>
                  <td>${profitPct.toFixed(2)}%</td>
                  <td>R$ ${profitValue.toFixed(2)}</td>
                  <td>R$ ${stake1.toFixed(2)} | R$ ${stake2.toFixed(2)}</td>
                  <td><a href="${bm1.url}" target="_blank">Casa A</a> / <a href="${bm2.url}" target="_blank">Casa B</a></td>
                `;
                tableBody.appendChild(tr);
              }
            }
          }
        });
      });
    });

    document.getElementById("lbl-count").textContent = count;
    document.getElementById("lbl-maxprofit").textContent = `${maxProfit.toFixed(2)}%`;
    document.getElementById("lbl-best").textContent = bestEvent;

  } catch (err) {
    console.error(err);
    document.querySelector("#arb-table tbody").innerHTML = "<tr><td colspan='8'>Erro ao carregar dados</td></tr>";
  }
}

// ===== BOTÃO ATUALIZAR =====
document.getElementById("btn-refresh").addEventListener("click", loadArbitragem);