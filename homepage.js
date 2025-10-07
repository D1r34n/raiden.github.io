// ==== Parallax background (unchanged) ====
let currentX = 50, currentY = 50;
let targetX = 50, targetY = 50;
let ticking = false;

document.addEventListener("mousemove", (e) => {
  targetX = 50 - (e.clientX / window.innerWidth) * 50;
  targetY = 50 - (e.clientY / window.innerHeight) * 50;

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

function updateParallax() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  document.body.style.backgroundPosition = `${currentX}% ${currentY}%`;

  if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
    window.requestAnimationFrame(updateParallax);
  } else {
    ticking = false;
  }
}

// ==== Typewriter effect ====
const devTitle = document.getElementById("typewriter");
const text = "software developer";

if (devTitle){
  let index = 0, forward = true;

  function typeWriter() {
    if (forward) {
      devTitle.textContent = text.slice(0, index + 1);
      index++;
      if (index === text.length) {
        forward = false;
        setTimeout(typeWriter, 3000);
        return;
      }
    } else {
      devTitle.textContent = text.slice(0, index);
      index--;
      if (index < 0) {
        forward = true;
        setTimeout(typeWriter, 500);
        return;
      }
    }
    setTimeout(typeWriter, 150);
  }
  typeWriter();
}

// ==== tsParticles ====

//Dust Background Homepage
if (document.getElementById("dustParticlesBackground")) {
  tsParticles.load("dustParticlesBackground", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
      number: { value: 80, density: { enable: true, area: 900 } },
      color: { value: "#e3e3e3" },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: { enable: true, minimumValue: 0.2 } },
      size: { value: 2, random: { enable: true, minimumValue: 1 } },
      move: {
        enable: true,
        speed: 0.15,
        direction: "bottom",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
        rotate: { value: 20, direction: "clockwise", animation: { enable: true, speed: 3 } }
      }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false }, resize: true },
      modes: { repulse: { distance: 120, duration: 0.6, speed: 0.15 } }
    },
    detectRetina: true
  });
}

//Parallax Particle Projects
if (document.getElementById("parallaxLinkBackground")) {
  tsParticles.load("parallaxLinkBackground", {
      fpsLimit: 60,
       background: { color: "transparent" },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "parallax",
            parallax: {
              enable: true,
              force: 60,
              smooth: 10
            }
          },
          resize: true
        },
        modes: {
          parallax: {
            force: 60,
            smooth: 10
          }
        }
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: "#e3e3e3"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: {
            enable: true,
            minimumValue: 0.1
          }
        },
        size: {
          value: {
            min: 1,
            max: 3
          }
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          outModes: {
            default: "out"
          }
        },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        }
      },
      detectRetina: true
    });
}

// ==== Navbar & submenu behavior ====
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const blurOverlay = document.querySelector(".blur-overlay");
  const aboutButton = document.getElementById("about-me-btn");
  const aboutSubmenu = document.getElementById("about-me-submenu");
  const submenuLinks = document.querySelectorAll(".submenu-text, .menu-text:not(#about-me-btn)");

  // Ensure menu is closed on page load
  navbarToggler.classList.remove("open");
  blurOverlay.classList.remove("active");
  aboutSubmenu.classList.remove("active");

  // Toggle main menu overlay
  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("open");
    blurOverlay.classList.toggle("active");

    // Close About Me submenu when menu closes
    if (!navbarToggler.classList.contains("open")) {
      aboutSubmenu.classList.remove("active");
    }
  });

  // Toggle About Me submenu
  aboutButton.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent click from bubbling to document or other listeners
    aboutSubmenu.classList.toggle("active");
  });

  // Close menu when any link or submenu item is clicked (excluding About Me parent)
  submenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbarToggler.classList.remove("open");
      blurOverlay.classList.remove("active");
      aboutSubmenu.classList.remove("active");
    });
  });
});

window.addEventListener("scroll", () => {
  const schoolParagraph = document.querySelector(".school-paragraph");
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight * 0.8) {
    schoolParagraph.classList.add("visible");
  } else {
    schoolParagraph.classList.remove("visible");
  }
});

