// scripts.js - General JavaScript functionality for Timbuktu Chamber of Commerce website

// Toggle the navigation menu for mobile view
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
hamburgerBtn.addEventListener("click", toggleMenu);

// Dark Mode Functionality
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    
    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", toggleDarkMode);

// Check for saved user preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Update footer with current year and last modification date
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;