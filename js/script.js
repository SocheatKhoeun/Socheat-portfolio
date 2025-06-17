// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars when they come into view
      if (entry.target.querySelector(".skill-progress")) {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
      }
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".animate-float");
  if (parallax) {
    const speed = scrolled * 0.3;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add typing effect to main heading
const mainHeading = document.querySelector("h1");
if (mainHeading) {
  const text = mainHeading.textContent;
  mainHeading.textContent = "";
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      mainHeading.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  setTimeout(typeWriter, 1000);
}

// Add mouse move parallax effect
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".hover-lift");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = (rect.left + rect.width / 2) / window.innerWidth;
    const cardY = (rect.top + rect.height / 2) / window.innerHeight;

    const deltaX = (x - cardX) * 10;
    const deltaY = (y - cardY) * 10;

    card.style.transform = `perspective(1000px) rotateX(${deltaY}deg) rotateY(${deltaX}deg) translateZ(0)`;
  });
});

// Reset card transforms when mouse leaves
document.addEventListener("mouseleave", () => {
  const cards = document.querySelectorAll(".hover-lift");
  cards.forEach((card) => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
});

// Add click ripple effect to buttons
document.querySelectorAll("button, .button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Mobile menu toggle (if needed)
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Add scroll progress indicator
const scrollProgress = document.createElement("div");
scrollProgress.className =
  "fixed top-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-600 to-orange-700 z-50 transition-all duration-300";
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// Add dynamic text color based on scroll position
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(20px)";
  } else {
    header.classList.remove("scrolled");
    header.style.background = "rgba(255, 255, 255, 0.9)";
    header.style.backdropFilter = "blur(10px)";
  }
});

// Add particle effect to background
const createParticle = () => {
  const particle = document.createElement("div");
  particle.className =
    "fixed w-1 h-1 bg-orange-400 rounded-full opacity-30 pointer-events-none z-0";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = "100vh";
  particle.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 5000);
};

// Create particles periodically
setInterval(createParticle, 2000);

// Add CSS for ripple effect
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .loaded {
          opacity: 1;
        }
        
        body {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        
        body.loaded {
          opacity: 1;
        }
      `;
document.head.appendChild(rippleStyles);

// Add smooth reveal animation for elements
const revealElements = () => {
  const elements = document.querySelectorAll(
    ".animate-on-scroll:not(.visible)"
  );
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealElements);
revealElements(); // Check on initial load

// Add performance optimization
let ticking = false;
const requestTick = (callback) => {
  if (!ticking) {
    requestAnimationFrame(callback);
    ticking = true;
  }
};

// Optimize scroll events
window.addEventListener("scroll", () => {
  requestTick(() => {
    ticking = false;
    // Scroll-based animations here
  });
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value;
  if (email) {
    alert(`Thanks for contacting me, ${email}!`);
  } else {
    alert("Please enter a valid email.");
  }
});