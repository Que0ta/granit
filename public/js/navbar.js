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
