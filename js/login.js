
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    // Validación de ejemplo 
    if (usuario && clave ) {
        // Guardar sesión en localStorage
        localStorage.setItem("usuario", usuario);

        // Redirigir al inicio
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
