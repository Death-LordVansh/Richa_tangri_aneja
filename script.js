
document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZE EMAILJS
    // Replace 'YOUR_PUBLIC_KEY' with the key from your EmailJS Account tab
    emailjs.init('YOUR_PUBLIC_KEY'); 

    // 2. SPLASH SCREEN LOGIC (Fast & Elegant)
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 800);
        }, 1500); // 1.5s is the professional sweet spot
    }

    // 3. AUDIO HANDLING (The Professional "First-Click" Trigger)
    // Browsers block auto-play. This waits for the first user interaction.
    const audio = document.getElementById('splash-audio');
    if (audio) {
        const playAudio = () => {
            audio.play().catch(err => console.log("Audio playback blocked"));
            document.removeEventListener('click', playAudio);
        };
        document.addEventListener('click', playAudio);
    }

    // 4. MOBILE MENU
    initMobileMenu();

    // 5. CAROUSEL
    startCarousel();

    // 6. FORM HANDLING (Direct to kapil955@gmail.com)
    initForms();
});

/* ============================================
   FORM SUBMISSION (EmailJS Logic)
   ============================================ */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // Visual feedback
            submitBtn.innerText = "Sending to Kapil...";
            submitBtn.disabled = true;

            // These MUST match your EmailJS Dashboard
            const serviceID = 'YOUR_SERVICE_ID'; 
            const templateID = 'YOUR_TEMPLATE_ID';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Message successfully sent to kapil955@gmail.com!');
                    this.reset();
                    closeContactForm();
                    closeBookingForm();
                })
                .catch((err) => {
                    console.error('Email Error:', err);
                    alert('Failed to send. Please check your EmailJS keys.');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    });
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ============================================
   CAROUSEL LOGIC (4s Interval for Readability)
   ============================================ */
let slideIndex = 0;
let slideTimer;

function startCarousel() {
    showSlides();
    slideTimer = setInterval(showSlides, 4000); 
}

function showSlides() {
    const slides = document.getElementsByClassName('carousel-slide');
    const indicators = document.getElementsByClassName('indicator');

    if (!slides.length) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade');
        if (indicators[i]) indicators[i].classList.remove('active');
    }

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].classList.add('fade');
    if (indicators[slideIndex - 1]) indicators[slideIndex - 1].classList.add('active');
}

/* ============================================
   MODAL CONTROL
   ============================================ */
function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openBookingForm() {
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingForm() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
        closeContactForm();
        closeBookingForm();
    }
});

/* ============================================
   LEGAL PLACEHOLDERS (Replace Alerts later)
   ============================================ */
const pp = document.getElementById('pp');
const tos = document.getElementById('tos');

if (pp) pp.addEventListener('click', () => alert('Privacy Policy coming soon.'));
if (tos) tos.addEventListener('click', () => alert('Terms of Service coming soon.'));