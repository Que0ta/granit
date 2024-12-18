// Image array (you can replace this with actual URLs)
const imageUrls = [
    'https://media.istockphoto.com/id/1156520822/vector/photo-collage-frame-for-photos-pictures-parts-illustrations-mood-board-concept-template.jpg?s=612x612&w=0&k=20&c=iW74rQO28CozEoFYndU2LBtf5gTqssG5qnmQLelCxVc=',
    '/images/tested/temp2.jpg',
    '/images/tested/temp3.jpg',
    '/images/tested/temp1.jpg',
    'https://t4.ftcdn.net/jpg/09/62/19/17/360_F_962191716_RSfMqefQ9AbPpqCIqrUqTPKqTpaGbVXw.jpg',
    // 'https://img.avery.com/f_auto,q_auto,c_scale,w_300/web/templates/line-art/5168',
    // add more images if needed
];


// Select necessary elements
const carouselImages = document.querySelectorAll('.carousel-image');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const shownPicture = document.querySelector('.shown-picture');
const carousel = document.querySelector('.carousel');

let currentIndex = 0; // To keep track of the current position

function getImagesToShow() {
    // Return the number of images to display based on screen size
    return window.innerWidth <= 768 ? 2 : 3; // 2 images for smaller screens, 3 otherwise
}
function updateCarousel() {
    if (imageUrls.length === 1) {
        // Hide carousel if only 1 image
        carousel.style.display = 'none';
        shownPicture.src = imageUrls[0];
        return;
    } else {
        carousel.style.display = 'flex';
    }

    const imagesCount = Math.min(getImagesToShow(), imageUrls.length); // Adjust images to show
    const imagesToShow = [];

    for (let i = 0; i < imagesCount; i++) {
        imagesToShow.push(imageUrls[(currentIndex + i) % imageUrls.length]);
    }

    // Update the carousel images
    for (let i = 0; i < carouselImages.length; i++) {
        const img = carouselImages[i];
        if (imagesToShow[i]) {
            img.src = imagesToShow[i];
            img.style.display = 'block'; // Show valid slots
            img.classList.remove('chosen');
        } else {
            img.style.display = 'none'; // Hide unused slots
        }
    }

    // Set the first image as the "chosen" one
    carouselImages[0].classList.add('chosen');
    shownPicture.src = carouselImages[0].src;
}


// Listen for window resize events to update the carousel dynamically
window.addEventListener('resize', updateCarousel);


// Function to show the next image
function showNextImage() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateCarousel();
}

// Function to show the previous image
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateCarousel();
}

// Event listeners for arrow buttons
leftArrow.addEventListener('click', showPreviousImage);
rightArrow.addEventListener('click', showNextImage);

// Event listener for carousel images to update the main image
carouselImages.forEach((image) => {
    image.addEventListener('click', () => {
        // Find the index of the clicked image in the imageUrls array
        const clickedSrc = image.src.replace(window.location.origin, ''); // Get relative src
        const newIndex = imageUrls.indexOf(clickedSrc);

        if (newIndex !== -1) {
            currentIndex = newIndex; // Update the current index to the clicked image
            updateCarousel(); // Update the carousel display
        }
    });
});


// Initialize the carousel
updateCarousel();
