// scripts/shop.js

const shopContainer = document.getElementById('shop-container');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

async function fetchWigs() {
  try {
    const response = await fetch('data/wigs.json');
    if (!response.ok) throw new Error('Failed to fetch wigs');
    const wigs = await response.json();
    displayWigs(wigs);
  } catch (err) {
    shopContainer.innerHTML = `<p style="color:red;">Error loading wigs. Please try again later.</p>`;
    console.error(err);
  }
}

function displayWigs(wigs) {
  shopContainer.innerHTML = wigs.map(wig => `
    <div class="product-card interactive" data-id="${wig.id}">
      <img src="${wig.image}" alt="${wig.name}" loading="lazy" />
      <h3>${wig.name}</h3>
      <p><strong>Type:</strong> ${wig.type}</p>
      <p><strong>Material:</strong> ${wig.material}</p>
      <p><strong>Price:</strong> ₦${wig.price}</p>
    </div>
  `).join('');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'));
      const selectedWig = wigs.find(w => w.id === id);
      showModal(selectedWig);
    });
  });
}

function showModal(wig) {
  modalBody.innerHTML = `
    <img src="${wig.image}" alt="${wig.name}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;" />
    <h2>${wig.name}</h2>
    <p><strong>Type:</strong> ${wig.type}</p>
    <p><strong>Material:</strong> ${wig.material}</p>
    <p><strong>Price:</strong> ₦${wig.price}</p>
    <p><strong>Description:</strong> A premium quality ${wig.material.toLowerCase()} wig with professional-grade finishing, ideal for both daily and event wear.</p>
    <button id="addToCartBtn">Add to Cart</button>
  `;
  modal.style.display = 'block';

  document.getElementById('addToCartBtn').addEventListener('click', function() {
    // Add to cart logic here
  });
}

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.getElementById('doSomethingBtn').addEventListener('click', doSomething);

fetchWigs();
