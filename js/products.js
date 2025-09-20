if(!localStorage.getItem("usuarioAutenticado")) {
    window.location.replace('./login.html');
}
const productsDiv = document.getElementById('products');
const searchInput = document.getElementById('searchInput');


getJSONData(`${PRODUCTS_URL}${localStorage.getItem('catID')}${EXT_TYPE}`)
    .then(response => {
        const products = response.data.products;

        if (!products.length) {
            productsDiv.innerHTML += `
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">
                    No hay productos disponible, lo sentimos!
                </h4>
            </div>
        `;
        } else {
            for (const product of products) {
                productsDiv.innerHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4 productosContainer">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name} image">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <span>${product.currency} ${product.cost}</span>
                            <span>${product.soldCount}</span>
                        </div>
                    </div>
                </div>
            `
            }
        }
    });

    searchInput.addEventListener('input', (event) => {
    const palabraBusqueda = event.target.value.toLowerCase();
    const productosContainer = productsDiv.getElementsByClassName('productosContainer'); // Obtengo todas las cartas de productos

    Array.from(productosContainer).forEach(card => {
        const nombreProducto = card.getElementsByClassName('card-title')[0].innerText.toLowerCase(); // Obtengo el nombre del producto de la carta
        const descripcionProducto = card.getElementsByClassName('card-text')[0].innerText.toLowerCase(); // Obtengo la descripción del producto de la carta
        if (nombreProducto.includes(palabraBusqueda) || descripcionProducto.includes(palabraBusqueda)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
