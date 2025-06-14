// scripts/products.js

export async function loadFeaturedWigs() {
  const container = document.getElementById('product-container');

  try {
    const response = await fetch('data/wigs.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const wigs = await response.json();

    // Limit to 4-6 featured wigs on home
    const featured = wigs.slice(0, 6);

    const cards = featured.map(wig => `
      <div class="product-card">
        <img src="${wig.image}" alt="${wig.name}" loading="lazy" />
        <h3>${wig.name}</h3>
        <p><strong>Type:</strong> ${wig.type}</p>
        <p><strong>Material:</strong> ${wig.material}</p>
        <p><strong>Price:</strong> ₦${wig.price}</p>
      </div>
    `).join('');

    container.innerHTML = cards;
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Failed to load products. Please try again later.</p>`;
    console.error('Error fetching wigs:', err);
  }
}
