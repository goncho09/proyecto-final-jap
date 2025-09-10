const containerProducts = document.getElementById('products');
let currentCategory = "";

const searchInput = document.getElementById('searchInput');

getJSONData(`${PRODUCTS_URL}${localStorage.getItem('catID')}${EXT_TYPE}`)
    .then(response => {
        const products = response.data.products;
        currentCategory = response.data.catName;

        document.getElementById('categoryName').textContent = currentCategory;

        if (!products.length) {
            containerProducts.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">No hay productos disponibles!</h4>
            </div>`;
        } else {
            for (const product of products) {
                containerProducts.innerHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4 productosContainer">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name} image">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <span >${product.currency} <span id="price">${product.cost}</span></span>
                            <span id="soldCount">${product.soldCount}</span>
                        </div>
                    </div>
                </div>
            `
            }
        }
    });

const productosContainer = containerProducts.getElementsByClassName('productosContainer'); // Obtengo todas las cartas de productos

searchInput.addEventListener('input', (event) => {
    const palabraBusqueda = event.target.value.toLowerCase();

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

function filtrarProductos() {
    const minInput = document.getElementById("precioMin");
    const maxInput = document.getElementById("precioMax");

    const min = minInput.value ? parseInt(minInput.value) : 0;
    const max = maxInput.value ? parseInt(maxInput.value) : 1000000;

    Array.from(productosContainer).forEach(card => {
        const price = card.querySelector('span#price').textContent
        if (price >= min && price <= max) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function limpiarFiltros() {
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";
    document.getElementById("ordenar").value = "";

    Array.from(productosContainer).forEach(card => {
        card.style.display = 'block';
    });
}

function ordenarProductos() {
    const tipo = document.getElementById("ordenar").value;

    if (tipo === "precioAsc") {
        Array.from(productosContainer).sort((a, b) => {
            const price = Number(a.querySelector('span#price').textContent)
            const price1 = Number(b.querySelector('span#price').textContent)
            return price - price1;
        }).forEach(element => containerProducts.appendChild(element));
    }
    else if (tipo === "precioDesc") {
        Array.from(productosContainer).sort((a, b) => {
            const price = Number(a.querySelector('span#price').textContent)
            const price1 = Number(b.querySelector('span#price').textContent)
            return price1 - price;
        }).forEach(element => containerProducts.appendChild(element));
    }
    else if (tipo === "relevanciaDesc") {
        Array.from(productosContainer).sort((a, b) => {
            const price = Number(a.querySelector('span#soldCount').textContent)
            const price1 = Number(b.querySelector('span#soldCount').textContent)
            return price1 - price;
        }).forEach(element => containerProducts.appendChild(element));
    }
}