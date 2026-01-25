
(function () {
    // 1. Set Custom Cursor Image (Sparkle/Star)
    // We use a data URI for a simple 32x32 Star SVG. 
    // Fill is set to #161618 (Brand Black) with a white stroke for visibility on dark backgrounds.
    // Updated path to be "sleeker" (thinner arms).
    const cursorSvg = encodeURIComponent(`
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#161618" stroke="#ffffff" stroke-width="1.5"/>
    </svg>
  `.trim());

    const style = document.createElement('style');
    style.innerHTML = `
    body, a, button, input, textarea, select {
      cursor: url('data:image/svg+xml;utf8,${cursorSvg}') 16 16, auto !important;
    }
  `;
    document.head.appendChild(style);


    // 2. Fairy Dust / Sparkle Trail Effect

    // Updated colors to be a bit more vibrant/elegant
    const possibleColors = ["#FFD700", "#FFEC8B", "#FFFFFF", "#161618"];
    let particles = [];

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = '0';
        p.style.top = '0';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '999999';

        // Increased size: 10px to 25px
        p.style.width = (Math.random() * 15 + 10) + 'px';
        p.style.height = p.style.width;

        // Sleeker star shape for particles too
        const particleSvg = Object.assign(document.createElementNS("http://www.w3.org/2000/svg", "svg"), {
            viewBox: "0 0 24 24",
        });

        p.style.background = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(`
        <svg viewBox="0 0 24 24" fill="${possibleColors[Math.floor(Math.random() * possibleColors.length)]}" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/>
        </svg>
        `.trim()) + '") center/contain no-repeat';

        // Initial position
        p.style.transform = `translate(${x}px, ${y}px)`;

        document.body.appendChild(p);

        // Physics properties
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 + 1;
        const rotationSpeed = Math.random() * 10 - 5; // Rotation speed

        particles.push({
            element: p,
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.015, // Slightly slower decay for longer trails
            rotation: 0,
            rotationSpeed: rotationSpeed
        });
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;
            p.rotation += p.rotationSpeed;

            p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.life})`;
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
        // Only create particles if mouse moved enough distance
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > 5) { // Increased sensitivity slightly (was 10)
            createParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Scroll Event
    document.addEventListener('scroll', (e) => {
        if (lastX && lastY) {
            if (Math.random() > 0.3) { // More frequent sparkles on scroll
                createParticle(lastX + (Math.random() - 0.5) * 40, lastY + (Math.random() - 0.5) * 40);
            }
        }
    });

})();
