function guardarProductoCarrito() {
    // Definimos una funcion para ejecutarla al hacer click al boton de comprar

    const btcomprar = document.getElementById('buy-button'); // Obtenemos el boton
    btcomprar.addEventListener('click', () => {
        // Ponemos un escuchador de evento de click
        const producto = localStorage.getItem('productID'); // Definimos una constante de productos y los obtenemos
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.find((p) => parseInt(p.id) === parseInt(producto))) {
            btcomprar.disabled = true;
            btcomprar.textContent = 'Producto agregado al carrito';
        } else {
            carrito.push({
                id: producto,
                cantidad: 1,
            });
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardamos en el localstorage los productos obtenidos de dar click en comprar en un string
            btcomprar.disabled = true;
            btcomprar.textContent = 'Producto agregado al carrito';

        }

        window.location.replace('./cart.html')
    });
}

window.addEventListener('DOMContentLoaded', guardarProductoCarrito); // Esperamos a que cargue el DOM y ejecutamos la funcion

