const containerProducts = document.getElementById('products');
let todosLosProductos = [];
let currentCategory = "";

getJSONData(`${PRODUCTS_URL}${localStorage.getItem('catID')}${EXT_TYPE}`)
    .then(response => {
        const products = response.data.products;
        todosLosProductos = products;
        currentCategory = response.data.catName;
        
        document.getElementById('categoryName').textContent = currentCategory;

        if (!products.length) {
            containerProducts.innerHTML = ` 
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">No hay productos disponibles!</h4>
            </div>`;
        } else {
            mostrarProductos(todosLosProductos);
        }
    });

function mostrarProductos(productos) {
    containerProducts.innerHTML = '';
    
    if (productos.length === 0) {
        containerProducts.innerHTML = `
            <div class="alert alert-warning text-center">
                No se encontraron productos en ${currentCategory}
            </div>`;
        return;
    }
    
    for (const product of productos) {
        containerProducts.innerHTML += `
        <div class="col-12 col-md-4 col-lg-3 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <span>${product.currency} ${product.cost}</span>
                    <span>${product.soldCount} vendidos</span>
                </div>
            </div>
        </div>`;
    }
}

function filtrarProductos() {
    const minInput = document.getElementById("precioMin");
    const maxInput = document.getElementById("precioMax");
    
    const min = minInput.value ? parseInt(minInput.value) : 0;
    const max = maxInput.value ? parseInt(maxInput.value) : 1000000;
    
    const productosFiltrados = todosLosProductos.filter(function(producto) {
        return producto.cost >= min && producto.cost <= max;
    });
    
    mostrarProductos(productosFiltrados);
}

function limpiarFiltros() {
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";
    document.getElementById("ordenar").value = "";
    mostrarProductos(todosLosProductos);
}

function ordenarProductos() {
    const tipo = document.getElementById("ordenar").value;
    const productosOrdenados = [...todosLosProductos];
    
    if (tipo === "precioAsc") {
        productosOrdenados.sort((a, b) => a.cost - b.cost);
    }
    else if (tipo === "precioDesc") {
        productosOrdenados.sort((a, b) => b.cost - a.cost);
    }
    else if (tipo === "relevanciaDesc") {
        productosOrdenados.sort((a, b) => b.soldCount - a.soldCount);
    }
    else {
        return; // No ordenar si no es un tipo válido
    }
    
    mostrarProductos(productosOrdenados);
}
    