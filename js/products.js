if(!localStorage.getItem("usuarioAutenticado")) {
    window.location.replace('./login.html');
}
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

            return;
        }

        products.forEach(product => {
            createCardProduct(product);
        });
    });

function createCardProduct(product) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'col-12 col-md-4 col-lg-3 mb-4 productosContainer';

    const anchor = document.createElement('a');
    anchor.href = './product-info.html';
    anchor.className = 'text-decoration-none text-reset';

    anchor.addEventListener('click', () => {
        localStorage.setItem('productID', product.id);
    });

    const card = document.createElement('div');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.src = product.image;
    img.className = 'card-img-top';
    img.alt = `${product.name} image`;

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = product.name;

    const desc = document.createElement('p');
    desc.className = 'card-text';
    desc.textContent = product.description;

    body.appendChild(title);
    body.appendChild(desc);

    const footer = document.createElement('div');
    footer.className = 'card-footer d-flex justify-content-between';

    const price = document.createElement('p');
    price.innerHTML = `${product.currency} <span class="price" id="price">${product.cost}</span>`;

    const sold = document.createElement('p');
    sold.className = 'soldCount';
    sold.id = 'soldCount'
    sold.style.display = product.soldCount > 0 ? 'block' : 'none';
    sold.textContent = product.soldCount;

    footer.appendChild(price);
    footer.appendChild(sold);

    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(footer);
    anchor.appendChild(card);
    cardContainer.appendChild(anchor);
    containerProducts.appendChild(cardContainer);


}

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
            const price = Number(a.querySelector('p#soldCount').textContent)
            const price1 = Number(b.querySelector('p#soldCount').textContent)
            return price1 - price;
        }).forEach(element => containerProducts.appendChild(element));
    }
}