window.addEventListener("scroll", () => {
  const mockupRows = document.querySelectorAll(".mockup-row");
  const triggerBottom = window.innerHeight * 0.85;
  const triggerTop = window.innerHeight * 0.15;

  mockupRows.forEach((row) => {
    const rect = row.getBoundingClientRect();
    
    if (rect.top < triggerBottom && rect.bottom > triggerTop) {
      row.classList.add("visible");
    } else {
      row.classList.remove("visible");
    }
  });
});

// Scroll-controlled orbit rotation with continuous auto-orbit
(function() {
  const orbit = document.querySelector('.orbit-container');
  if (!orbit) return;

  const numImages = 3;
  const rotationPerImage = 360 / numImages;
  const autoRotateSpeed = 0.05; // Adjust for slower/faster auto-rotation
  
  let currentRotation = 0;
  let targetRotation = 0;
  let isUserControlled = false;
  let isSnapping = false;
  let scrollTimeout;
  let rafId;
  let isInitialized = false;

  // Remove CSS animation and take manual control
  function initialize() {
    if (!isInitialized) {
      orbit.style.animation = 'none';
      isInitialized = true;
    }
  }

  // Smooth animation loop with auto-rotation
  function animate() {
    initialize();

    // If not user controlled, continuously rotate
    if (!isUserControlled && !isSnapping) {
      targetRotation += autoRotateSpeed;
      currentRotation = targetRotation;
    } else {
      // Ease towards target rotation when user is controlling or snapping
      const diff = targetRotation - currentRotation;
      const easingSpeed = isSnapping ? 0.08 : 0.1;
      currentRotation += diff * easingSpeed;
      
      // Check if snap is complete
      if (isSnapping && Math.abs(diff) < 0.1) {
        isSnapping = false;
        isUserControlled = false;
      }
    }

    // Apply rotation while preserving the translate
    orbit.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;

    // Continue animation
    rafId = requestAnimationFrame(animate);
  }

  // Start animation loop
  animate();

  // Handle scroll
  window.addEventListener('scroll', () => {
    isUserControlled = true;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    // Calculate rotation based on scroll
    const totalRotation = scrollPercent * 360 * 3;
    targetRotation = totalRotation;

    clearTimeout(scrollTimeout);
    
    // Auto-snap and resume after scroll stops
    scrollTimeout = setTimeout(() => {
      // Snap to nearest image position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  });

  // Mouse wheel control
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    isUserControlled = true;

    const delta = e.deltaY * 0.3;
    targetRotation = currentRotation + delta;

    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      // Snap to nearest position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  }, { passive: false });

  // Touch support
  let touchStartY = 0;
  let touchStartRotation = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartRotation = currentRotation;
    isUserControlled = true;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const delta = (touchStartY - touchEndY) * 0.5;
    targetRotation = touchStartRotation + delta;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      // Snap to nearest position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  }, { passive: true });
})();

const heroText = document.querySelector('.hero-text');
const orbitImages = document.querySelectorAll('.orbit-image');

let currentText = 'SKILLS';
let targetText = currentText;
let opacity = 1;
let fading = false;

// Smooth fade function
function fadeText(newText) {
  targetText = newText;
  if (fading) return; // prevent multiple calls
  fading = true;

  function animate() {
    // Fade out
    if (opacity > 0 && heroText.textContent !== targetText) {
      opacity -= 0.05; // speed of fade
      if (opacity < 0) opacity = 0;
      heroText.style.opacity = opacity;
      requestAnimationFrame(animate);
    } else {
      // Switch text when fully faded out
      heroText.textContent = targetText;

      function fadeIn() {
        opacity += 0.05;
        if (opacity > 1) opacity = 1;
        heroText.style.opacity = opacity;
        if (opacity < 1) requestAnimationFrame(fadeIn);
        else fading = false; // done
      }
      fadeIn();
    }
  }
  animate();
}

orbitImages.forEach(img => {
  img.addEventListener('mouseenter', () => fadeText(img.alt));
  img.addEventListener('mouseleave', () => fadeText('SKILLS'));
});




