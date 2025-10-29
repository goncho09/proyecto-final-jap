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
            const numberProducts = document.getElementById('number-products');
            if (!numberProducts) {
                setTimeout(initCart, 100); // Reintentar en 100ms
                return;
            }

            numberProducts.textContent = JSON.parse(localStorage.Compras).length;

            window.replace('./cart')
        }
    });
}

window.addEventListener('DOMContentLoaded', guardarProductoCarrito); // Esperamos a que cargue el DOM y ejecutamos la funcion

