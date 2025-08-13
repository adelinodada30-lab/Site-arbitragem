import React, { useState } from "react";
import PainelArbitragem from "./PainelArbitragem";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica usuário e senha fixos
    if (usuario === "scanner2025" && senha === "@morInfinito30") {
      setLogado(true);
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  // Se já estiver logado, mostra o painel
  if (logado) {
    return <PainelArbitragem />;
  }

  // Tela de login
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login - ArbiScanner</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>
        <small>
          Usuário: <strong>scanner2025</strong> | Senha: <strong>@morInfinito30</strong>
        </small>
      </p>
    </div>
  );
}