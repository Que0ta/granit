// Image array (you can replace this with actual URLs)
const imageUrls = [
    'https://media.istockphoto.com/id/1156520822/vector/photo-collage-frame-for-photos-pictures-parts-illustrations-mood-board-concept-template.jpg?s=612x612&w=0&k=20&c=iW74rQO28CozEoFYndU2LBtf5gTqssG5qnmQLelCxVc=',
    '/images/tested/temp2.jpg',
    '/images/tested/temp3.jpg',
    '/images/tested/temp1.jpg',
    'https://t4.ftcdn.net/jpg/09/62/19/17/360_F_962191716_RSfMqefQ9AbPpqCIqrUqTPKqTpaGbVXw.jpg',
    'https://img.avery.com/f_auto,q_auto,c_scale,w_300/web/templates/line-art/5168',
    // add more images if needed
];

// Select necessary elements
const carouselImages = document.querySelectorAll('.carousel-image');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const shownPicture = document.querySelector('.shown-picture'); // The image to display the chosen picture

let currentIndex = 0; // To keep track of the currently shown images

// Function to update the images in the carousel
function updateCarousel() {
    // Ensure that we display the next 3 images in sequence, wrapping around if necessary
    const imagesToShow = [
        imageUrls[(currentIndex + 0) % imageUrls.length],
        imageUrls[(currentIndex + 1) % imageUrls.length],
        imageUrls[(currentIndex + 2) % imageUrls.length]
    ];
    
    // Update the image sources in the carousel
    for (let i = 0; i < 3; i++) {
        const img = carouselImages[i];
        img.src = imagesToShow[i]; // Set the corresponding image
        img.classList.remove('chosen'); // Remove the 'chosen' class from all images
    }

    // Set the first image as the "chosen" one
    carouselImages[0].classList.add('chosen');

    // Update the shown picture to be the image with the "chosen" class
    const chosenImage = document.querySelector('.chosen');
    shownPicture.src = chosenImage.src;
}

// Function to handle showing the next image in the carousel
function showNextImage() {
    // Move to the next image in the list, and wrap around if necessary
    currentIndex = (currentIndex + 1) % imageUrls.length; // Use modulo to wrap around when reaching the end
    console.log(currentIndex);
    updateCarousel();
}

// Function to handle showing the previous image in the carousel
function showPreviousImage() {
    // Move to the previous image in the list, and wrap back to the last image if at the start
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length; // Use modulo to wrap around when reaching the beginning
    updateCarousel();
}

// Event listeners for arrow buttons
rightArrow.addEventListener('click', showNextImage);
leftArrow.addEventListener('click', showPreviousImage);

// Event listener for carousel images to show the clicked image at the front
carouselImages.forEach((image, index) => {
    image.addEventListener('click', function () {
        // Update the currentIndex based on the clicked image
        let source = image.src;
        const relativeSrc = source.replace(window.location.origin, '');
        let choosenElement = imageUrls.indexOf(relativeSrc);

        currentIndex = choosenElement;
        updateCarousel();
    });
});

// Initialize the carousel
updateCarousel();
