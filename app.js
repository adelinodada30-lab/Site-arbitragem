document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm'); // ID correto do index.html
    const loginSection = document.getElementById('loginSection');
    const siteContent = document.getElementById('siteContent');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === 'scanner2025' && password === '@morInfinito30') {
                loginSection.style.display = 'none';
                siteContent.style.display = 'block';
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // Mantém login mesmo após atualizar página
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginSection.style.display = 'none';
        siteContent.style.display = 'block';
    }
});