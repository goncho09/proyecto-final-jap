import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(!authorizedUser, './login.html');checkSession(!authorizedUser, './login.html');

// Función para actualizar el subtotal
function updateSubtotal() {
    const priceElement = document.querySelector('.product-price');
    const quantityInput = document.querySelector('.quantity-input');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioElement = document.getElementById('envio');
    
    // Extraer el precio 
    const price = parseFloat(priceElement.textContent.replace('USD $', ''));
    const quantity = parseInt(quantityInput.value);
    
    // Calcular nuevo subtotal
    const newSubtotal = price * quantity;
    
    // Extraer costo de envío
    const envio = parseFloat(envioElement.textContent.replace('Envío: $', ''));
    
    // Calcular nuevo total
    const newTotal = newSubtotal + envio;
    
    // Actualizar los elementos en el DOM
    subtotalElement.textContent = `Subtotal: $${newSubtotal.toFixed(2)}`;
    totalElement.textContent = `Total: $${newTotal.toFixed(2)}`;
}

// Agregar event listeners cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    // Botón aumentar
    document.querySelector('.increase-quantity').addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
        updateSubtotal();
    });
    
    // Botón disminuir
    document.querySelector('.decrease-quantity').addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            updateSubtotal();
        }
    });
    
    // Cambio directo en el input
    document.querySelector('.quantity-input').addEventListener('input', updateSubtotal);
});