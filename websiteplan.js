// Neriss Hair Penache - Website Plan JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupInteractiveElements();
    setupColorPalette();
    setupWireframeInteractions();
    setupSmoothScrolling();
    addPlanningFeatures();
});

// Initialize page functionality
function initializePage() {
    console.log('Neriss Hair Penache Website Plan Loaded');
    
    // Fade-in animation delay for sections
    document.querySelectorAll('.section').forEach((section, idx) => {
        section.style.animationDelay = `${idx * 0.1}s`;
    });

    // Add current date to plan
    const header = document.querySelector('header p');
    if (header) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        header.textContent = `Website Planning Document - Created ${currentDate}`;
    }

    // Initialize local storage for plan data
    if (!localStorage.getItem('nerissWebsitePlan')) {
        const planData = {
            siteName: 'Neriss Hair Penache',
            domain: 'neriss-hair-penache.com',
            colors: ['#FF69B4', '#FFB6C1', '#FFF0F5', '#8B0000', '#FF1493'],
            fonts: ['Arial', 'Georgia', 'Verdana'],
            lastUpdated: new Date().toISOString(),
            planningNotes: []
        };
        localStorage.setItem('nerissWebsitePlan', JSON.stringify(planData));
    }
}

// Setup interactive elements
function setupInteractiveElements() {
    // Section click highlight
    document.querySelectorAll('.section').forEach(section => {
        section.addEventListener('click', function(e) {
            if (e.target.classList.contains('color-box') || e.target.classList.contains('wireframe-element')) return;
            this.style.borderLeftColor = getRandomPinkShade();
            this.style.backgroundColor = '#FFEEF7';
            setTimeout(() => { this.style.backgroundColor = 'white'; }, 1000);
        });
    });

    // Highlight hover
    document.querySelectorAll('.highlight').forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(1deg)';
        });
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Setup color palette interactions
function setupColorPalette() {
    document.querySelectorAll('.color-box').forEach(colorBox => {
        colorBox.addEventListener('click', function() {
            const bgColor = window.getComputedStyle(this).backgroundColor;
            const colorName = this.textContent;
            showColorInfo(colorName, bgColor);
            previewColor(bgColor);
        });

        colorBox.addEventListener('mouseenter', function() {
            if (!this.querySelector('.tooltip')) {
                const tooltip = createTooltip(this.textContent + ' - Click to preview');
                this.appendChild(tooltip);
            }
        });

        colorBox.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        pointer-events: none;
    `;
    return tooltip;
}

function showColorInfo(colorName, bgColor) {
    const modal = document.createElement('div');
    modal.className = 'color-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; justify-content: center; align-items: center;
        z-index: 1000;
    `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 20px; border-radius: 10px;
        text-align: center; max-width: 300px; border: 3px solid #FF69B4;
    `;
    modalContent.innerHTML = `
        <h3 style="color: #FF1493; margin-bottom: 10px;">${colorName}</h3>
        <div style="width: 100px; height: 100px; background: ${bgColor}; margin: 10px auto; border-radius: 8px; border: 2px solid #ddd;"></div>
        <p style="color: #8B0000; margin: 10px 0;">Color: ${bgColor}</p>
        <button id="closeColorModal" style="background: #FF69B4; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Close</button>
    `;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.id === 'closeColorModal') modal.remove();
    });
}

function previewColor(color) {
    const headers = document.querySelectorAll('h2, h3');
    const originalColors = [];
    headers.forEach((header, idx) => {
        originalColors[idx] = header.style.color;
        header.style.color = color;
        header.style.transition = 'color 0.5s ease';
    });
    setTimeout(() => {
        headers.forEach((header, idx) => {
            header.style.color = originalColors[idx] || '';
        });
    }, 3000);
}

// Setup wireframe interactions
function setupWireframeInteractions() {
    document.querySelectorAll('.wireframe-element').forEach(element => {
        element.addEventListener('click', function(e) {
            showWireframeInfo(this.textContent.trim());
            createRippleEffect(this, e);
        });
    });
}

function showWireframeInfo(elementType) {
    const infoMap = {
        'Neriss Hair Penache Logo': 'Brand identity and navigation anchor point',
        '☰ Menu': 'Mobile navigation toggle for responsive design',
        'Hero Image': 'Primary visual impact area with call-to-action',
        'Hero Banner: Professional Wig Care Services': 'Main banner for desktop, with CTAs',
        'Welcome Section': 'Introduction to services and expertise',
        'Services Overview': 'Key offerings and professional capabilities',
        'Featured Products': 'Highlighted wig products with care information',
        'Testimonials': 'Customer reviews and feedback',
        'Care Tips Preview': 'Quick tips for wig care',
        'Contact': 'Contact details and form',
        'Social Links': 'Links to social media',
        'Video Link': 'Demo or intro video',
        'Contact Information': 'Business details and consultation booking',
        'Attributions': 'Credits and attributions',
        'Customer Reviews & Testimonials': 'Social proof and feedback',
        'Services & Expertise': 'Professional services offered',
        'Featured Products & Care Tips': 'Product highlights and care tips'
    };
    const info = infoMap[elementType] || 'Website planning element';
    const infoDiv = document.createElement('div');
    infoDiv.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #FF69B4; color: white; padding: 15px;
        border-radius: 8px; max-width: 250px; z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    infoDiv.innerHTML = `<strong>${elementType}</strong><br><small>${info}</small>`;
    document.body.appendChild(infoDiv);
    setTimeout(() => { infoDiv.remove(); }, 3000);
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 105, 180, 0.6);
        border-radius: 50%;
        width: 10px; height: 10px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        left: 50%; top: 50%; transform: translate(-50%, -50%);
    `;
    element.style.position = 'relative';
    element.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 600);
}

// Setup smooth scrolling and navigation dots
function setupSmoothScrolling() {
    createNavigationDots();
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-dot')) {
            e.preventDefault();
            const idx = parseInt(e.target.getAttribute('data-section'), 10);
            const section = document.querySelectorAll('.section')[idx];
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function createNavigationDots() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.createElement('div');
    navDots.className = 'nav-dots';
    navDots.style.cssText = `
        position: fixed; right: 20px; top: 50%;
        transform: translateY(-50%);
        display: flex; flex-direction: column; gap: 10px; z-index: 100;
    `;
    sections.forEach((section, idx) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.setAttribute('data-section', idx);
        dot.style.cssText = `
            width: 12px; height: 12px; background: #FFB6C1;
            border-radius: 50%; cursor: pointer;
            transition: all 0.3s ease; border: 2px solid #FF69B4;
        `;
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.background = '#FF69B4';
        });
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#FFB6C1';
        });
        navDots.appendChild(dot);
    });
    document.body.appendChild(navDots);
}

