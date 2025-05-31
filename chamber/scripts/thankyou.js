// thankyou.js - Display submitted form data

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display form data
    const formDataDiv = document.getElementById('formData');
    const membershipLevels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership ($100/year)',
        'silver': 'Silver Membership ($250/year)',
        'gold': 'Gold Membership ($500/year)'
    };
    
    formDataDiv.innerHTML = `
        <p><strong>Name:</strong> ${urlParams.get('firstName')} ${urlParams.get('lastName')}</p>
        ${urlParams.get('title') ? `<p><strong>Title:</strong> ${urlParams.get('title')}</p>` : ''}
        <p><strong>Email:</strong> ${urlParams.get('email')}</p>
        <p><strong>Phone:</strong> ${urlParams.get('phone')}</p>
        <p><strong>Business:</strong> ${urlParams.get('business')}</p>
        ${urlParams.get('description') ? `<p><strong>Description:</strong> ${urlParams.get('description')}</p>` : ''}
        <p><strong>Membership Level:</strong> ${membershipLevels[urlParams.get('membership')]}</p>
        <p><strong>Application Date:</strong> ${new Date(urlParams.get('timestamp')).toLocaleString()}</p>
    `;
});