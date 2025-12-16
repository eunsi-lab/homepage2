// Initialize State
document.body.classList.add('intro-mode');

// Handle Click to Transition
document.getElementById('intro-overlay').addEventListener('click', () => {
    document.body.classList.remove('intro-mode');
    document.body.classList.add('main-mode');
});

// Mouse Movement Effect (Only active when main mode - handled by checking class or basic implementation)
document.addEventListener('mousemove', (e) => {
    // Only apply parallax if in main mode to avoid conflict with intro animation
    if (!document.body.classList.contains('main-mode')) return;

    const orbs = document.querySelectorAll('.orb');

    // Simplier parallax for main mode
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 2; // Slower speed for calm effect
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        // Note: This transform adds to the CSS animation transform, so we use marginTop/Left or specific transform
        // For simplicity and compatibility with the 'float' animation, we'll just lightly nudge
        // But since 'float' uses transform, setting style.transform here will overwrite it!
        // Better approach: wrap orbs or verify CSS structure. 
        // For now, let's skip JS parallax on orbs to keep the CSS float animation smooth, 
        // or apply it to the container. Let's apply it to the container.

        const container = document.querySelector('.background-container');
        const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
        const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;
        container.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

console.log("Antigravity Portfolio: Intro Mode Active");
