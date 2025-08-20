const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('email').value;
  const clave = document.getElementById('password').value;

  // Validación de ejemplo
  if (usuario && clave) {
    // Guardar sesión en localStorage
    localStorage.setItem('usuarioAutenticado', usuario);

    window.location.replace('./index.html');
  }
});
