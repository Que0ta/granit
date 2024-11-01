document.addEventListener("DOMContentLoaded", function () {
    const navbarAdaptive = document.querySelector(".navbar-adaptive");
    const modalNav = document.getElementById("modalNav");
    const contactINFO = document.querySelector(".contact_info");
    const closeBtn = modalNav.querySelector(".close-btn");

    navbarAdaptive.addEventListener("click", () => {
        modalNav.style.display = "flex";  // Show modal
        contactINFO.style.display = "block";  // Show modal
        contactINFO.style.margin = "100px 0 0 0";
    }); 

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();               // Prevent default link behavior
        modalNav.style.display = "none";  // Hide modal
    });
});

// Navbar underline
// 
// Function to update the active link based on the current URL
function setActiveLink() {
    const currentURL = window.location.pathname;

    // Select all <a> elements inside the <nav> and the modal menu
    const navLinks = document.querySelectorAll('nav a, .modal-content a');
    const catalogLink = document.getElementById('catalog-link');
    
    // List of "Каталог" dropdown links
    const catalogLinks = document.querySelectorAll('.dropdown-content a');

    // Remove 'active' from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Check if any catalog option matches the current URL
    let isCatalogActive = false;
    catalogLinks.forEach(link => {
        if (link.getAttribute('href') === currentURL) {
            isCatalogActive = true;
            link.classList.add('active'); // Mark the specific option as active
        }
    });

    // Set 'active' for "Каталог" if any of its options is active
    if (isCatalogActive) {
        catalogLink.classList.add('active');
    } else {
        // Otherwise, add 'active' to the link that matches the URL
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentURL) {
                link.classList.add('active');
            }
        });
    }
}

// Set the active link on page load
setActiveLink();

// Update the active link when clicking any navigation link
document.querySelectorAll('nav a, .modal-content a').forEach(link => {
    link.addEventListener('click', function() {
        setActiveLink();
    });
});