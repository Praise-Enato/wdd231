// join.js - Form and membership functionality for join page

// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set form timestamp
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();
    
    // Initialize modals
    initModals();
    
    // Animate membership cards
    animateCards();
});

// Initialize modal functionality
function initModals() {
    // Get all modal elements
    const modals = document.querySelectorAll('.modal');
    const buttons = document.querySelectorAll('.info-btn');
    const closeSpans = document.querySelectorAll('.close');
    
    // Add click event to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });
    
    // Add click event to close buttons
    closeSpans.forEach(span => {
        span.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Animate membership cards on page load
function animateCards() {
    const cards = document.querySelectorAll('.membership-cards .card');
    let delay = 0;
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);
        
        delay += 150; // Stagger the animations
    });
}