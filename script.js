/* ============================================
   LUXURY HERO SECTION EFFECTS
   ============================================ */

// Simplified hero animation - no complex particle system needed
// The CSS handles all the animations for better performance

// Subtle parallax on hero background image
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const bgImage = document.querySelector('.hero-bg-image');
    
    if (hero && bgImage) {
        const scrollProgress = Math.min(window.scrollY / hero.offsetHeight, 1);
        bgImage.style.backgroundPosition = `center calc(50% + ${window.scrollY * 0.3}px)`;
    }
});

// Optional: Add hover effect to hero content for dynamic lighting
const heroContent = document.querySelector('.hero-content');
if (heroContent && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        const glow = document.querySelector('.hero-light-glow');
        if (glow && e.clientY < window.innerHeight / 2) {
            const x = e.clientX;
            const y = e.clientY;
            glow.style.left = (x - 400) + 'px';
            glow.style.top = (y - 400) + 'px';
        }
    });
}

/* ============================================
   SMOOTH SCROLLING & NAVIGATION
   ============================================ */

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need scroll animation
document.querySelectorAll('.dish-card, .testimonial-card, .gallery-item, .section-header').forEach(element => {
    observer.observe(element);
});

/* ============================================
   FORM HANDLING
   ============================================ */

const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelectorAll('input[type="date"]')[0].value;
        const time = this.querySelector('input[type="time"]').value;
        const guests = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%);
            color: #000;
            padding: 40px 60px;
            border-radius: 15px;
            font-size: 1.3rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(212, 175, 55, 0.4);
            text-align: center;
            max-width: 90%;
        `;
        successMessage.innerHTML = `
            <div style="margin-bottom: 10px;">✓ Reservation Confirmed!</div>
            <div style="font-size: 0.9rem; margin-bottom: 20px;">We'll contact you shortly at ${phone}</div>
            <button onclick="this.parentElement.remove()" style="
                background: #0a0a0a;
                color: #d4af37;
                border: 2px solid #d4af37;
                padding: 10px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#d4af37'; this.style.color='#000';" onmouseout="this.style.background='#0a0a0a'; this.style.color='#d4af37';">
                Close
            </button>
        `;
        
        document.body.appendChild(successMessage);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (successMessage.parentElement) {
                successMessage.remove();
            }
        }, 5000);
        
        // Reset form
        this.reset();
    });
}

/* ============================================
   DYNAMIC IMAGE LOADING
   ============================================ */

// Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/* ============================================
   NAVBAR SCROLL EFFECTS
   ============================================ */

let lastScrollY = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    // Add subtle background change on scroll
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(212, 175, 55, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.7)';
        header.style.boxShadow = 'none';
    }
});

/* ============================================
   PARALLAX EFFECT (HERO SECTION)
   ============================================ */

const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

/* ============================================
   COUNTER ANIMATION (STATS)
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

/* ============================================
   NEWSLETTER SUBSCRIPTION
   ============================================ */

const newsletter = document.querySelector('.newsletter');
if (newsletter) {
    const newsInput = newsletter.querySelector('input');
    const newsButton = newsletter.querySelector('button');
    
    if (newsButton) {
        newsButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsInput.value;
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success
            const originalText = newsButton.textContent;
            newsButton.textContent = '✓ Subscribed!';
            newsButton.style.background = '#d4af37';
            newsInput.value = '';
            
            setTimeout(() => {
                newsButton.textContent = originalText;
                newsButton.style.background = '';
            }, 2000);
        });
    }
}

/* ============================================
   DISH CARD INTERACTIVE EFFECTS
   ============================================ */

const dishCards = document.querySelectorAll('.dish-card');
dishCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 25px 70px rgba(212, 175, 55, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)';
    });
});

/* ============================================
   TESTIMONIAL CAROUSEL (OPTIONAL)
   ============================================ */

const testimonials = document.querySelectorAll('.testimonial-card');
if (testimonials.length > 0) {
    // Add auto-rotation effect
    testimonials.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

/* ============================================
   GALLERY LIGHTBOX (SIMPLE)
   ============================================ */

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const imgLarge = document.createElement('img');
        imgLarge.src = img.src;
        imgLarge.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 30px;
            right: 30px;
            background: #d4af37;
            color: #000;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 700;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = '#ffd700';
            this.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = '#d4af37';
            this.style.transform = 'scale(1)';
        });
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightbox.remove();
        });
        
        lightbox.appendChild(imgLarge);
        lightbox.appendChild(closeBtn);
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
        
        document.body.appendChild(lightbox);
    });
});

/* ============================================
   MOBILE MENU TOGGLE (FUTURE ENHANCEMENT)
   ============================================ */

// Add mobile menu functionality if needed
const nav = document.querySelector('nav');
if (window.innerWidth <= 768 && nav) {
    // Mobile-specific adjustments
    nav.style.display = 'flex';
    nav.style.flexDirection = 'row';
    nav.style.gap = '15px';
}

/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

// Debounce function for scroll events
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

// Optimize resize listener
window.addEventListener('resize', debounce(() => {
    // Handle resize events
}, 250));

/* ============================================
   INITIALIZE ON PAGE LOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ The Food Story website loaded successfully');
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const animateElements = document.querySelectorAll('[class*="card"], [class*="section"]');
    animateElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.05}s`;
    });
});

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Improve keyboard navigation
document.addEventListener('keydown', function(e) {
    // Skip to main content on Tab+Enter
    if (e.key === 'Enter' && e.ctrlKey) {
        const mainContent = document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
        }
    }
    
    // Close modals on Escape
    if (e.key === 'Escape') {
        const lightboxes = document.querySelectorAll('[style*="position: fixed"]');
        lightboxes.forEach(box => {
            if (box.style.background && box.style.background.includes('rgba(0, 0, 0')) {
                box.remove();
            }
        });
    }
});

/* ============================================
   CUSTOM SCROLLBAR STYLING (CSS)
   ============================================ */

// Create style tag for scrollbar
const scrollbarStyle = document.createElement('style');
scrollbarStyle.innerHTML = `
    ::-webkit-scrollbar {
        width: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: #0a0a0a;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #d4af37 0%, #ffd700 50%, #d4af37 100%);
        border-radius: 6px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ffd700 0%, #e6c200 50%, #ffd700 100%);
    }
`;
document.head.appendChild(scrollbarStyle);

/* ============================================
   ANALYTICS & TRACKING (OPTIONAL)
   ============================================ */

function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Add your analytics tracking code here
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('button_click', { text: this.textContent });
    });
});

// Track section views
window.addEventListener('scroll', debounce(() => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            trackEvent('section_view', { section: section.id });
        }
    });
}, 500));
