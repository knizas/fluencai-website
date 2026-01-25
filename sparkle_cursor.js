
(function () {
    // 1. Set Custom Cursor Image (Sparkle/Star)
    // We use a data URI for a simple 32x32 Star SVG. 
    // Fill is set to #161618 (Brand Black) with a white stroke for visibility on dark backgrounds.
    const cursorSvg = encodeURIComponent(`
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.9 8.6L24 12L14.9 15.4L12 24L9.1 15.4L0 12L9.1 8.6L12 0Z" fill="#161618" stroke="#ffffff" stroke-width="1.5"/>
    </svg>
  `.trim());

    const style = document.createElement('style');
    style.innerHTML = `
    body, a, button, input, textarea, select {
      cursor: url('data:image/svg+xml;utf8,${cursorSvg}') 16 16, auto !important;
    }
    /* Hide default cursor to ensure strictly our sparkle takes over? 
       Actually 'cursor: url..., auto' is safer. */
  `;
    document.head.appendChild(style);


    // 2. Fairy Dust / Sparkle Trail Effect
    // Using a canvas overlay or DOM elements. DOM elements are easier for "floating away" effects without managing canvas resize/clearing complex logic.

    const possibleColors = ["#FFD700", "#FFEC8B", "#FFFFFF", "#161618"]; // Gold, Light Gold, White, Black
    let particles = [];

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = '0';
        p.style.top = '0';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '999999';
        p.style.width = (Math.random() * 8 + 4) + 'px'; // 4 to 12px
        p.style.height = p.style.width;
        p.style.background = 'url("data:image/svg+xml;utf8,' + encodeURIComponent('<svg viewBox="0 0 24 24" fill="' + possibleColors[Math.floor(Math.random() * possibleColors.length)] + '" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>') + '") center/contain no-repeat';

        // Initial position
        p.style.transform = `translate(${x}px, ${y}px)`;

        document.body.appendChild(p);

        // Physics properties
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 + 1;

        particles.push({
            element: p,
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1.0,
            decay: Math.random() * 0.03 + 0.02
        });
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;

            p.element.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.life})`;
            p.element.style.opacity = p.life;

            if (p.life <= 0) {
                p.element.remove();
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(updateParticles);
    }

    // Start loop
    requestAnimationFrame(updateParticles);

    // Mouse Move Event
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousemove', (e) => {
        // Only create particles if mouse moved enough distance to avoid clustering
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > 10) {
            createParticle(e.clientX, e.clientY); // Create a sparkle
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Scroll Event - User specifically requested "when scrolling"
    // We can add sparkles at the mouse position relative to viewport when scrolling
    let isScrolling;
    document.addEventListener('scroll', (e) => {
        // During scroll, the mouse stays fixed relative to screen (mostly), 
        // but the content moves. The user might want sparkles *because* of the scroll?
        // Let's just emit some sparkles at the last known mouse position to verify "activity".
        // Or maybe random sparkles on the screen?
        // "replace my mouse icon ... when scrolling". 
        // This implies the specific interaction of scrolling triggers the visual.
        // I will add a few sparkles at random positions near the mouse or cursor during scroll.

        if (lastX && lastY) {
            if (Math.random() > 0.5) { // Throttled
                createParticle(lastX + (Math.random() - 0.5) * 20, lastY + (Math.random() - 0.5) * 20);
            }
        }
    });

})();
