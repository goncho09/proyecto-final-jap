import { authorizedUser, checkSession } from "./util/checkLogin.js";

checkSession(!authorizedUser, './login.html');
const productID = localStorage.getItem('productID');

getJSONData(`${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`)
    .then((response) => {
        const data = response.data;

        loadingProductInfo(data)
        loadingProductsRelated(data.relatedProducts);
    });

function loadingProductInfo({ images, name, category, currency, cost, description, soldCount }) {

    const [mainImage, thumbnailContainer] = document.getElementById('image-container').children
    const [title, categoryElement, price, descriptionElement, soldCountElement] = document.getElementById('product-details').children;

    mainImage.id = 'mainImage';
    mainImage.src = images[0];
    mainImage.alt = name;

    images.forEach(imageUrl => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageUrl;
        thumbnail.alt = name;
        thumbnail.className = 'thumbnail';
        thumbnail.addEventListener('click', () => {
            mainImage.src = imageUrl;
        });
        thumbnailContainer.appendChild(thumbnail);
    });

    title.textContent = name;
    categoryElement.textContent = category;
    price.textContent = `${currency} ${cost}`;
    descriptionElement.textContent = description;
    soldCountElement.textContent = `${soldCount} vendidos`;
}

function loadingProductsRelated(relatedProducts) {
    const relatedProductsSection = document.getElementById('related-products');
    relatedProducts.forEach(product => {

        const card = document.createElement('div');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const title = document.createElement('span');

        card.className = 'card m-2 related-product text-center';

        card.addEventListener('click', () => localStorage.setItem('productID', product.id));

        link.href = './product-info.html';
        image.src = product.image;
        image.className = 'card-img-top related-img';
        image.alt = product.name;

        title.textContent = product.name;

        card.appendChild(link);
        link.appendChild(image);
        link.appendChild(title);
        relatedProductsSection.appendChild(card);
    });
}

// --- Comentarios ---
const commentsSection = document.getElementById('comments-section');
let simulatedComments = [];

function mostrarEstrellas(rating) {
    let estrellas = '';

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            estrellas += '<span class="fa fa-star checked"></span>'; // estrella llena
        } else {
            estrellas += '<span class="fa fa-star"></span>'; // estrella vacía
        }
    }
    return estrellas;
}

getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}`).then(
    (response) => {
        simulatedComments = response.data;
        // Render inicial con los comentarios originales //
        renderAllComments();
    }
);

// Función para renderizar todos los comentarios //
function renderAllComments() {
    commentsSection.innerHTML = simulatedComments
        .map(
            (comment) =>
                `
            <div class="d-flex flex-column ">
                <div class="d-flex  align-items-center justify-content-between">
                    <h5 class="fw-bold m-0" style="font-size: 1.2rem;" id="comment-user">${comment.user
                }:</h5>
                    <p class="text-muted m-0" style="white-space: nowrap;font-size:1rem">${comment.dateTime
                }</p>
                </div>
                <div class="d-flex flex-column">
                    <p style="font-size: 1rem;margin:5px 0 5px 0;">
                        ${mostrarEstrellas(comment.score)}
                    </p>
                    <p  style="font-size: 1rem;margin:0">${comment.description
                }</p>
                    </div>
                </div>
            <hr class="my-2" style="border-top: 1px solid #eee;">
    `
        )
        .join('');
}

const sendButton = document.querySelector('.btn.btn-primary'); // botón de enviar
sendButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevenir comportamiento por defecto del botón

    const ratingInput = document.querySelector('input[name="rating"]:checked'); // input de calificación
    const commentInput = document.querySelector('#comentario'); // textarea de comentario

    if (!ratingInput) {
        alert('Selecciona una calificación');
        return;
    }

    const val = parseInt(ratingInput.value, 10);
    const desc = commentInput.value.trim() || 'Comentario simulado';
    const now = new Date();

    simulatedComments.push({
        user: localStorage.getItem('usuarioAutenticado') || 'Desconocido',
        score: val,
        description: desc,
        dateTime:
            now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0],
    });
    // Renderizar todos los comentarios //
    renderAllComments();

    // Limpiar inputs //
    ratingInput.checked = false;
    commentInput.value = '';
});
