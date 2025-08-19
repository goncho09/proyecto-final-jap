
document.getElementById("loginForm").addEventListener("submit", function(e) { 
    e.preventDefault();

    const usuario = document.getElementById("email").value;
    const clave = document.getElementById("password").value;

    // Validación de ejemplo 
    if (usuario && clave) {
        // Guardar sesión en localStorage
        localStorage.setItem("sesion", usuario);

        // Redirigir al inicio
        window.location.replace ("proyecto-final-jap/index.html");
    }
});
