// ===== LOGIN =====
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "scanner2025" && pass === "@morInfinito30") {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");
    loadArbitrages();
  } else {
    document.getElementById("login-error").textContent = "Usuário ou senha inválidos";
  }
}

function logout() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("app-container").classList.add("hidden");
}

// ===== FETCH ODDS =====
async function fetchOdds(sport) {
  const url = `${CONFIG.API_URL}/${sport}/odds/?regions=eu&markets=h2h,over_under&apiKey=${CONFIG.API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

// ===== CALC ARBITRAGEM =====
function calcArbitrage(odds) {
  const invSum = odds.reduce((sum, odd) => sum + (1 / odd), 0);
  if (invSum < 1) {
    const profit = (1 - invSum) * 100;
    return profit.toFixed(2);
  }
  return null;
}

// ===== LOAD DATA =====
async function loadArbitrages() {
  const sports = ["soccer", "basketball", "tennis"];
  const arbList = document.getElementById("arbitrage-list");
  arbList.innerHTML = "Carregando arbitragens...";

  let bestProfit = 0;
  let totalArbs = 0;
  arbList.innerHTML = "";

  for (let sport of sports) {
    const data = await fetchOdds(sport);

    data.forEach(event => {
      if (!event.bookmakers) return;

      event.bookmakers.forEach(book => {
        book.markets.forEach(market => {
          const odds = market.outcomes.map(o => o.price);
          const profit = calcArbitrage(odds);

          if (profit) {
            totalArbs++;
            if (profit > bestProfit) bestProfit = profit;

            const card = document.createElement("div");
            card.className = "arb-card";
            card.innerHTML = `
              <h3>${event.home_team} vs ${event.away_team}</h3>
              <p><strong>Mercado:</strong> ${market.key}</p>
              <p><strong>Casa:</strong> ${book.title}</p>
              <p><strong>Odds:</strong> ${odds.join(" | ")}</p>
              <p><strong>Lucro Arbitragem:</strong> ${profit}%</p>
            `;
            arbList.appendChild(card);
          }
        });
      });
    });
  }

  document.getElementById("total-arbs").textContent = `Arbitragens encontradas: ${totalArbs}`;
  document.getElementById("best-arb").textContent = `Melhor lucro: ${bestProfit}%`;
  document.getElementById("trend").textContent = totalArbs > 0 ? "Alta" : "Baixa";
}