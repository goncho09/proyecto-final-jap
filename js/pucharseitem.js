function guardarProductoCarrito() {
    // Definimos una funcion para ejecutarla al hacer click al boton de comprar

    const btnBuy = document.getElementById('buy-button'); // Obtenemos el boton
    btnBuy.addEventListener('click', () => {

        const cart = JSON.parse(localStorage.getItem('carrito')) || [];

        let product = cart.find(product => product.id === localStorage.getItem('productID'))

        if (product) {
            product.cantidad++;
        } else {
            let [title, , price] = document.getElementById('product-details').children
            let [first] = document.querySelectorAll('.thumbnail')

            cart.push({
                id: localStorage.productID,
                title: title.textContent,
                price: price.textContent,
                image: first.src.split(3000)[1],
                cantidad: 1,
            });
        }

        localStorage.setItem('carrito', JSON.stringify(cart)); // Guardamos en el localstorage los productos obtenidos de dar click en comprar en un string
        btnBuy.disabled = true;
        btnBuy.textContent = 'Producto agregado al carrito';
        window.location.replace('./cart.html')
    });
}

window.addEventListener('DOMContentLoaded', guardarProductoCarrito); // Esperamos a que cargue el DOM y ejecutamos la funcion

