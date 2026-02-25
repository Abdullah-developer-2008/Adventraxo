
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (target === 3 ? 'M+' : '+');
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (target === 3 ? 'M+' : '+');
            }
        };
        updateCount();
    });
};

// Trigger counters when visible
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats'));

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.nav-next',
        prevEl: '.nav-prev',
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
    }
});

// Hover Logic for Mega Menu
const dropdownTrigger = document.querySelector('.nav-item-dropdown');
let timeout;

dropdownTrigger.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    dropdownTrigger.classList.add('active');
});

dropdownTrigger.addEventListener('mouseleave', () => {
    // Add a slight delay before closing to make it feel smoother
    timeout = setTimeout(() => {
        dropdownTrigger.classList.remove('active');
    }, 150);
});

document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // 1. Smooth Scroll with Offset for the Floating Navbar
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // 2. "Focus Flash" Effect Logic
            // This briefly highlights the section so the user knows they've arrived
            setTimeout(() => {
                targetSection.style.transition = 'background-color 0.8s ease';
                const originalBg = targetSection.style.backgroundColor;
                targetSection.style.backgroundColor = 'rgba(255, 106, 0, 0.03)';

                setTimeout(() => {
                    targetSection.style.backgroundColor = originalBg;
                }, 800);
            }, 600);
        }
    });
});

const ctaBtn = document.querySelector('.nav-cta');
const portal = document.getElementById('contactPortal');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('portalClose');

// Open Portal
ctaBtn.addEventListener('click', () => {
    portal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});

// Close Portal Logic
const closeModal = () => {
    portal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Form Submission Interaction
document.getElementById('advertisingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    btn.innerHTML = 'Establishing Connection...';
    
    setTimeout(() => {
        this.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2 style="color: var(--primary-orange);">Transmission Received.</h2>
                <p>An AdventreXo strategist will contact you within 2 business hours.</p>
            </div>
        `;
        setTimeout(closeModal, 3000);
    }, 1500);
});

const heroCta = document.querySelector('.trigger-portal-hero');
const portalElement = document.getElementById('contactPortal');

heroCta.addEventListener('click', (e) => {
    e.preventDefault();
    
    // High-logic UI feedback
    heroCta.style.width = heroCta.offsetWidth + 'px'; // Lock width
    heroCta.innerHTML = '<span class="loader-dots">Initializing...</span>';
    
    // Simulate a high-speed "System Check" for the premium feel
    setTimeout(() => {
        portalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset button text after portal opens
        setTimeout(() => {
            heroCta.innerHTML = 'Launch Campaign';
        }, 500);
    }, 600);
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.nav-item-dropdown');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Mobile Accordion Logic
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            // Toggle current
            dropdown.classList.toggle('active');
            
            // Close others (Optional)
            dropdowns.forEach(other => {
                if (other !== dropdown) other.classList.remove('active');
            });
        }
    });
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const advertisingForm = document.getElementById('advertisingForm');

advertisingForm.onsubmit = async (e) => {
    e.preventDefault();
    
    // 1. UI Feedback: Change button state
    const submitBtn = advertisingForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Transmitting...</span>";
    submitBtn.disabled = true;

    // 2. Map Input Values
    const formData = {
        fullName: advertisingForm.querySelectorAll('input')[0].value,
        company: advertisingForm.querySelectorAll('input')[1].value,
        email: advertisingForm.querySelectorAll('input')[2].value,
        adSpend: advertisingForm.querySelector('select').value,
        goal: advertisingForm.querySelector('textarea').value
    };

    try {
        const response = await fetch('/api/deploy-strategy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // 3. Success State
            submitBtn.innerHTML = "<span>Strategy Deployed ✓</span>";
            submitBtn.style.background = "#00ff88";
            setTimeout(() => {
                togglePortal(false); // Close modal
                advertisingForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = "";
                submitBtn.disabled = false;
            }, 2000);
        }
    } catch (error) {
        console.error("Transmission failed", error);
        submitBtn.innerHTML = "<span>Error. Try again.</span>";
        submitBtn.disabled = false;
    }
};

const footerForm = document.querySelector('.cta-form');

footerForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const emailInput = footerForm.querySelector('input[type="email"]');
    const submitBtn = footerForm.querySelector('button');
    const originalContent = submitBtn.innerHTML;

    // UI State: Loading
    submitBtn.innerHTML = "Processing...";
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/footer-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
        });

        if (response.ok) {
            // UI State: Success
            submitBtn.innerHTML = "Sent ✓";
            submitBtn.style.background = "#00ff88";
            emailInput.value = ""; // Clear input
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = "";
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (error) {
        submitBtn.innerHTML = "Retry";
        submitBtn.disabled = false;
        console.error("Footer lead error:", error);
    }
};