// app.js

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Credenciais fixas
            const validUser = "scanner2025";
            const validPass = "@morInfinito30";

            if (username === validUser && password === validPass) {
                alert("Login realizado com sucesso!");
                localStorage.setItem("logado", "true");
                window.location.href = "painel.html"; // redireciona para o painel
            } else {
                alert("Usuário ou senha incorretos!");
            }
        });
    } else {
        console.error("Formulário de login não encontrado no HTML.");
    }
});

// Proteção para páginas internas
if (window.location.pathname.includes("painel.html")) {
    if (localStorage.getItem("logado") !== "true") {
        window.location.href = "index.html"; // redireciona se não estiver logado
    }
}