// app.js

// ===== CONFIGURAÇÃO DE LOGIN =====
const VALID_USER = "scanner2025";
const VALID_PASS = "@morInfinito30";

// Função para verificar login
function checkLogin(username, password) {
    return username === VALID_USER && password === VALID_PASS;
}

// Intercepta o envio do formulário de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (checkLogin(username, password)) {
        // Salva login no navegador
        localStorage.setItem("isLoggedIn", "true");

        // Redireciona para a página principal
        window.location.href = "painel.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
});

// Verifica se já está logado e evita precisar logar de novo
if (window.location.pathname.includes("painel.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html"; // volta para login
    }
}