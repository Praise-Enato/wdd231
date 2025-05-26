// spotlights.js - Member spotlight functionality for Timbuktu Chamber of Commerce

// DOM Element
const spotlightContainer = document.getElementById('spotlight-container');

// Get membership level name
function getMembershipLevel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
    }
}

// Create spotlight card HTML
function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    
    card.innerHTML = `
        <h3>${member.name}</h3>
        <div class="spotlight-image">
            <img src="images/${member.image}" alt="${member.name} logo" onerror="this.src='images/placeholder.jpg'">
        </div>
        <p class="member-tagline">"${member.tagline}"</p>
        <div class="member-contact">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></p>
        </div>
        <div class="member-level ${getMembershipLevel(member.membershipLevel).toLowerCase()}">
            ${getMembershipLevel(member.membershipLevel)} Member
        </div>
    `;
    
    return card;
}

// Display random spotlights
function displaySpotlights(members) {
    // Filter for gold (3) and silver (2) members only
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3
    );
    
    // Check if we have enough members
    if (qualifiedMembers.length === 0) {
        spotlightContainer.innerHTML = '<p>No spotlight members available at this time.</p>';
        return;
    }
    
    // Shuffle array and pick 2-3 members
    const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
    const selectedCount = Math.min(3, Math.max(2, shuffled.length));
    const selectedMembers = shuffled.slice(0, selectedCount);
    
    spotlightContainer.innerHTML = '';
    
    selectedMembers.forEach(member => {
        const spotlightCard = createSpotlightCard(member);
        spotlightContainer.appendChild(spotlightCard);
    });
}

// Fetch member data and display spotlights
async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displaySpotlights(data.members);
        
    } catch (error) {
        console.error('Error fetching member data:', error);
        spotlightContainer.innerHTML = '<p>Member spotlights unavailable at this time.</p>';
    }
}

// Initialize spotlights when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchMemberData);