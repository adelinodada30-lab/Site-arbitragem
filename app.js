document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const mainPanel = document.getElementById("main-panel");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginError = document.getElementById("login-error");
  const oddsList = document.getElementById("odds-list");

  // LOGIN
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === CONFIG.USERNAME && pass === CONFIG.PASSWORD) {
      loginScreen.classList.add("hidden");
      mainPanel.classList.remove("hidden");
      fetchOdds();
    } else {
      loginError.textContent = "Usuário ou senha incorretos!";
    }
  });

  logoutBtn.addEventListener("click", () => {
    mainPanel.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  });

  // FUNÇÃO PARA BUSCAR ODDS
  async function fetchOdds() {
    oddsList.innerHTML = "<p>Carregando odds...</p>";
    try {
      const sports = ["soccer", "basketball", "tennis"];
      let allOdds = [];

      for (let sport of sports) {
        const res = await fetch(`${CONFIG.API_URL}/${sport}/odds/?apiKey=${CONFIG.API_KEY}&regions=eu&markets=h2h,totals,btts&oddsFormat=decimal`);
        const data = await res.json();
        allOdds = allOdds.concat(data);
      }

      showOdds(allOdds);
    } catch (err) {
      oddsList.innerHTML = "<p>Erro ao carregar odds.</p>";
    }
  }

  // FUNÇÃO EXIBIR
  function showOdds(oddsData) {
    oddsList.innerHTML = "";

    if (!oddsData || oddsData.length === 0) {
      oddsList.innerHTML = "<p>Nenhuma arbitragem encontrada.</p>";
      return;
    }

    oddsData.forEach(match => {
      const card = document.createElement("div");
      card.className = "odds-card";
      card.innerHTML = `
        <h4>${match.sport_title} - ${match.home_team} x ${match.away_team}</h4>
        <p><strong>Mercados:</strong></p>
        ${match.bookmakers.map(bm => `
          <p>${bm.title}: 
            ${bm.markets.map(mk => `
              <span>${mk.key}: ${mk.outcomes.map(o => `${o.name} @ ${o.price}`).join(" | ")}</span>
            `).join("<br>")}
          </p>
        `).join("<hr>")}
      `;
      oddsList.appendChild(card);
    });
  }
});