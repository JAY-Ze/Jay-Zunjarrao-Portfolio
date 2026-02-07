// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
    delay: 0
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for anchor links
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
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content glass-effect">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px 25px;
            border-radius: 12px;
            color: var(--text-primary);
            min-width: 300px;
            max-width: 400px;
        }
        
        .notification-content i:first-child {
            font-size: 1.5rem;
            color: var(--accent);
        }
        
        .notification-success .notification-content i:first-child {
            color: #10b981;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
            transition: var(--transition);
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
            }
            
            .notification-content {
                min-width: auto;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Skill bars animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'fillBar 1.5s ease-out forwards';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Parallax effect for gradient orbs
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

function animateOrbs() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add magnetic effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Cursor trail effect (optional, can be removed for better performance on mobile)
if (window.innerWidth > 768) {
    const cursorTrail = [];
    const trailLength = 5;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        cursorTrail.push(dot);
    }
    
    // Add styles for cursor trail
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-dot {
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    let mouseXPos = 0;
    let mouseYPos = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseXPos = e.clientX;
        mouseYPos = e.clientY;
    });
    
    function updateCursorTrail() {
        cursorTrail.forEach((dot, index) => {
            const nextDot = cursorTrail[index - 1] || { x: mouseXPos, y: mouseYPos };
            
            const x = nextDot.x || mouseXPos;
            const y = nextDot.y || mouseYPos;
            
            dot.x = x - (x - (dot.x || mouseXPos)) * 0.3;
            dot.y = y - (y - (dot.y || mouseYPos)) * 0.3;
            
            dot.style.left = `${dot.x}px`;
            dot.style.top = `${dot.y}px`;
            dot.style.opacity = (trailLength - index) / trailLength * 0.5;
        });
        
        requestAnimationFrame(updateCursorTrail);
    }
    
    updateCursorTrail();
}

// Performance optimization: Reduce animations on scroll
let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Add enter key support for form submission
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (contactForm) {
                contactForm.dispatchEvent(new Event('submit'));
            }
        }
    });
});

// Log page load time for optimization
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Add accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab navigation highlight
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus visible styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-light);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// console.log('✨ Portfolio loaded successfully!');