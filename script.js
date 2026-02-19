/* ============================================
   IMPROVED SCRIPT.JS - FIXED & OPTIMIZED
   ============================================ */

// Initialize when page loads
window.addEventListener('load', () => {
    // Hide splash screen after 2 seconds (reduced from 5)
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
    }, 2000);

    // Start carousel
    startCarousel();
    
    // Initialize mobile menu
    initMobileMenu();
});

/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================
   CAROUSEL FUNCTIONALITY
   ============================================ */

let slideIndex = 0;
let slideTimer;

function startCarousel() {
    showSlides();
    // Auto-change slide every 2 seconds
    slideTimer = setInterval(showSlides, 2000);
}

function showSlides() {
    const slides = document.getElementsByClassName('carousel-slide');
    const indicators = document.getElementsByClassName('indicator');

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade');
    }

    // Remove active class from all indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }

    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Show current slide
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('fade');
    }

    // Update indicator
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    // Clear auto-play timer
    clearInterval(slideTimer);
    
    // Calculate new slide index
    slideIndex += n;
    
    const slides = document.getElementsByClassName('carousel-slide');
    
    // Wrap around
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    updateCarouselDisplay();
    
    // Restart auto-play
    slideTimer = setInterval(showSlides, 2000);
}

function currentSlide(n) {
    // Clear auto-play timer
    clearInterval(slideTimer);
    
    slideIndex = n;
    updateCarouselDisplay();
    
    // Restart auto-play
    slideTimer = setInterval(showSlides, 2000);
}

function updateCarouselDisplay() {
    const slides = document.getElementsByClassName('carousel-slide');
    const indicators = document.getElementsByClassName('indicator');

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade');
    }

    // Remove active class from all indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }

    // Show current slide
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('fade');
    }

    // Update indicator
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */

function openContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

function openBookingForm() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeBookingForm() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const contactModal = document.getElementById('contactModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (event.target === contactModal) {
        closeContactForm();
    }
    if (event.target === bookingModal) {
        closeBookingForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactForm();
        closeBookingForm();
    }
});

/* ============================================
   FORM SUBMISSION HANDLING
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Validate required fields
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff0066';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message (in real implementation, send to server)
                alert('Thank you! Your message has been received. We will get back to you soon.');
                form.reset();
                
                // Close modal
                if (form.closest('#contactModal')) {
                    closeContactForm();
                }
                if (form.closest('#bookingModal')) {
                    closeBookingForm();
                }
            }
        });
    });
});

/* ============================================
   AUDIO ELEMENT HANDLING
   ============================================ */

const audioElement = document.getElementById('splash-audio');
if (audioElement) {
    audioElement.addEventListener('loadedmetadata', () => {
        // Start audio at 25 seconds (for demo purposes)
        audioElement.currentTime = 25;
    });

    // Handle audio errors gracefully
    audioElement.addEventListener('error', () => {
        console.log('Audio file could not be loaded');
    });
}

/* ============================================
   SMOOTH SCROLL SUPPORT CHECK
   ============================================ */

// Check if browser supports smooth scrolling
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // Fallback for browsers that don't support smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Adjust carousel if needed
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        console.log('Window resized - carousel responsive');
    }
}, 250);

window.addEventListener('resize', handleResize);

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    // Check which section is in view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('class');
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === current.toLowerCase()) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Add keyboard navigation for buttons
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (event.target.classList.contains('btn')) {
            event.target.click();
        }
    }
});

// Add focus visible styling
document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains('btn') || 
        event.target.classList.contains('nav-link') ||
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA') {
        event.target.style.outline = '2px solid #00c6ff';
        event.target.style.outlineOffset = '2px';
    }
});
document.addEventListener("click", () => {
    const audio = document.getElementById("splash-audio");
    audio.play();
});
document.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('btn') || 
        event.target.classList.contains('nav-link') ||
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA') {
        event.target.style.outline = '';
        event.target.style.outlineOffset = '';
    }
});
 document.getElementById('pp').addEventListener('click', function () {
      alert('Privacy policy.');
    });
 document.getElementById('tos').addEventListener('click', function () {
      alert('Terms of service');
    });

console.log('Improved script loaded successfully!');