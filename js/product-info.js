// --- Espera a que todo el DOM esté cargado ---//
document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'https://japceibal.github.io/emercado-api/';

  if (!localStorage.getItem('usuarioAutenticado')) {
    window.location.replace('./login.html');
  }
  const productInfo = document.getElementById('product-info');

  getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem(
    'productID'
  )}${EXT_TYPE}
`).then((response) => {
    const data = response.data;

    productInfo.innerHTML = `
    <div class="d-flex flex-column">
            
     <div class="d-flex flex-column align-items-center">
        <img id="mainImage" src="${data.images[0]}" alt="${
      data.name
    }" class="img-fluid mb-3" style="max-height: 400px; object-fit: contain;">
        <div class="d-flex flex-wrap justify-content-center gap-2">
        ${data.images
          .map(
            (image) => `
            <img src="${image}" alt="${data.name}" class="img-thumbnail" style="height: 80px; width: 80px; object-fit: cover; cursor: pointer;"onclick="document.getElementById('mainImage').src='${image}'">
    `
          )
          .join('')}
        </div>
    </div>
    </div>
     <div class="ms-4 mt-3">
  <h2 style="font-size: 1.6rem; font-weight: 700;color: #000;">${data.name}</h2>
  <p style="font-size: 1rem; color: #000; font-weight: 300;">
    ${data.currency} ${data.cost}
  </p>
  <p style="font-size: 0.9rem; color: #565959;">
    ${data.description}
  </p>
  <p class="text-muted" style="font-size: 0.85rem;">
    ${data.soldCount} vendidos
  </p>
</div>

        
    `;
  });

  const commentsSection = document.getElementById('comments-section');
  // Array para almacenar comentarios simulados //
  let simulatedComments = [];

  function mostrarEstrellas(rating) {
    let estrellas = '';

    for (let i = 0; i < 5; i++) {
      console.log(i, rating);
      if (i < rating) {
        estrellas += '<span class="fa fa-star checked"></span>'; // estrella llena
      } else {
        estrellas += '<span class="fa fa-star"></span>'; // estrella vacía
      }
    }
    return estrellas;
  }

  getJSONData(
    `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem(
      'productID'
    )}${EXT_TYPE}`
  ).then((response) => {
    const comments = response.data;

    // Función para renderizar todos los comentarios //
    function renderAllComments() {
      const allComments = comments.concat(simulatedComments);
      commentsSection.innerHTML = allComments
        .map(
          (comment) => `
      <div class="d-flex flex-column ">
      <div class="d-flex  align-items-center justify-content-between">
        <h5 class="fw-bold m-0" style="font-size: 1.2rem;" id="comment-user">${
          comment.user
        }:</h5>
        <p class="text-muted m-0" style="white-space: nowrap;font-size:1rem">${
          comment.dateTime
        }</p>
      </div>
        <div class="d-flex flex-column">
        <p style="font-size: 1rem;margin:5px 0 5px 0;">
            ${mostrarEstrellas(comment.score)}
        </p>
        <p  style="font-size: 1rem;margin:0">${comment.description}</p>
        </div>
      </div>
      <hr class="my-2" style="border-top: 1px solid #eee;">
    `
        )
        .join('');
    }

    // Render inicial con los comentarios originales //
    renderAllComments();

    const sendButton = document.querySelector('.btn.btn-primary'); // botón de enviar
    sendButton.addEventListener('click', (e) => {
      e.preventDefault(); // prevenir comportamiento por defecto del botón

      const ratingInput = document.querySelector(
        'input[name="rating"]:checked'
      ); // input de calificación
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
          now.toISOString().split('T')[0] +
          ' ' +
          now.toTimeString().split(' ')[0],
      });
      // Renderizar todos los comentarios //
      renderAllComments();

      // Limpiar inputs //
      ratingInput.checked = false;
      commentInput.value = '';
    });
  });

  const relatedProductsSection = document.getElementById('related-products');

  getJSONData(
    `${PRODUCT_INFO_URL}${localStorage.getItem('productID')}${EXT_TYPE}`
  ).then((response) => {
    const products = response.data;
    const relatedProducts = products.relatedProducts;
    relatedProductsSection.innerHTML += relatedProducts
      .map(
        (product) => `  
        <div class="card m-2" style="width: 12rem; cursor: pointer;" onclick="setProductID(${product.id})">
            <a href="product-info.html">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 150px; object-fit: cover;border-radius: 15px;">
                <h2 class="fs-6 text-center my-2">${product.name}</h2>
            </a>
        </div>
    `
      )
      .join('');
  });

  function setProductID(id) {
    localStorage.setItem('productID', id);
    window.location = 'product-info.html';
  }
});
