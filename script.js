// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    });
});

// Mobile Navigation Active State
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const sections = document.querySelectorAll('section, header');

function setActiveNavItem() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        if (href === current) {
            item.classList.add('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button Functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const originalText = ctaButton.innerHTML;
        ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> जल्द ही उपलब्ध होगा!';
        ctaButton.disabled = true;

        setTimeout(() => {
            ctaButton.innerHTML = originalText;
            ctaButton.disabled = false;
        }, 3000);
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    setActiveNavItem();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on load
    const animatedElements = document.querySelectorAll('.promise-card, .stat-card, .honesty-card');

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;

        observer.observe(element);
    });

    // Initialize active nav item
    setActiveNavItem();
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallaxElements = document.querySelectorAll('.floating-element');
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Form Submission Handling (if forms are added later)
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted:', formId);
        });
    }
}

// Initialize any forms
handleFormSubmission('contact-form');

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Debounced scroll event for performance
window.addEventListener('scroll', debounce(() => {
    // Performance-intensive scroll operations
}, 10));

// Typing Animation Functionality
function initTypingAnimation() {
    const names = [
        "मुकेश मिश्रा",
        "राजू मिश्रा",
        "प्रिंस टेंट हाउस"
    ];

    const typingText = document.getElementById('typingText');
    const currentItem = document.getElementById('currentItem');
    const dots = [
        document.getElementById('dot1'),
        document.getElementById('dot2'),
        document.getElementById('dot3')
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentName = names[currentIndex];

        // Update current item text
        if (currentItem) {
            currentItem.textContent = currentName;
        }

        // Update progress dots
        dots.forEach((dot, index) => {
            if (dot) {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        });

        if (!isDeleting && charIndex < currentName.length) {
            // Typing forward
            if (typingText) {
                typingText.innerHTML = currentName.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            }
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            if (typingText) {
                typingText.innerHTML = currentName.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            }
            charIndex--;
            setTimeout(type, typingSpeed / 2);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;

            if (!isDeleting) {
                // Move to next name
                currentIndex = (currentIndex + 1) % names.length;
            }

            // Add pause between operations
            setTimeout(type, isDeleting ? 1000 : 500);
        }
    }

    // Start typing animation if elements exist
    if (typingText && currentItem) {
        setTimeout(type, 1000);
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Your existing DOMContentLoaded code...

    // Initialize typing animation
    initTypingAnimation();

    // Rest of your existing code...
});