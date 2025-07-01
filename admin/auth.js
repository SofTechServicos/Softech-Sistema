// ATENÇÃO: Este método de autenticação é inseguro e serve apenas para desenvolvimento.
// Em um ambiente de produção, é crucial usar um sistema de backend seguro.
const ADMIN_PASSWORD = 'tecnologia@0173';

/**
 * Verifica se o usuário está logado na sessão.
 * Se não estiver, redireciona para a página de login.
 */
function checkLogin() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        // Tenta voltar para a página de login dentro da pasta admin
        window.location.href = 'index.html';
    }
}

/**
 * Processa a tentativa de login do formulário.
 * @param {Event} event - O evento de submit do formulário.
 */
function handleLogin(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('loggedIn', 'true');
        // Redireciona para a página principal do admin após o login
        window.location.href = 'Gerador de Orçamentos.html';
    } else {
        alert('Senha incorreta. Acesso negado.');
        if (passwordInput) passwordInput.value = '';
    }
}

/**
 * Realiza o logout do usuário, limpando a sessão.
 * @param {Event} event - O evento de clique.
 */
function handleLogout(event) {
    if (event) event.preventDefault();
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}