// Add planning features: tools button, modal, progress tracker
function addPlanningFeatures() {
    // Planning tools button
    const toolsButton = document.createElement('button');
    toolsButton.textContent = '📝 Planning Tools';
    toolsButton.style.cssText = `
        position: fixed; bottom: 20px; left: 20px;
        background: #FF69B4; color: white; border: none;
        padding: 12px 16px; border-radius: 8px; cursor: pointer;
        font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.2); z-index: 100;
    `;
    toolsButton.addEventListener('click', showPlanningTools);
    document.body.appendChild(toolsButton);

    // Progress tracker
    addProgressTracker();
}

function showPlanningTools() {
    // Remove any existing modal
    const oldModal = document.querySelector('.planning-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'planning-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; justify-content: center; align-items: center;
        z-index: 1000;
    `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 30px; border-radius: 15px;
        max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;
        border: 3px solid #FF69B4;
    `;
    modalContent.innerHTML = `
        <h2 style="color: #FF1493; margin-bottom: 20px;">🛠️ Planning Tools</h2>
        <div style="margin-bottom: 20px;">
            <h3 style="color: #C71585;">Add Planning Note:</h3>
            <textarea id="planning-note" placeholder="Enter your planning notes..." style="width: 100%; height: 80px; padding: 10px; border: 2px solid #FFB6C1; border-radius: 5px; margin: 10px 0;"></textarea>
            <button id="addNoteBtn" style="background: #FF69B4; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Add Note</button>
        </div>
        <div style="margin-bottom: 20px;">
            <h3 style="color: #C71585;">Export Plan Data:</h3>
            <button id="exportPlanBtn" style="background: #FF1493; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin: 5px;">Export JSON</button>
            <button id="printPlanBtn" style="background: #C71585; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin: 5px;">Print Plan</button>
        </div>
        <div id="planning-notes-list"></div>
        <button id="closePlanningModal" style="background: #8B0000; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">Close</button>
    `;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Load notes
    renderPlanningNotes();

    // Event listeners for modal buttons
    modalContent.querySelector('#addNoteBtn').onclick = function() {
        const textarea = modalContent.querySelector('#planning-note');
        const note = textarea.value.trim();
        if (note) {
            addPlanningNote(note);
            textarea.value = '';
            renderPlanningNotes();
        }
    };
    modalContent.querySelector('#exportPlanBtn').onclick = exportPlanData;
    modalContent.querySelector('#printPlanBtn').onclick = printPlan;
    modalContent.querySelector('#closePlanningModal').onclick = function() {
        modal.remove();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
    };
}

function addPlanningNote(note) {
    const plan = JSON.parse(localStorage.getItem('nerissWebsitePlan'));
    plan.planningNotes.push({ note, date: new Date().toLocaleString() });
    plan.lastUpdated = new Date().toISOString();
    localStorage.setItem('nerissWebsitePlan', JSON.stringify(plan));
}

function renderPlanningNotes() {
    const plan = JSON.parse(localStorage.getItem('nerissWebsitePlan'));
    const notesDiv = document.querySelector('.planning-modal #planning-notes-list');
    if (!notesDiv) return;
    if (!plan.planningNotes.length) {
        notesDiv.innerHTML = '<em>No planning notes yet.</em>';
        return;
    }
    notesDiv.innerHTML = '<h4 style="color:#C71585;">Notes:</h4>' +
        plan.planningNotes.map((n, i) =>
            `<div style="background:#FFEEF7; margin:5px 0; padding:8px; border-radius:5px; border-left:3px solid #FF69B4;">
                <span>${n.note}</span>
                <br><small style="color:#8B0000;">${n.date}</small>
                <button data-del="${i}" style="float:right; background:#FF1493; color:white; border:none; border-radius:3px; padding:2px 8px; cursor:pointer;">Delete</button>
            </div>`
        ).join('');
    // Delete note buttons
    notesDiv.querySelectorAll('button[data-del]').forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(this.getAttribute('data-del'), 10);
            plan.planningNotes.splice(idx, 1);
            localStorage.setItem('nerissWebsitePlan', JSON.stringify(plan));
            renderPlanningNotes();
        };
    });
}

function exportPlanData() {
    const plan = localStorage.getItem('nerissWebsitePlan');
    const blob = new Blob([plan], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neriss-website-plan.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function printPlan() {
    window.print();
}

function addProgressTracker() {
    const sections = document.querySelectorAll('.section');
    const tracker = document.createElement('div');
    tracker.className = 'progress-tracker';
    tracker.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: #FFF0F5; color: #8B0000; border: 2px solid #FFB6C1;
        border-radius: 8px; padding: 10px 18px; font-size: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 100;
    `;
    tracker.innerHTML = `Progress: <span id="progress-count">0</span> / ${sections.length}`;
    document.body.appendChild(tracker);

    function updateProgress() {
        let count = 0;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) count++;
        });
        tracker.querySelector('#progress-count').textContent = count;
    }
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Utility
function getRandomPinkShade() {
    const pinks = ['#FF69B4', '#FFB6C1', '#FF1493', '#C71585', '#FFE4E1'];
    return pinks[Math.floor(Math.random() * pinks.length)];
}