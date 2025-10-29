function redirigiryguardar() { // Definimos una funcion para ejecutarla al hacer click al boton de comprar

const btcomprar = document.getElementById("buy-button"); // Obtenemos el boton 

btcomprar.addEventListener("click", () => {  // Ponemos un escuchador de evento de click 
  const producto = localStorage.getItem("productID") // Definimos una constante de productos y los obtenemos
  localStorage.setItem("Compras", JSON.stringify(producto)); // Guardamos en el localstorage los productos obtenidos de dar click en comprar en un string
  window.location.replace('./cart.html'); // Redirigimos a la pagina del carrito
}); 


}

 window.addEventListener("DOMContentLoaded", redirigiryguardar); // Esperamos a que cargue el DOM y ejecutamos la funcion