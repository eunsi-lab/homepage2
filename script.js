// State Management
const states = ['mode-intro', 'mode-greeting', 'mode-main'];
let currentStateIndex = 0;

// Initialize
document.body.classList.add(states[0]);

// Function to advance state
function advanceState() {
    if (currentStateIndex < states.length - 1) {
        document.body.classList.remove(states[currentStateIndex]);
        currentStateIndex++;
        document.body.classList.add(states[currentStateIndex]);

        // Handle specific logic per state
        if (states[currentStateIndex] === 'mode-greeting') {
            const greetingOverlay = document.getElementById('greeting-overlay');
            greetingOverlay.classList.remove('hidden');
        }
    }
}

// Event Listeners
document.getElementById('intro-overlay').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent immediate bubbling if possible
    advanceState(); // Go to Greeting
});

document.getElementById('greeting-overlay').addEventListener('click', (e) => {
    advanceState(); // Go to Main
});


// Mouse Movement Effect (Parallax)
document.addEventListener('mousemove', (e) => {
    // Only apply parallax if not in intro mode (save resources)
    if (currentStateIndex === 0) return;

    // Apply strict parallax to container
    const container = document.querySelector('.background-container');
    const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
    const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;

    // Smooth interaction
    container.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

console.log("Antigravity Portfolio: Interactive Flow Initialized");

// --- IMAGE GALLERY LOGIC ---
let currentImages = [];
let currentImageIndex = 0;
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');

// Make functions global so HTML onclick can access them
window.openGallery = function (element) {
    // Parse single quotes correctly using a safer eval or JSON parse if formatted
    // But since we wrote it as a JS array string in HTML...
    // Let's rely on the data attribute string which is "['a', 'b']"
    const rawData = element.getAttribute('data-images');
    if (!rawData) return;

    // Simple parsing - replacing single quotes to double quotes for JSON.parse
    // Note: Use strict format in HTML or simple replace here
    try {
        const formatted = rawData.replace(/'/g, '"');
        currentImages = JSON.parse(formatted);
    } catch (e) {
        console.error("Error parsing image data", e);
        // Fallback for simple single file or comma separated
        currentImages = rawData.split(',').map(s => s.trim().replace(/['"\[\]]/g, ''));
    }

    if (currentImages.length > 0) {
        currentImageIndex = 0;
        showImage(0);
        modal.classList.add('show');
        modal.classList.remove('hidden');
    }
};

window.closeGallery = function () {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Wait for transition
};

window.nextImage = function () {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showImage(currentImageIndex);
};

window.prevImage = function () {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentImageIndex);
};

function showImage(index) {
    const imgPath = currentImages[index];
    modalImg.src = imgPath;
    console.log("Showing image:", imgPath);
}

// Close on outside click
window.onclick = function (event) {
    if (event.target == modal) {
        window.closeGallery();
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('show')) return;

    if (event.key === "Escape") {
        window.closeGallery();
    } else if (event.key === "ArrowRight") {
        window.nextImage();
    } else if (event.key === "ArrowLeft") {
        window.prevImage();
    }
});
