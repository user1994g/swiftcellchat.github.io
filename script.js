// ========================================
// Navigation Scroll Effect
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar scroll effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for hero elements
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(currentScroll * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(currentScroll * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });

    lastScroll = currentScroll;
});

// ========================================
// Mobile Menu Toggle
// ========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            } else {
                // Add staggered delay for elements in the same container
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
            
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animation
const animatedElements = document.querySelectorAll('.feature-card, .showcase-item, .testimonial-card, .hero-stats');
animatedElements.forEach(el => observer.observe(el));

// ========================================
// Counter Animation for Stats
// ========================================

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasStar = text.includes('★');
    
    let target;
    let suffix = '';
    
    if (hasPlus) {
        target = parseFloat(text.replace(/[^0-9.]/g, ''));
        suffix = hasStar ? '★' : (text.includes('M') ? 'M+' : (text.includes('K') ? 'K+' : '+'));
    } else if (hasStar) {
        target = parseFloat(text.replace(/[^0-9.]/g, ''));
        suffix = '★';
    } else {
        target = parseFloat(text.replace(/[^0-9.]/g, ''));
        suffix = text.replace(/[0-9.]/g, '');
    }
    
    let start = 0;
    const increment = target / (2000 / 16);
    const decimals = target % 1 !== 0 ? 1 : 0;
    
    const updateCounter = () => {
        start += increment;
        
        if (start < target) {
            element.textContent = start.toFixed(decimals) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toFixed(decimals) + suffix;
        }
    };
    
    updateCounter();
}



// ========================================
// Parallax Effect for Hero Elements
// ========================================



// ========================================
// Mouse Move Effect for Phone
// ========================================

const phoneContainer = document.querySelector('.phone-container');

if (phoneContainer) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        phoneContainer.style.transform = `perspective(1000px) rotateY(${xPos}deg) rotateX(${-yPos}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        phoneContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
}

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    if (heroVisual) {
        heroVisual.style.opacity = '1';
    }
});

// ========================================
// Performance Optimization: Debounce
// ========================================

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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Any scroll-heavy operations go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// Lazy Loading for Images
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Accessibility: Focus Management
// ========================================

// Add visible focus indicators for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// Feature Cards Hover Effect Enhancement
// ========================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%cConnect Mutual', 'font-size: 40px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cWelcome to social connection reimagined!', 'font-size: 16px; color: #667eea;');
console.log('%c🚀 Launch the app at connect-mutual.lovable.app', 'font-size: 14px; color: #b4b4c8;');

// ========================================
// Analytics Placeholder
// ========================================

// Track page views
function trackPageView() {
    // Add your analytics code here (Google Analytics, etc.)
    console.log('Page view tracked');
}

// Track button clicks
function trackButtonClick(buttonName) {
    // Add your analytics code here
    console.log(`Button clicked: ${buttonName}`);
}

// Add click tracking to CTA buttons
document.querySelectorAll('.btn-primary, .app-launch-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackButtonClick(buttonText);
    });
});

// Track page view on load
window.addEventListener('load', trackPageView);

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send this to an error tracking service
});

console.log('🎉 Website loaded successfully!');
