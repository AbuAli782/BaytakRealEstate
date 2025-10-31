// ========== Hero Background Carousel ==========
let carouselIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselInterval = 4000; // 4 seconds

function changeCarouselSlide() {
    // Remove active class from current slide
    carouselSlides[carouselIndex].classList.remove('active');
    
    // Move to next slide
    carouselIndex = (carouselIndex + 1) % carouselSlides.length;
    
    // Add active class to new slide
    carouselSlides[carouselIndex].classList.add('active');
}

// Start carousel auto-play
if (carouselSlides.length > 0) {
    setInterval(changeCarouselSlide, carouselInterval);
}

// ========== Typing Animation for Hero Title ==========
// Typing animation is now handled purely by CSS with infinite loop
// No JavaScript needed for the typing effect

// ========== Language Toggle ==========
const langBtn = document.getElementById('lang-toggle');
let currentLang = 'ar';

langBtn.addEventListener('click', () => {
    if (currentLang === 'ar') {
        currentLang = 'en';
        document.body.classList.add('en');
        langBtn.textContent = 'العربية';
    } else {
        currentLang = 'ar';
        document.body.classList.remove('en');
        langBtn.textContent = 'English';
    }
    
    updateLanguage();
    loadProperties(); // Reload properties with new language
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-ar]');
    
    elements.forEach(element => {
        const arText = element.getAttribute('data-ar');
        const enText = element.getAttribute('data-en');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = currentLang === 'ar' ? arText : enText;
        } else {
            element.textContent = currentLang === 'ar' ? arText : enText;
        }
    });
    
    // Update input placeholders
    const inputs = document.querySelectorAll('[data-ar-placeholder]');
    inputs.forEach(input => {
        const arPlaceholder = input.getAttribute('data-ar-placeholder');
        const enPlaceholder = input.getAttribute('data-en-placeholder');
        input.placeholder = currentLang === 'ar' ? arPlaceholder : enPlaceholder;
    });
}

// ========== Mobile Menu ==========
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const navMenu = document.getElementById('nav-menu');

mobileMenuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuIcon.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuIcon.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuIcon.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuIcon.classList.remove('active');
    }
});

// ========== Smooth Scroll ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Scroll Animations ==========
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .property-card, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

animateOnScroll();

// ========== Testimonials Slider ==========
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const slider = document.getElementById('testimonials-slider');

function changeSlide(index) {
    currentSlide = index;
    const offset = -index * 100;
    slider.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-slide testimonials
let autoSlideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    changeSlide(currentSlide);
}, 5000);

// Reset auto-slide when manually changing
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        changeSlide(index);
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            changeSlide(currentSlide);
        }, 5000);
    });
});

// ========== Close Popup Functions ==========
const popup = document.getElementById('property-popup');

