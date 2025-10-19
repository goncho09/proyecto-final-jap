function initThemeToggle(buttonId = "theme-toggle") {
  const boton = document.getElementById(buttonId);


  // Función que aplica el tema guardado o el predeterminado
  const aplicarTema = (tema) => {
    if (tema === "oscuro") {
      document.body.classList.add("oscuro");
      boton.textContent = "☀️ Modo claro";
    } else {
      document.body.classList.remove("oscuro");
      boton.textContent = "🌙 Modo oscuro";
    }
  };

  // Al cargar la página, aplicamos el tema guardado (o el del sistema)
  const temaGuardado = localStorage.getItem("tema");
  const temaInicial = temaGuardado 
  aplicarTema(temaInicial);

  // Escuchar clic en el botón para alternar tema
  boton.addEventListener("click", () => {
    const nuevoTema = document.body.classList.contains("oscuro")
      ? "claro"
      : "oscuro";
    aplicarTema(nuevoTema);
    localStorage.setItem("tema", nuevoTema);
  });
}

// Esperar a que cargue el DOM y ejecutar la función
document.addEventListener("DOMContentLoaded", () => initThemeToggle());
