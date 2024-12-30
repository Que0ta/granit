let img = document.querySelector('.shown-picture');

// Create a container for the full-screen image and controls
const fullscreenContainer = document.createElement('div');
fullscreenContainer.classList.add('fullscreen-container');
fullscreenContainer.style.display = 'none';

// Create the full-screen image element
const fullscreenImg = document.createElement('img');
fullscreenImg.classList.add('fullscreen-image');

// Create zoom control buttons
const zoomInBtn = document.createElement('button');
zoomInBtn.textContent = '+';
zoomInBtn.classList.add('zoom-controls');

const zoomOutBtn = document.createElement('button');
zoomOutBtn.textContent = '-';
zoomOutBtn.classList.add('zoom-controls');

// Create a container for the zoom controls
const zoomControlsContainer = document.createElement('div');
zoomControlsContainer.classList.add('zoom-controls-container');

// Create the close button ("X")
const closeBtn = document.createElement('button');
closeBtn.textContent = 'X';
closeBtn.classList.add('close');

// Append buttons to the controls container
zoomControlsContainer.appendChild(zoomInBtn);
zoomControlsContainer.appendChild(zoomOutBtn);
zoomControlsContainer.appendChild(closeBtn);

// Append the full-screen image, zoom controls container, and close button to the fullscreen container
fullscreenContainer.appendChild(fullscreenImg);
fullscreenContainer.appendChild(zoomControlsContainer);

// Append the fullscreen container to the body (hidden by default)
document.body.appendChild(fullscreenContainer);

// Initial zoom level
let zoomLevel = 1;

// Add event listener for image click to show full screen
img.addEventListener('click', function() {
  fullscreenImg.src = img.src;  // Set the full-screen image source to the clicked image source
  fullscreenContainer.style.display = 'flex';  // Show the full-screen image
  zoomLevel = 1; // Reset zoom when opening
  fullscreenImg.style.transform = `scale(${zoomLevel})`; // Apply zoom level
});

// Add event listener to close the full-screen image when clicked
fullscreenImg.addEventListener('click', function() {
  fullscreenContainer.style.display = 'none';  // Hide the full-screen image
  zoomLevel = 1; // Reset zoom when closing
  fullscreenImg.style.transform = `scale(${zoomLevel})`; // Apply zoom reset
});

// Add zoom in functionality
zoomInBtn.addEventListener('click', function() {
  if (zoomLevel < 3) {  // Limit zoom-in level
    zoomLevel += 0.2;  // Increase zoom level
    fullscreenImg.style.transform = `scale(${zoomLevel})`;  // Apply zoom level
  }
});

// Add zoom out functionality
zoomOutBtn.addEventListener('click', function() {
  if (zoomLevel > 1) {  // Limit zoom-out level
    zoomLevel -= 0.2;  // Decrease zoom level
    fullscreenImg.style.transform = `scale(${zoomLevel})`;  // Apply zoom level
  }
});

// // Add event listener for the close button to hide the fullscreen container
closeBtn.addEventListener('click', function() {
  fullscreenContainer.style.display = 'none';  // Hide the fullscreen container
  zoomLevel = 1; // Reset zoom when closing
  fullscreenImg.style.transform = `scale(${zoomLevel})`; // Apply zoom reset
});
