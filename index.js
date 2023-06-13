const cardsSection = document.getElementById('cards');
const apiUrl = 'https://diwserver.vps.webdock.cloud/products';



let currentPage = 1;
let totalPages = 0;
let products = [];

// Função para obter os produtos de uma página específica
const fetchProductsByPage = async (page) => {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);
    const data = await response.json();
    totalPages = data.total_pages;
    products = data.products;
    return products;
  } catch (error) {
    console.error('Erro:', error);
  }
};


// Função para exibir os produtos na seção de cards
const displayProducts = () => {
  cardsSection.innerHTML = '';

  products.forEach(product => {
    const { id, title, price, category, image, rating } = product;

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    const cardSubtitle1 = document.createElement('p');
    cardSubtitle1.classList.add('card-subtitle');
    cardSubtitle1.textContent = `Preço: ${price}`;

    const cardSubtitle2 = document.createElement('p');
    cardSubtitle2.classList.add('card-subtitle');
    cardSubtitle2.textContent = `Categoria: ${category}`;

    const cardSubtitle3 = document.createElement('p');
    cardSubtitle3.classList.add('card-subtitle');
    cardSubtitle3.textContent = `Avaliação: ⭐ ${rating.rate}`;

    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.src = image;
    cardImage.alt = title;

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-primary');
    detailsButton.textContent = 'Detalhes';
    detailsButton.addEventListener('click', () => showProductDetails(id));

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardSubtitle1);
    cardContent.appendChild(cardSubtitle2);
    cardContent.appendChild(cardSubtitle3);
    cardContent.appendChild(detailsButton);

    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardContent);

    cardsSection.appendChild(cardElement);
  });

  // Quando o documento estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // ...

  // Adicione um evento de clique às imagens do carrossel
  const carouselImages = document.getElementsByClassName('carousel-image');
  Array.from(carouselImages).forEach(image => {
    const productId = image.getAttribute('alt').split(' ')[1];
    image.addEventListener('click', () => showProductDetails(productId));
  });
});

  const maisVistosSection = document.getElementById('mais-vistos-items');
  maisVistosSection.innerHTML = ''; // Limpar a seção de mais vistos

  // Ordenar os produtos por avaliação em ordem decrescente
  const sortedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate);

  // Obter os 3 primeiros produtos, se houver
  const maisVistosItems = sortedProducts.slice(0, 3);

  maisVistosItems.forEach(item => {
    const { id, title, price, category, image, rating } = item;

    const itemElement = document.createElement('div');
    itemElement.classList.add('card', 'mais-vistos-item');

    const itemContent = document.createElement('div');
    itemContent.classList.add('card-content');

    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('card-title');
    itemTitle.textContent = title;

    const itemSubtitle1 = document.createElement('p');
    itemSubtitle1.classList.add('card-subtitle');
    itemSubtitle1.textContent = `Preço: ${price}`;

    const itemSubtitle2 = document.createElement('p');
    itemSubtitle2.classList.add('card-subtitle');
    itemSubtitle2.textContent = `Categoria: ${category}`;

    const itemSubtitle3 = document.createElement('p');
    itemSubtitle3.classList.add('card-subtitle');
    itemSubtitle3.textContent = `Avaliação: ⭐ ${rating.rate}`;

    const itemImage = document.createElement('img');
    itemImage.classList.add('card-image');
    itemImage.src = image;
    itemImage.alt = title;

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-primary');
    detailsButton.textContent = 'Detalhes';
    detailsButton.addEventListener('click', () => showProductDetails(id));

    itemContent.appendChild(itemTitle);
    itemContent.appendChild(itemSubtitle1);
    itemContent.appendChild(itemSubtitle2);
    itemContent.appendChild(itemSubtitle3);
    itemContent.appendChild(detailsButton);

    itemElement.appendChild(itemImage);
    itemElement.appendChild(itemContent);

    maisVistosSection.appendChild(itemElement);
  });

  // Remover botões existentes
  const paginationButtons = document.getElementsByClassName('pagination-button');
  if (paginationButtons.length > 0) {
    Array.from(paginationButtons).forEach(button => button.remove());
  }

  // Adicionar botões de paginação
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');

  const previousButton = document.createElement('button');
  previousButton.textContent = 'Anterior';
  previousButton.classList.add('pagination-button');
  previousButton.disabled = currentPage === 1;
  previousButton.addEventListener('click', goToPreviousPage);
  buttonWrapper.appendChild(previousButton);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Próxima';
  nextButton.classList.add('pagination-button');
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', goToNextPage);
  buttonWrapper.appendChild(nextButton);

  cardsSection.appendChild(buttonWrapper);
};

// Função para exibir os produtos da página atual
const displayCurrentPage = () => {
  fetchProductsByPage(currentPage)
    .then(() => {
      displayProducts();
    });
};

// Funções para navegação entre as páginas
const goToPreviousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    displayCurrentPage();
  }
};

const goToNextPage = () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayCurrentPage();
  }
};

// Função para exibir os detalhes do produto no modal
const showProductDetails = (productId) => {
  const product = products.find(product => product.id === productId);

  if (product) {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = product.title;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="card-image">
      <p>Preço: ${product.price}</p>
      <p>Categoria: ${product.category}</p>
      <p>Descrição: ${product.description}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
  }
};

const carouselImages = document.querySelectorAll('.carousel-item img');



//fechar o modal

document.addEventListener('keydown', function (event) {
  const modal = document.getElementById('modal');
  const modalVisible = modal.classList.contains('show');
  if (event.key === 'Escape' && modalVisible) {
    bootstrap.Modal.getInstance(modal).hide();
  }
});

document.addEventListener('click', function (event) {
  const modal = document.getElementById('modal');
  const modalVisible = modal.classList.contains('show');
  const target = event.target;
  if (!modal.contains(target) && modalVisible) {
    bootstrap.Modal.getInstance(modal).hide();
  }
});

// Obter informações de paginação e iniciar a busca da primeira página
fetchProductsByPage(currentPage)
  .then(() => {
    displayProducts();
  });

  function redirectToPesquisa(event) {
    event.preventDefault(); 

    var searchInput = document.getElementById('searchInput');
    var query = searchInput.value;
    var urlPesquisa = "https://diwserver.vps.webdock.cloud/products/search?query=" + query;
    localStorage.setItem('urlPesquisa', urlPesquisa);

    // Redirecionar para a página com a URL completa
    window.location.href = 'pesquisa.html';
}

