document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Pega os valores digitados nos campos
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Credenciais fixas
            const validUser = 'scanner2025';
            const validPass = '@morInfinito30';

            // Validação
            if (username === validUser && password === validPass) {
                // Armazena no localStorage para manter login
                localStorage.setItem('loggedIn', 'true');

                // Redireciona para a página principal
                window.location.href = 'painel.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    } else {
        console.error('Formulário de login não encontrado no HTML.');
    }
});