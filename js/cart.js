import { authorizedUser, checkSession } from './util/checkLogin.js';
import { Header } from './header.js'

checkSession(!authorizedUser, './login.html');
new Header(authorizedUser)
async function calcularPrecioSubtotal() {
    const productsInCart = JSON.parse(localStorage.getItem('carrito'));
    let total = 0;

    for (const { id, cantidad } of productsInCart) {
        const { data: product } = await getJSONData(
            `${PRODUCT_INFO_URL}${id}${EXT_TYPE}`
        );
        if (!product) {
            console.error(`Producto con ID ${id} no encontrado.`);
            continue;
        }
        total += product.cost * cantidad;
    }

    return total;
}

// Función para actualizar el subtotal
async function updateSubtotal() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    const IVA = 0.22;

    // Calcular nuevo subtotal
    const subtotal = await calcularPrecioSubtotal();
    const total = subtotal + subtotal * IVA;

    // Actualizar los elementos en el DOM
    subtotalElement.textContent = `Subtotal: $${subtotal}`;
    totalElement.textContent = `Total: $${total}`;
}

function aumentarCantidad(id, quantityInput) {
    try {
        const productsInCart = JSON.parse(localStorage.getItem('carrito')) || [];
        const product = productsInCart.find((p) => parseInt(p.id) === id);
        if (product) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            product.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(productsInCart));
            updateSubtotal();
        } else {
            console.error('Producto no encontrado en el carrito');
        }
    } catch (error) {
        console.error('Error al aumentar la cantidad:', error);
    }
}

function disminuirCantidad(id, quantityInput) {
    try {
        const productsInCart = JSON.parse(localStorage.getItem('carrito')) || [];
        const product = productsInCart.find((p) => parseInt(p.id) === id);

        if (product) {
            if (product.cantidad == 1) {
                productsInCart.splice(productsInCart.indexOf(product), 1);
                localStorage.setItem('carrito', JSON.stringify(productsInCart));
                alert('El producto ha sido eliminado del carrito.');
                location.reload();
            } else {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                product.cantidad--;
                localStorage.setItem('carrito', JSON.stringify(productsInCart));
                updateSubtotal();
            }
        }
    } catch (error) {
        console.error('Error al disminuir la cantidad:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const noProductsMessage = document.getElementById('no-products');
    const cartTableBody = document.getElementById('cart-products-body');
    const productsInCart = JSON.parse(localStorage.getItem('carrito'));

    if (!productsInCart || productsInCart.length === 0) {
        console.log('No hay productos en el carrito');
        noProductsMessage.style.display = 'block';
        return;
    } else {
        cartTableBody.style.display = 'table-row-group';
    }

    const productsTableBody = document.getElementById('cart-products-body');

    // Renderizar los productos
    productsInCart.forEach(({ id, cantidad }) => {
        getJSONData(`${PRODUCT_INFO_URL}${id}${EXT_TYPE}`).then(
            ({ data: product }) => {
                if (!product) return;

                const row = document.createElement('tr');
                row.classList.add('cart-item');
                row.innerHTML = `
          <td">
            <div class="product-info">
              <img src="${product.images[0]}" alt="${product.name}" class="product-image" />
              <p class="product-name">${product.name}</p>
            </div>
          </td>
          <td>
            <p class="product-price">${product.currency} $${product.cost}</p>
          </td>
          <td>
            <div class="quantity-controls">
              <button class="quantity-button decrease" data-id="${product.id}">-</button>
              <input type="text" class="quantity-input" data-id="${product.id}" value="${cantidad}" readonly/>
              <button class="quantity-button increase" data-id="${product.id}">+</button>
            </div>
          </td>
        `;
                productsTableBody.appendChild(row);
            }
        );
    });

    productsTableBody.addEventListener('click', function (e) {
        const quantityInput = document.querySelector('.quantity-input');
        if (e.target.classList.contains('decrease')) {
            const id = parseInt(e.target.dataset.id);
            disminuirCantidad(id, quantityInput);
            updateSubtotal();
        }

        if (e.target.classList.contains('increase')) {
            const id = parseInt(e.target.dataset.id);
            aumentarCantidad(id, quantityInput);
            updateSubtotal();
        }
    });

    // Inicializar subtotal y total
    updateSubtotal();
});
