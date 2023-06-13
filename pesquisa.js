var urlPesquisa = localStorage.getItem('urlPesquisa');
const cardsSection = document.getElementById('cards');

async function buscarProdutos() {
  try {
    const resultado = await fetch(urlPesquisa);
    const resposta = await resultado.json();

    if (resposta.length === 0) {
      cardsSection.innerHTML = '<p class="resposta">Não há produtos disponíveis.</p>';
    } else {
      printarprodutos(resposta);
    }
  } catch (erro) {
    console.error('Erro ao obter os produtos:', erro);
  }
}

function printarprodutos(produtos) {
  cardsSection.innerHTML = '';

  produtos.forEach((prod) => {
    const { id, title, price, category, image, rating } = prod;
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = image;
    cardImage.alt = 'Card image cap';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = `<strong>Título:</strong> ${title}`;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-subtitle', 'mb-2');
    cardPrice.innerHTML = `<strong>Preço:</strong> ${price}`;

    const cardCategory = document.createElement('p');
    cardCategory.classList.add('card-subtitle', 'mb-2');
    cardCategory.innerHTML = `<strong>Categoria:</strong> ${category}`;

    const cardRating = document.createElement('p');
    cardRating.classList.add('card-subtitle', 'mb-2');
    cardRating.innerHTML = `<strong>Avaliação: ⭐</strong> ${rating.rate}`;

    const detalhesButton = document.createElement('button');
    detalhesButton.classList.add('btn', 'btn-primary');
    detalhesButton.textContent = 'Detalhes';
    detalhesButton.addEventListener('click', () => {
      verProduto(id, produtos);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardRating);
    cardBody.appendChild(detalhesButton);

    card.appendChild(cardImage);
    card.appendChild(cardBody);

    cardsSection.appendChild(card);
  });
}

//modal
function verProduto(id, produtos) {
  const prod = produtos.find((prod) => prod.id === id);
  if (prod) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = prod.title;
    modalBody.innerHTML = `
      <img class="modal-img" src="${prod.image}" alt="Product Image">
      <p><strong>Título:</strong> ${prod.title}</p>
      <p><strong>Preço:</strong> ${prod.price}</p>
      <p><strong>Categoria:</strong> ${prod.category}</p>
      <p><strong>Categoria:</strong> ${prod.description}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
  }
}



// Chamar a função para buscar e imprimir os produtos
buscarProdutos();

//fechar o modal
window.onload = function() {
  document.addEventListener('keydown', function (event) {
    const modal = document.querySelector('#modal');
    const modalVisible = modal.classList.contains('show');
    if (event.key === 'Escape' && modalVisible) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.hide();
    }
  });
};



document.addEventListener('click', function (event) {
  const modal = document.getElementById('modal');
  const modalVisible = modal.classList.contains('show');
  const target = event.target;
  if (!modal.contains(target) && modalVisible) {
    bootstrap.Modal.getInstance(modal).hide();
  }
});