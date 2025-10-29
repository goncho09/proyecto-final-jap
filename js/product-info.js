import { authorizedUser, checkSession } from './util/checkLogin.js';

checkSession(!authorizedUser, './login.html');

const productID = localStorage.getItem('productID');

// --- Cargar producto principal ---
getJSONData(`${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`).then(({ data }) => {
  renderProductInfo(data);
  renderRelatedProducts(data.relatedProducts);
});

// --- Render de producto principal ---
function renderProductInfo({
  images,
  name,
  category,
  currency,
  cost,
  description,
  soldCount,
}) {
  const productInfo = document.getElementById('product-info');

  productInfo.innerHTML = `
    <div class="product-container d-flex flex-column flex-md-row gap-4 align-items-center">
      <div class="image-container text-center">
        <img id="mainImage" src="${
          images[0]
        }" alt="${name}" class="img-fluid main-image mb-3">

        <div class="thumbnail-container d-flex flex-wrap justify-content-center gap-2">
          ${images
            .map(
              (img) => `
              <img src="${img}" alt="${name}" class="thumbnail" 
                onclick="document.getElementById('mainImage').src='${img}'">
            `
            )
            .join('')}
        </div>
      </div>

      <div class="product-details">
        <h1 class="product-title">${name}</h1>
        <h6 class="text-muted">${category}</h6>
        <h3 class="product-price">${currency} ${cost}</h3>
        <p class="product-description">${description}</p>
        <p class="product-sold">${soldCount} vendidos</p>
      </div>
    </div>
  `;
}

// --- Render de productos relacionados ---
function renderRelatedProducts(relatedProducts) {
  const relatedSection = document.getElementById('related-products');

  relatedSection.innerHTML = relatedProducts
    .map(
      (p) => `
      <div class="card m-2 related-product text-center" 
           onclick="localStorage.setItem('productID', ${p.id})">
        <a href="./product-info.html">
          <img src="${p.image}" alt="${p.name}" class="card-img-top related-img">
          <span>${p.name}</span>
        </a>
      </div>
    `
    )
    .join('');
}

// --- Comentarios ---
const commentsSection = document.getElementById('comments-section');
let simulatedComments = [];

getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}`).then(
  ({ data: comments }) => {
    const renderComments = () => {
      const all = [...comments, ...simulatedComments];
      commentsSection.innerHTML = all
        .map(
          (c) => `
        <div class="d-flex flex-column mb-2">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="fw-bold m-0" style="font-size: 1.2rem;">${c.user}:</h5>
            <p class="text-muted m-0" style="white-space: nowrap; font-size: 1rem;">${
              c.dateTime
            }</p>
          </div>
          <div>
            <p class="m-0" style="font-size: 1rem;">${renderStars(c.score)}</p>
            <p class="m-0" style="font-size: 1rem;">${c.description}</p>
          </div>
          <hr class="my-2" style="border-top: 1px solid #eee;">
        </div>
      `
        )
        .join('');
    };

    renderComments();

    // Envío de comentario
    document
      .querySelector('.btn.btn-primary')
      .addEventListener('click', (e) => {
        e.preventDefault();

        const rating = document.querySelector('input[name="rating"]:checked');
        const commentText = document.getElementById('comentario').value.trim();

        if (!rating) return alert('Selecciona una calificación');

        simulatedComments.push({
          user: localStorage.getItem('usuarioAutenticado') || 'Desconocido',
          score: +rating.value,
          description: commentText || 'Comentario simulado',
          dateTime: new Date().toISOString().replace('T', ' ').split('.')[0],
        });

        renderComments();
        rating.checked = false;
        document.getElementById('comentario').value = '';
      });
  }
);

function renderStars(score) {
  return Array.from({ length: 5 }, (_, i) =>
    i < score
      ? '<span class="fa fa-star checked"></span>'
      : '<span class="fa fa-star"></span>'
  ).join('');
}
