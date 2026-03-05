// Sticky navbar (already handled by position:sticky, but we can add class on scroll if needed)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll (already with CSS scroll-behavior, but we add fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // close all
        accordionItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Testimonial slider
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentIndex = 0;
const totalSlides = document.querySelectorAll('.testimonial-card').length;

function updateSlider(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
}

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateSlider(idx));
});

// Auto slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
}, 5000);

// Form validation
const demoForm = document.getElementById('demoForm');
demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById('name');
    const nameError = name.nextElementSibling;
    if (name.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = email.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Valid email required';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Phone validation
    const phone = document.getElementById('phone');
    const phoneError = phone.nextElementSibling;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        phoneError.textContent = '10-digit mobile number';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }

    // Course type
    const courseType = document.getElementById('courseType');
    const courseError = courseType.nextElementSibling;
    if (courseType.value === '') {
        courseError.textContent = 'Please select a course';
        isValid = false;
    } else {
        courseError.textContent = '';
    }

    if (isValid) {
        alert('Thank you! We will contact you shortly.');
        demoForm.reset();
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.glass-card, .course-card, .curriculum-item, .feature-card, .pricing-card, .testimonial-card, .demo-form');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});