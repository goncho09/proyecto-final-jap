import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(authorizedUser, './');

const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    // Validación de ejemplo
    if (user && password) {
        // Guardar sesión en localStorage
        localStorage.setItem('usuarioAutenticado', user);

        window.location.replace('./index.html');
    }
});
