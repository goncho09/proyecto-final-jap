import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(!authorizedUser, './login.html');checkSession(!authorizedUser, './login.html');


//  Función para actualizar subtotal
function updateSubtotal(inputElement) {
    const cartItem = inputElement.closest('.cart-item');
    
    if (!cartItem) {
        console.warn('No se encontró el elemento del carrito');
        return;
    }
    
    // Obtener precio del producto
    const price = parseFloat(cartItem.dataset.productPrice);
    
    // Obtener y validar cantidad
    let quantity = parseInt(inputElement.value);
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        inputElement.value = 1;
    }
    
    // Calcular nuevo subtotal
    const newSubtotal = price * quantity;
    
    // Actualizar display
    const subtotalElement = cartItem.querySelector('.subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = newSubtotal.toFixed(2);
    }
    
    // Actualizar total del carrito
    updateCartTotal();
}

// Función para actualizar el total general del carrito
function updateCartTotal() {
    const allSubtotals = document.querySelectorAll('.subtotal');
    let grandTotal = 0;
    
    allSubtotals.forEach(subtotalElement => {
        grandTotal += parseFloat(subtotalElement.textContent) || 0;
    });
    
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = grandTotal.toFixed(2);
    }
}

// Inicializar event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateSubtotal(this);
        });
        
        // Actualizar en tiempo real
        input.addEventListener('input', function() {
            updateSubtotal(this);
        });
    });
});