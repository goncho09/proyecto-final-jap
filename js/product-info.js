if (!localStorage.getItem("usuarioAutenticado")) {
    window.location.replace('./login.html');
}
const productInfo = document.getElementById('product-info');

getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem('productID')}${EXT_TYPE}
`).then(response => {
    const data = response.data;

    // Create main container
    const content = document.createElement('div');
    content.className = 'content';

    // Create row container
    const row = document.createElement('div');
    row.className = 'row h-50';

    // Create carousel column
    const carouselCol = document.createElement('div');
    carouselCol.className = 'col-12 col-md-7 p-0';
    carouselCol.innerHTML = createCarousel(data.images);

    // Create product info column
    const productInfoCol = document.createElement('div');
    productInfoCol.className = 'col-12 col-md-5 product-information p-0';

    // Create flex container
    const flexContainer = document.createElement('div');
    flexContainer.className = 'd-flex flex-column justify-content-between h-100';

    // Create category heading
    const categoryHeading = document.createElement('h1');
    categoryHeading.className = 'text-center my-0';
    categoryHeading.textContent = data.category;

    // Create main information div
    const mainInfo = document.createElement('div');
    mainInfo.className = 'main-information';

    const productName = document.createElement('h4');
    productName.textContent = data.name;

    const productDesc = document.createElement('p');
    productDesc.textContent = data.description;

    mainInfo.appendChild(productName);
    mainInfo.appendChild(productDesc);

    // Create sell information div
    const sellInfo = document.createElement('div');
    sellInfo.className = 'd-flex justify-content-between information-sell';

    const price = document.createElement('p');
    price.className = 'm-0';
    price.textContent = `${data.currency} ${data.cost}`;

    const soldCount = document.createElement('p');
    soldCount.className = 'm-0';
    soldCount.textContent = `${data.soldCount} vendidos`;

    sellInfo.appendChild(price);
    sellInfo.appendChild(soldCount);

    // Append elements to flex container
    flexContainer.appendChild(categoryHeading);
    flexContainer.appendChild(mainInfo);
    flexContainer.appendChild(sellInfo);

    // Append to product info column
    productInfoCol.appendChild(flexContainer);

    // Append columns to row
    row.appendChild(carouselCol);
    row.appendChild(productInfoCol);

    // Create related products section
    const relatedSection = document.createElement('div');
    relatedSection.className = 'product-related';

    const relatedContainer = document.createElement('div');
    relatedContainer.className = 'mt-3';

    const relatedTitle = document.createElement('h3');
    relatedTitle.className = 'text-center';
    relatedTitle.textContent = 'Productos que te podrian interesar';

    const relatedRow = document.createElement('div');
    relatedRow.className = 'row';

    // Create related products
    data.relatedProducts.forEach(relatedProduct => {
        const productCol = document.createElement('div');
        productCol.className = 'col-12 col-sm-6 text-center mt-3';

        const productLink = document.createElement('a');
        productLink.href = './product-info.html';
        productLink.addEventListener('click', () => {
            localStorage.setItem('productID', relatedProduct.id)
        });


        const card = document.createElement('div');
        card.className = 'card bg-dark';

        const cardImage = document.createElement('img');
        cardImage.className = 'card-img';
        cardImage.src = relatedProduct.image;
        cardImage.alt = 'Card image';

        const cardOverlay = document.createElement('div');
        cardOverlay.className = 'card-img-overlay';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title related-title';
        cardTitle.textContent = relatedProduct.name;

        cardOverlay.appendChild(cardTitle);
        card.appendChild(cardImage);
        card.appendChild(cardOverlay);
        productLink.appendChild(card);

        // productLink.appendChild(productImage);
        productCol.appendChild(productLink);
        relatedRow.appendChild(productCol);
    });

    // Append related products elements
    relatedContainer.appendChild(relatedTitle);
    relatedContainer.appendChild(relatedRow);
    relatedSection.appendChild(relatedContainer);

    // Append everything to main content
    content.appendChild(row);
    content.appendChild(relatedSection);

    // Add to page
    productInfo.appendChild(content);
});

function createCarousel(images) {
    return `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    ${images.map((_, index) => `
    <button type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="${index}"
            ${index === 0 ? 'class="active" aria-current="true"' : ''}
            aria-label="Slide ${index + 1}">
    </button>`).join('')}
  </div>
  <div class="carousel-inner">
    ${images.map((image, index) => `
    <div class="carousel-item${index === 0 ? ' active' : ''}">
        <img src="${image}" class="d-block w-100" alt="product-image-${index + 1}">
    </div>`).join('')}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
}
