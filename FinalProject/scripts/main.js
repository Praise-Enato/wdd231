// scripts/main.js

import { loadFeaturedWigs } from './products.js';
import { setupNavigation } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedWigs();   // Fetch and render products
  setupNavigation();     // Set up responsive menu
});


