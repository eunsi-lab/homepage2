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
