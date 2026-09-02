// Function to set the current year in the footer
function setCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
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
    console.log("Personal website script loaded successfully.");
});