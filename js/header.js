function toggleMenu() {
  const menu = document.getElementById('navbarSupportedContent');
  menu.classList.toggle('active');
}

function cerrarSesion() {
  localStorage.removeItem('usuarioAutenticado');
  window.location.replace('./login.html');
}

function loadHeader() {
  const container = document.getElementById('header');

  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.2s ease';

  fetch('header.html')
    .then((res) => res.text())
    .then((data) => {
      container.innerHTML = data;

      const userDisplay = document.getElementById('userDisplay');
      const user = localStorage.getItem('usuarioAutenticado');
      if (user && userDisplay) {
        userDisplay.textContent = user;
      }
    })
    .catch((err) => console.error('Error cargando el header:', err))
    .finally(() => {
      document.body.style.opacity = 1;
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
