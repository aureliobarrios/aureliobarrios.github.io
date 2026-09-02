// Function to set the current year in the footer
function setCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Function to manage the dark mode theme
function setupDarkModeToggle() {
    // Assuming a button or switch with the ID 'theme-toggle' exists in the HTML
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if the toggle button exists, otherwise log a warning and exit.
    if (!toggle) {
        console.warn("Theme toggle button with ID 'theme-toggle' not found. Dark mode functionality skipped.");
        return;
    }

    // 1. Check local storage for preference or default to system preference
    const prefersDark = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color: dark)').matches;

    // Determine initial state: Local Storage preference > System Preference > Default Light
    let isDark = (prefersDark === 'dark') || (prefersDark === null && systemDark);
    
    // 2. Apply initial class
    if (isDark) {
        body.classList.add('dark-mode');
    }

    // 3. Handle click event
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}


// Function to smooth scroll for navigation links (optional, but good practice)
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset to account for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setupSmoothScroll();
    setupDarkModeToggle();
    console.log("Personal website script loaded successfully.");
});