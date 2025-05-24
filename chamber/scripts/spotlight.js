// spotlights.js - Member spotlight functionality for Timbuktu Chamber of Commerce

// DOM Element
const spotlightContainer = document.getElementById('spotlight-container');

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

// Display random spotlights
function displaySpotlights(members) {
    // Filter for gold and silver members (levels 2 and 3)
    const qualifiedMembers = members.filter(member => member.membershipLevel >= 2);
    
    // Shuffle array and pick 2-3 members
    const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, Math.min(3, shuffled.length));
    
    spotlightContainer.innerHTML = '';
    
    selectedMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-card';
        
        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" onerror="this.src='images/placeholder.jpg'">
            <p class="member-tagline">${member.tagline}</p>
            <div class="member-contact">
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, '')}</a></p>
            </div>
            <div class="member-level">${getMembershipLevel(member.membershipLevel)} Member</div>
        `;
        
        spotlightContainer.appendChild(spotlightCard);
    });
}

// Get membership level name
function getMembershipLevel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
    }
}

// Initialize spotlights
document.addEventListener('DOMContentLoaded', fetchMemberData);