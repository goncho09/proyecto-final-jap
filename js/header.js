function toggleMenu() {
  const menu = document.getElementById('navbarSupportedContent');
  menu.classList.toggle('active');
}

function cerrarSesion() {
  localStorage.removeItem('usuarioAutenticado');
  window.location.replace('./login.html');
}

function loadHeader() {
  fetch('header.html')
    .then((res) => res.text())
    .then((data) => {
      const container = document.getElementById('header');
      container.innerHTML = data;
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
