// Smooth scrolling with offset for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // Adjust this value to match your navbar height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.style.display = 'none';
            }
        }
    });
});

// Mobile navigation toggle with smooth animations
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
        // Close animation
        hamburger.classList.remove('active');
        navLinks.style.display = 'none';
        navLinks.style.opacity = '0';
        navLinks.style.transform = 'translateX(100%)';
    } else {
        // Open animation
        hamburger.classList.add('active');
        navLinks.style.display = 'flex';
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateX(0)';
    }
});

// Animate hamburger menu
hamburger.addEventListener('click', () => {
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Enhanced progress bars with particles
const progressBars = document.querySelectorAll('.progress');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('style').split('width:')[1];
            
            // Create particles
            const particles = document.createElement('div');
            particles.className = 'particles';
            bar.appendChild(particles);

            // Animate progress bar
            let currentWidth = 0;
            const interval = setInterval(() => {
                if (currentWidth >= parseInt(targetWidth)) {
                    clearInterval(interval);
                } else {
                    currentWidth += 1;
                    bar.style.width = `${currentWidth}%`;
                    
                    // Add particle
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = `${currentWidth - 1}%`;
                    particles.appendChild(particle);

                    // Animate particle
                    setTimeout(() => {
                        particle.style.transform = 'translateY(-10px)';
                    }, 100);

                    // Remove particle after animation
                    setTimeout(() => {
                        particles.removeChild(particle);
                    }, 500);
                }
            }, 10);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    observer.observe(bar);
});

// Add particle styles
const style = document.createElement('style');
style.textContent = `
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .particle {
        position: absolute;
        width: 5px;
        height: 5px;
        background: white;
        border-radius: 50%;
        transform: translateY(0);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Enhanced form submission with validation and animations
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Add placeholder animations
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form validation
function validateForm() {
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// Submit form with animation
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Disable form
    formInputs.forEach(input => input.disabled = true);
    
    // Show loading animation
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.appendChild(successMessage);

        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            formInputs.forEach(input => input.disabled = false);
            submitBtn.innerHTML = 'Send Message';
            successMessage.remove();
        }, 3000);
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'An error occurred. Please try again.';
        contactForm.appendChild(errorMessage);

        // Re-enable form
        setTimeout(() => {
            formInputs.forEach(input => input.disabled = false);
            submitBtn.innerHTML = 'Send Message';
            errorMessage.remove();
        }, 3000);
    }
});

// Enhanced scroll animations with stagger effect
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger effect
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.animationDelay = `${delay}s`;
                
                // Remove observer after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add stagger delay to elements
    elements.forEach((element, index) => {
        element.dataset.delay = (index * 0.1).toFixed(1);
        observer.observe(element);
    });
};

// Initial check and scroll event listener
animateOnScroll();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1;
        transform: translateY(0);
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add typing animation to the hero section
const heroText = document.querySelector('.highlight');
let text = heroText.textContent;
heroText.textContent = '';

function typeText() {
    if (text.length > 0) {
        heroText.textContent += text.charAt(0);
        text = text.substring(1);
        setTimeout(typeText, 100);
    }
}

setTimeout(typeText, 1000);
