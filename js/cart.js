import { authorizedUser, checkSession } from './util/checkLogin.js';
import { Header } from './header.js';

checkSession(!authorizedUser, './login.html');
new Header(authorizedUser);

const numberProducts = document.getElementById('number-products');
let numberProducstTotal = parseInt(numberProducts.textContent);

function calculateSubtotal() {
    const productsInCart = JSON.parse(localStorage.getItem('carrito'));

    if (!productsInCart || productsInCart.length === 0) {
        return 0;
    }

    let total = 0;

    productsInCart.forEach(product => {
        total += product.price.split(' ')[1] * product.cantidad;
    })

    return total;
}

// Función para actualizar el subtotal
function updateSubtotal() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    const IVA = 0.22;

    // Calcular nuevo subtotal
    const subtotal = calculateSubtotal();
    const total = subtotal + subtotal * IVA;


    // Actualizar los elementos en el DOM
    subtotalElement.textContent = `Subtotal: $${subtotal.toLocaleString()}`;
    totalElement.textContent = `Total: $${parseInt(total).toLocaleString()}`;

}

function decreaseUnit(id, quantityInput) {

    const productsInCart = JSON.parse(localStorage.getItem('carrito'));
    const product = productsInCart.find((p) => parseInt(p.id) === id);
    if (product) {
        quantityInput.textContent = parseInt(quantityInput.textContent) + 1;
        product.cantidad++;
        numberProducstTotal++;
        localStorage.setItem('carrito', JSON.stringify(productsInCart));
        updateSubtotal();
    }

    numberProducts.textContent = numberProducstTotal;
}

function disminuirCantidad(id, quantityInput) {

    let quantityNumber = parseInt(quantityInput.textContent);

    if (quantityNumber === 1) {
        return;
    }

    const productsInCart = JSON.parse(localStorage.getItem('carrito'));

    const product = productsInCart.find((p) => parseInt(p.id) === id);

    if (product) {
        quantityInput.textContent = quantityNumber - 1;
        product.cantidad--;
        numberProducstTotal--;
        localStorage.setItem('carrito', JSON.stringify(productsInCart));
        updateSubtotal();

    }

    numberProducts.textContent = numberProducstTotal;
}

document.addEventListener('DOMContentLoaded', function () {
    const noProductsMessage = document.getElementById('no-products');
    const cartTableBody = document.getElementById('cart-products-body');
    const productsInCart = JSON.parse(localStorage.getItem('carrito'));

    if (!productsInCart || productsInCart.length === 0) {
        noProductsMessage.classList.remove('d-none')
        return;
    } else {
        cartTableBody.style.display = 'table-row-group';
    }

    const productsTableBody = document.getElementById('cart-products-body');

    // Renderizar los productos
    productsInCart.forEach(product => {

        const row = document.createElement('tr');
        row.classList.add('cart-item');
        row.id = "cart-item"
        row.innerHTML = `
          <td>
            <div class="product-info">
              <img src="${product.image}" alt="${product.title}" class="product-image" />
              <p class="product-name">${product.title}</p>
            </div>
          </td>
          <td>
            <p class="product-price">${product.price}</p>
          </td>
          <td id="quantity-controls" class="quantity-container">
            <div class="quantity-controls">
              <button class="quantity-button decrease" data-id="${product.id}">-</button>
              <span class="quantity-input" data-id="${product.id}">${product.cantidad}</span>
              <button class="quantity-button increase" data-id="${product.id}">+</button>
            </div>

          </td>
        `;
        productsTableBody.appendChild(row);
    });

    productsTableBody.addEventListener('click', function (e) {
        const quantityInputs = document.querySelectorAll('.quantity-input')

        const qualityInput = Array.from(quantityInputs).find(item => item.dataset.id === e.target.dataset.id);

        if (e.target.classList.contains('decrease')) {
            const id = parseInt(e.target.dataset.id);
            disminuirCantidad(id, qualityInput);
            updateSubtotal();
        }

        if (e.target.classList.contains('increase')) {
            const id = parseInt(e.target.dataset.id);
            decreaseUnit(id, qualityInput);
            updateSubtotal();
        }
    });

    const items = document.querySelectorAll('#cart-item')
    items.forEach(item => {
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = `
            <img src="./img/bin.png">
        `
        btnDelete.className = 'btn-delete'
        btnDelete.addEventListener('click', (event) => {

            //Se obtiene el id del producto que esta en los controles quantity controls
            const idProduct = event.target.parentNode.querySelector('.decrease').dataset.id;
            const quantity = event.target.parentNode.querySelector('.quantity-input');
           const quantityTotal = parseInt(numberProducts.textContent) - parseInt(quantity.textContent);
            const carrito = JSON.parse(localStorage.getItem('carrito'));
            const newCarrito = carrito.filter(item => item.id !== idProduct);

            localStorage.setItem('carrito', JSON.stringify(newCarrito));
            productsTableBody.removeChild(event.target.parentNode);
            updateSubtotal();

            if (productsTableBody.children.length === 1) {
                noProductsMessage.classList.remove('d-none');
            }

            numberProducts.textContent = quantityTotal;
        });
        item.append(btnDelete);
    })


});

// Inicializar subtotal y total
updateSubtotal();
