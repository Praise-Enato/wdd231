// discover.js - Discover page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load attractions from JSON
    loadAttractions();
    
    // Handle visitor message
    displayVisitMessage();
});

// Load attractions from JSON and display them
async function loadAttractions() {
    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) throw new Error('Failed to load attractions');
        
        const data = await response.json();
        displayAttractions(data.attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
        document.getElementById('attractionsGallery').innerHTML = 
            '<p>Unable to load attractions at this time.</p>';
    }
}

// Display attractions in the gallery
function displayAttractions(attractions) {
    const gallery = document.getElementById('attractionsGallery');
    gallery.innerHTML = '';
    
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="images/${attraction.image}" alt="${attraction.name}" loading="lazy">
                <figcaption>${attraction.name}</figcaption>
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more" aria-label="Learn more about ${attraction.name}">Learn More</button>
        `;
        
        gallery.appendChild(card);
    });
}

// Display visitor message based on last visit
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const messageElement = document.getElementById('lastVisitMessage');
    
    if (!lastVisit) {
        // First visit
        messageElement.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSince < 1) {
            messageElement.textContent = 'Back so soon! Awesome!';
        } else {
            const dayText = daysSince === 1 ? 'day' : 'days';
            messageElement.textContent = `You last visited ${daysSince} ${dayText} ago.`;
        }
    }
    
    // Store current visit
    localStorage.setItem('lastVisit', now);
}