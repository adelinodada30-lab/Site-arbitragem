// app.js - versão JavaScript puro para funcionar com seu index.html

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginContainer = document.getElementById("login-container");
    const appContainer = document.getElementById("app-container");
    const userInfo = document.getElementById("user-info");
    const logoutBtn = document.getElementById("logout-btn");

    // Login fixo
    const USUARIO_FIXO = "scanner2025";
    const SENHA_FIXA = "@morInfinito30";

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = document.getElementById("username").value;
        const senha = document.getElementById("password").value;

        if (usuario === USUARIO_FIXO && senha === SENHA_FIXA) {
            loginContainer.style.display = "none";
            appContainer.style.display = "block";
            userInfo.textContent = `Bem-vindo, ${usuario}!`;
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        appContainer.style.display = "none";
        loginContainer.style.display = "block";
        loginForm.reset();
    });

    // Aqui você pode integrar a API usando a chave do config.js
    console.log("Chave da API carregada:", API_KEY);
});