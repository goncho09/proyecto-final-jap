function toggleMenu() {
    const menu = document.getElementById('navbarSupportedContent');
    menu.classList.toggle('active');
  }
  

const cerrar = document.getElementById('cerrar-sesion');

cerrar.addEventListener('click', cerrarSesion);

function cerrarSesion() {
    localStorage.removeItem("usuarioAutenticado");
    window.location.replace('./login.html');
}