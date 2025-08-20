const contenedor = document.getElementById('test');

fetch(`${PRODUCTS_URL}${localStorage.getItem('catID')}${EXT_TYPE}`)
    .then(response => response.json())
    .then(productos => {
        const data = productos.products;
        
        if (data.length !== 0) {

           for (const producto of data) {
             contenedor.innerHTML += `
                <div>
                    <h2>${producto.name}</h2>
                    <img src='${producto.image}' width=300>
                    <p> ${producto.description}</p>
                    <p>  ${producto.currency} ${producto.cost}</p>
                </div>
            `
           }

            return;
        }

        contenedor.innerHTML += ` 
            <div class="alert alert-danger text-center" role="alert">
                <h4 class="alert-heading">
                    No hay productos disponible, lo sentimos!
                </h4>
            </div>
        `;
    });
