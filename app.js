async function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "scanner2025" && pass === "@morInfinito30") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    loadOdds();
  } else {
    document.getElementById("login-error").innerText = "Usuário ou senha inválidos";
  }
}

function logout() {
  document.getElementById("login-container").style.display = "block";
  document.getElementById("app-container").style.display = "none";
}

async function loadOdds() {
  const resultsDiv = document.getElementById("odds-results");
  resultsDiv.innerHTML = "Carregando odds...";

  try {
    const sports = ["soccer", "tennis", "basketball"];
    let arbitragemHTML = "";

    for (let sport of sports) {
      const url = `${API_URL}/${sport}/odds/?regions=eu&markets=h2h,totals,btts&oddsFormat=decimal&apiKey=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();

      data.slice(0, 3).forEach(event => {
        const teams = event.home_team + " vs " + event.away_team;
        const bookmakers = event.bookmakers.slice(0, 2);
        if (bookmakers.length < 2) return;

        const odds1 = bookmakers[0].markets[0].outcomes[0].price;
        const odds2 = bookmakers[1].markets[0].outcomes[1].price;

        const stake = parseFloat(document.getElementById("stake").value);
        const inv = (1/odds1) + (1/odds2);

        if (inv < 1) {
          const bet1 = (stake / odds1) / inv;
          const bet2 = (stake / odds2) / inv;
          const lucro = (stake / inv) - stake;

          arbitragemHTML += `
            <div class="arbi-card">
              <h3>${teams}</h3>
              <p>Casa A: ${bookmakers[0].title} | Odd: ${odds1}</p>
              <p>Casa B: ${bookmakers[1].title} | Odd: ${odds2}</p>
              <p>Apostar R$${bet1.toFixed(2)} e R$${bet2.toFixed(2)}</p>
              <p class="profit">Lucro Garantido: R$${lucro.toFixed(2)} (${((1-inv)*100).toFixed(2)}%)</p>
            </div>
          `;
        }
      });
    }

    resultsDiv.innerHTML = arbitragemHTML || "Nenhuma arbitragem encontrada agora.";
  } catch (err) {
    resultsDiv.innerHTML = "Erro ao carregar odds.";
    console.error(err);
  }
}