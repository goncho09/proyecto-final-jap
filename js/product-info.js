if (!localStorage.getItem('usuarioAutenticado')) {
  window.location.replace('./login.html');
}
const productInfo = document.getElementById('product-info');

getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem('productID')}${EXT_TYPE}
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
