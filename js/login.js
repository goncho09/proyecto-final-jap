document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('email').value;
  const clave = document.getElementById('password').value;

  // Validación de ejemplo
  if (usuario && clave) {
    // Guardar sesión en localStorage
    localStorage.setItem('sesion', usuario);
    console.log('Usuario autenticado:', usuario);
    // Redirigir al inicio
    window.location.href = 'index.html';
  }
});
