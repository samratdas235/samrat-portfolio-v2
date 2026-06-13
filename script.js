/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC & ANIMATIONS - MR. SAMRAT D
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ACTIVE NAV LINK DETECTION
    const highlightActiveNav = () => {
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu .nav-item');
        
        navLinks.forEach(item => {
            const link = item.querySelector('.nav-link');
            const href = link.getAttribute('href');
            
            // Remove active classes first
            item.classList.remove('active');
            
            // Check if current path matches the link href
            if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path === ''))) {
                item.classList.add('active');
            }
        });
    };
    highlightActiveNav();

    // 2. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.02,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // 3. STATS COUNT-UP ANIMATION
    const statNumbers = document.querySelectorAll('.stat-number');
    const startCountAnimation = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 1500; // Animation duration in ms
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function: easeOutQuad
            const easedProgress = progress * (2 - progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target; // Ensure it ends on exact target
            }
        };
        
        requestAnimationFrame(animate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                startCountAnimation(numberElement);
                observer.unobserve(numberElement); // Animate once
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });

    // 4. CONTACT MODAL TRIGGER & TOGGLE
    const contactModal = document.getElementById('contact-modal');
    const contactTriggers = document.querySelectorAll('.btn-trigger-contact');
    const closeModalBtn = document.getElementById('btn-close-modal');

    const openModal = () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
    };

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable page scrolling
    };

    contactTriggers.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on clicking outside the card
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 5. CONTACT FORM HANDLING WITH SUCCESS STATE SIMULATION
    const contactForm = document.getElementById('portfolio-contact-form');
    const successOverlay = document.getElementById('form-success-overlay');
    const closeSuccessBtn = document.getElementById('btn-close-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard form submission
            
            // Simulate form submission latency
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            
            setTimeout(() => {
                // Show success overlay
                if (successOverlay) {
                    successOverlay.classList.add('active');
                }
                
                // Reset form fields
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1000);
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            if (successOverlay) {
                successOverlay.classList.remove('active');
            }
            closeModal(); // Close main modal as well
        });
    }
});
