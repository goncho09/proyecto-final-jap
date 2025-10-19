import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(authorizedUser, './');

const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('user').value;
    const clave = document.getElementById('password').value;

    // Validación de ejemplo
    if (usuario && clave) {
        // Guardar sesión en localStorage
        localStorage.setItem('usuarioAutenticado', usuario);

        window.location.replace('./index.html');
    }
});
