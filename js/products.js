const containerProducts = document.getElementById('products');
let currentCategory = "";
getJSONData(`${PRODUCTS_URL}${localStorage.getItem('catID')}${EXT_TYPE}`)
    .then(response => {
        const products = response.data.products;

        if (!products.length) {
            containerProducts.innerHTML += ` 
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">
                    No hay productos disponible, lo sentimos!
                </h4>
            </div>
        `;
        } else {
            for (const product of products) {
                containerProducts.innerHTML += `
                <div class="col-12 col-md-4 col-lg-3 mb-4">
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
