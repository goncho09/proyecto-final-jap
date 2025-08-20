if(localStorage.getItem("usuarioAutenticado") !== "true") {
    window.location.replace('./index.html');

    throw new Error("Usuario no autenticado");
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function cerrarSesion() {
    localStorage.removeItem("usuarioAutenticado");
    localStorage.removeItem("usuario");
    localStorage.removeItem("sesion");
    window.location.replace('./index.html');
}