function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `${currentLang === 'ar' ? 'مرحباً' : 'Hello'}, ${currentLang === 'ar' ? 'اسمي' : 'my name is'} ${name}.\n${currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}: ${email}\n${currentLang === 'ar' ? 'الرسالة' : 'Message'}: ${message}`;
    
    const whatsappUrl = `https://wa.me/967771706601?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert(currentLang === 'ar' ? 'شكراً لتواصلك معنا! سيتم فتح واتساب للإرسال.' : 'Thank you for contacting us! WhatsApp will open to send your message.');
});

// ========== Header & Scroll Effects ==========
const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header scroll effect
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll to top button visibility
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// متغير عام لحفظ جميع العقارات
let allProperties = [];

// ========== Load Properties ==========
function loadProperties() {
    const propertiesGrid = document.querySelector('.properties-grid');
    
    // الحصول على جميع العقارات (المضافة من لوحة التحكم + الافتراضية)
    allProperties = typeof getAllProperties === 'function' ? getAllProperties() : propertiesData;
    
    console.log('Loading properties...', {
        gridExists: !!propertiesGrid,
        dataExists: typeof allProperties !== 'undefined',
        dataLength: typeof allProperties !== 'undefined' ? allProperties.length : 0
    });
    
    if (!propertiesGrid) {
        console.error('Properties grid not found!');
        return;
    }
    
    if (typeof allProperties === 'undefined') {
        console.error('Properties data not loaded!');
        return;
    }
    
    propertiesGrid.innerHTML = '';
    
    allProperties.forEach((property, index) => {
        const card = document.createElement('div');
        card.className = 'property-card';
        
        const statusClass = property.status.ar === 'للإيجار' ? 'rent-badge' : 'sale-badge';
        
        card.innerHTML = `
            <img src="${property.mainImage}" alt="${property.name[currentLang]}" loading="lazy">
            <div class="property-content">
                <div class="property-badge ${statusClass}" data-ar="${property.status.ar}" data-en="${property.status.en}">
                    ${property.status[currentLang]}
                </div>
                <h3 class="property-name" data-ar="${property.name.ar}" data-en="${property.name.en}">
                    ${property.name[currentLang]}
                </h3>
                <p class="property-location" data-ar="${property.location.ar}" data-en="${property.location.en}">
                    ${property.location[currentLang]}
                </p>
                <div class="property-details">
                    ${property.bedrooms !== '-' ? `<span class="property-detail">🛏️ ${property.bedrooms}</span>` : ''}
                    ${property.bathrooms !== '-' ? `<span class="property-detail">🚿 ${property.bathrooms}</span>` : ''}
                    <span class="property-detail">📐 ${property.area}</span>
                </div>
                <p class="property-price">${property.price}</p>
                <a href="https://wa.me/967771706601?text=${encodeURIComponent(`مرحباً، أريد الاستفسار عن العقار:\n${property.name.ar}\n${property.location.ar}\nالسعر: ${property.price}`)}" class="details-btn" data-ar="تواصل معنا للتفاصيل" data-en="Contact for Details" target="_blank">
                    ${currentLang === 'ar' ? 'تواصل معنا للتفاصيل' : 'Contact for Details'}
                </a>
            </div>
        `;
        
        propertiesGrid.appendChild(card);
    });
    
    console.log(`✅ Loaded ${allProperties.length} properties successfully!`);
    animateOnScroll();
}

// ========== Open Property Popup ==========
function openPropertyPopup(index) {
    if (!allProperties || !allProperties[index]) return;
    
    const property = allProperties[index];
    const currentLang = document.body.classList.contains('en') ? 'en' : 'ar';
    
    const popup = document.getElementById('property-popup');
    const popupContent = popup.querySelector('.popup-details');
    
    let imagesHTML = '';
    property.images.forEach(img => {
        imagesHTML += `<img src="${img}" alt="${property.name[currentLang]}" class="popup-image">`;
    });
    
    popupContent.innerHTML = `
        <h2>${property.name[currentLang]}</h2>
        <div class="popup-images">${imagesHTML}</div>
        <div class="popup-info">
            <p><strong>${currentLang === 'ar' ? 'الموقع:' : 'Location:'}</strong> ${property.location[currentLang]}</p>
            <p><strong>${currentLang === 'ar' ? 'السعر:' : 'Price:'}</strong> ${property.price}</p>
            <p><strong>${currentLang === 'ar' ? 'المساحة:' : 'Area:'}</strong> ${property.area}</p>
            ${property.bedrooms !== '-' ? `<p><strong>${currentLang === 'ar' ? 'غرف النوم:' : 'Bedrooms:'}</strong> ${property.bedrooms}</p>` : ''}
            ${property.bathrooms !== '-' ? `<p><strong>${currentLang === 'ar' ? 'الحمامات:' : 'Bathrooms:'}</strong> ${property.bathrooms}</p>` : ''}
            <p><strong>${currentLang === 'ar' ? 'النوع:' : 'Type:'}</strong> ${property.type[currentLang]}</p>
            <p><strong>${currentLang === 'ar' ? 'الحالة:' : 'Status:'}</strong> ${property.status[currentLang]}</p>
        </div>
        <p class="popup-description">${property.description[currentLang]}</p>
        <a href="https://wa.me/967771706601?text=${encodeURIComponent(currentLang === 'ar' ? `مرحباً، أنا مهتم بـ ${property.name.ar}` : `Hello, I'm interested in ${property.name.en}`)}" 
           class="popup-whatsapp" target="_blank">
            ${currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
        </a>
    `;
    
    popup.classList.add('active');
}

// ========== Initialize on Load ==========
window.addEventListener('load', () => {
    // Load properties from data file
    loadProperties();
    
    // Trigger animations for elements in viewport
    animateOnScroll();
    
    // Set initial language placeholders
    updateLanguage();
});

console.log('%c بيتك العقارية - Beytak Real Estate ', 'background: linear-gradient(135deg, #004aad, #3ecf8e); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('Website developed with ❤️');
