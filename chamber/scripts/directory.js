// directory.js - JavaScript for business directory functionality

// DOM Elements
const businessesContainer = document.getElementById('businesses');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

// Store view preference in localStorage
function setViewPreference(view) {
    localStorage.setItem('directoryView', view);
}

// Get view preference from localStorage
function getViewPreference() {
    return localStorage.getItem('directoryView') || 'grid';
}

// Toggle between grid and list views
function toggleView(view) {
    if (view === 'grid') {
        businessesContainer.classList.add('grid');
        businessesContainer.classList.remove('list');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        setViewPreference('grid');
    } else {
        businessesContainer.classList.add('list');
        businessesContainer.classList.remove('grid');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        setViewPreference('list');
    }
}

// Event listeners for view buttons
gridBtn.addEventListener('click', () => toggleView('grid'));
listBtn.addEventListener('click', () => toggleView('list'));

// Get membership level name
function getMembershipLevel(level) {
    switch(level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Member';
    }
}

// Create HTML for a member card
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // Set position relative for badge positioning
    card.style.position = 'relative';
    
    const membershipBadge = document.createElement('div');
    membershipBadge.className = 'member-level';
    membershipBadge.textContent = getMembershipLevel(member.membershipLevel);
    
    const imageSection = document.createElement('div');
    imageSection.className = 'member-image';
    
    const image = document.createElement('img');
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.onerror = function() {
        // Fallback image if the member image doesn't load
        this.src = 'images/placeholder.jpg';
    };
    
    imageSection.appendChild(image);
    
    const detailsSection = document.createElement('div');
    detailsSection.className = 'member-details';
    
    const name = document.createElement('h3');
    name.className = 'member-name';
    name.textContent = member.name;
    
    const tagline = document.createElement('p');
    tagline.className = 'member-tagline';
    tagline.textContent = member.tagline;
    
    const contactSection = document.createElement('div');
    contactSection.className = 'member-contact';
    
    const address = document.createElement('p');
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;
    
    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;
    
    const website = document.createElement('p');
    website.innerHTML = `<strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a>`;
    
    contactSection.appendChild(address);
    contactSection.appendChild(phone);
    contactSection.appendChild(website);
    
    detailsSection.appendChild(name);
    detailsSection.appendChild(tagline);
    detailsSection.appendChild(contactSection);
    
    card.appendChild(membershipBadge);
    card.appendChild(imageSection);
    card.appendChild(detailsSection);
    
    return card;
}

// Fetch and display member data
async function loadMemberData() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Clear the container before adding new elements
        businessesContainer.innerHTML = '';
        
        // Loop through members and create cards
        data.members.forEach(member => {
            const memberCard = createMemberCard(member);
            businessesContainer.appendChild(memberCard);
        });
        
        // Apply saved view preference
        toggleView(getViewPreference());
        
    } catch (error) {
        console.error('Error fetching member data:', error);
        businessesContainer.innerHTML = `<p class="error-message">Failed to load member data. Please try again later.</p>`;
    }
}

// Initialize directory page
document.addEventListener('DOMContentLoaded', loadMemberData);