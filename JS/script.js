document.addEventListener('DOMContentLoaded', function() {
    console.log('Tadian Municipality Website Loaded');
    
    // Initialize all features
    initBackToTop();
    initSmoothScrolling();
    initCurrentYear();
    initSearchFunctionality();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initAnnouncementCarousel();
            initServiceCards();
            initHeroCarousel();
            break;
        case 'tourism.html':
            initImageGallery();
            initTourismModal();
            break;
        case 'services.html':
            initServicesSearch();
            initServiceItems();
            break;
        case 'news.html':
            initNewsTicker();
            break;
        case 'contact.html':
            initContactForm();
            initMap();
            break;
        case 'about.html':
            initOfficialCards();
            break;
    }
    
    // Add loading animation to all buttons with loading class
    initLoadingButtons();
});

// Search Functionality
function initSearchFunctionality() {
    const searchForms = document.querySelectorAll('.search-form');
    
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    });
}

function performSearch(searchTerm) {
    // Enhanced search functionality
    const searchablePages = {
        'services': ['Tax Assessment', 'Civil Registry', 'Business Permits', 'Building Permits', 'Health Services', 'Educational Assistance'],
        'tourism': ['Mount Kalawitan', 'Rice Terraces', 'Red Soil', 'Valley', 'Cultural Heritage'],
        'news': ['Municipal Building', 'Medical Mission', 'Scholarship', 'Agricultural Training', 'Tourism Development'],
        'about': ['History', 'Geography', 'Demographics', 'Culture', 'Municipal Officials'],
        'contact': ['Address', 'Phone', 'Email', 'Office Hours', 'Emergency Contacts']
    };

    let found = false;
    
    // Search in current page first
    const pageContent = document.body.textContent.toLowerCase();
    if (pageContent.includes(searchTerm.toLowerCase())) {
        highlightSearchTerm(searchTerm);
        found = true;
    }
    
    // If not found, suggest relevant pages
    if (!found) {
        for (const [page, terms] of Object.entries(searchablePages)) {
            if (terms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()))) {
                showSearchSuggestion(`Try searching in ${page.charAt(0).toUpperCase() + page.slice(1)} page`);
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        showSearchSuggestion('No results found. Try different keywords or browse our main sections.');
    }
}

function highlightSearchTerm(term) {
    // Remove previous highlights
    const existingHighlights = document.querySelectorAll('.search-highlight');
    existingHighlights.forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    
    // Highlight new term
    const bodyText = document.body.innerHTML;
    const regex = new RegExp(term, 'gi');
    const highlightedText = bodyText.replace(regex, match => 
        `<span class="search-highlight bg-warning">${match}</span>`
    );
    document.body.innerHTML = highlightedText;
}

function showSearchSuggestion(message) {
    // Remove existing suggestions
    const existingSuggestion = document.getElementById('searchSuggestion');
    if (existingSuggestion) {
        existingSuggestion.remove();
    }
    
    // Create new suggestion
    const suggestionDiv = document.createElement('div');
    suggestionDiv.id = 'searchSuggestion';
    suggestionDiv.className = 'alert alert-info mt-3';
    suggestionDiv.innerHTML = `
        <i class="fas fa-info-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    // Insert after search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.parentNode.insertBefore(suggestionDiv, searchForm.nextSibling);
    }
}

// Back to Top Functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
            setTimeout(() => {
                if (!backToTopButton.classList.contains('show')) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Update copyright year automatically
function initCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Hero Carousel (Homepage)
function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            touch: true
        });
        
        // Add keyboard navigation
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                bsCarousel.prev();
            } else if (e.key === 'ArrowRight') {
                bsCarousel.next();
            }
        });
    }
}

// Announcement Carousel (Homepage)
function initAnnouncementCarousel() {
    const carousel = document.getElementById('announcementCarousel');
    
    if (carousel) {
        // Auto-rotate announcements every 6 seconds
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 6000,
            pause: 'hover',
            wrap: true,
            touch: true
        });
        
        // Add keyboard navigation
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                bsCarousel.prev();
            } else if (e.key === 'ArrowRight') {
                bsCarousel.next();
            }
        });
    }
}

// Service Cards Animation (Homepage)
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Interactive Image Gallery (Tourism Page)
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View attraction details');
        
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Tourism Modal Functionality
function initTourismModal() {
    const modal = document.getElementById('attractionModal');
    const viewButtons = document.querySelectorAll('.view-details');
    
    if (modal && viewButtons.length > 0) {
        const bsModal = new bootstrap.Modal(modal);
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                const description = this.getAttribute('data-description');
                const image = this.getAttribute('data-image');
                
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDescription').textContent = description;
                document.getElementById('modalImage').src = image;
                document.getElementById('modalImage').alt = title;
                
                // Update modal label for accessibility
                document.getElementById('attractionModalLabel').textContent = title;
            });
        });
        
        // Keyboard navigation for modal
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                bsModal.hide();
            }
        });
    }
}

// Services Search Functionality
function initServicesSearch() {
    const searchInput = document.getElementById('servicesSearch');
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (searchInput && serviceItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let hasResults = false;
            
            serviceItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const title = item.querySelector('.card-title')?.textContent.toLowerCase() || '';
                
                if (text.includes(searchTerm) || title.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('highlight');
                    
                    // Remove highlight after animation
                    setTimeout(() => {
                        item.classList.remove('highlight');
                    }, 1000);
                    
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show no results message
            showNoResultsMessage(hasResults, searchTerm);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
}

function showNoResultsMessage(hasResults, searchTerm) {
    let messageElement = document.getElementById('noResultsMessage');
    
    if (!hasResults && searchTerm) {
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'noResultsMessage';
            messageElement.className = 'alert alert-info mt-3';
            messageElement.innerHTML = `
                <i class="fas fa-info-circle me-2"></i>
                No services found matching "<strong>${searchTerm}</strong>". Try different keywords.
            `;
            
            const servicesList = document.getElementById('servicesList');
            if (servicesList) {
                servicesList.parentNode.insertBefore(messageElement, servicesList.nextSibling);
            }
        } else {
            messageElement.querySelector('strong').textContent = searchTerm;
        }
    } else if (messageElement) {
        messageElement.remove();
    }
}

// Service Items Interaction
function initServiceItems() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
}

// News Ticker Functionality
function initNewsTicker() {
    const ticker = document.querySelector('.news-ticker marquee');
    
    if (ticker) {
        // Pause on focus for better accessibility
        ticker.addEventListener('mouseenter', function() {
            this.stop();
        });
        
        ticker.addEventListener('mouseleave', function() {
            this.start();
        });
        
        // Add keyboard control
        ticker.setAttribute('tabindex', '0');
        ticker.addEventListener('focus', function() {
            this.stop();
        });
        
        ticker.addEventListener('blur', function() {
            this.start();
        });
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    
    // Remove previous validation states
    field.classList.remove('is-invalid', 'is-valid');
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    }
    
    // If valid and has value, mark as valid
    if (isValid && value) {
        field.classList.add('is-valid');
    }
    
    return isValid;
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending Message...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showAlert('success', 'Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        form.reset();
        
        // Remove validation classes
        form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Alert System
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Interactive Map
function initMap() {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Create interactive map placeholder
        mapContainer.innerHTML = `
            <div class="map-placeholder w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                <i class="fas fa-map-marker-alt fa-4x text-success mb-3"></i>
                <h4 class="text-success">Tadian Municipal Hall</h4>
                <p class="text-muted mb-3">Poblacion, Tadian, Mountain Province</p>
                <p class="mb-3">Click the button below to view on Google Maps</p>
                <button class="btn btn-success btn-lg" onclick="openGoogleMaps()" aria-label="Open Tadian Municipal Hall location in Google Maps">
                    <i class="fas fa-external-link-alt me-2"></i>View on Google Maps
                </button>
                <div class="mt-3">
                    <small class="text-muted">Coordinates: 16.9956° N, 120.8203° E</small>
                </div>
            </div>
        `;
        
        // Add hover effect
        const placeholder = mapContainer.querySelector('.map-placeholder');
        placeholder.style.cursor = 'pointer';
        placeholder.style.transition = 'all 0.3s ease';
        
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Keyboard accessibility
        placeholder.setAttribute('tabindex', '0');
        placeholder.setAttribute('role', 'button');
        placeholder.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGoogleMaps();
            }
        });
    }
}

function openGoogleMaps() {
    // Open Google Maps with Tadian Municipal Hall coordinates
    const url = 'https://www.google.com/maps?q=Tadian+Municipal+Hall,+Mountain+Province';
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Official Cards Interaction (About Page)
function initOfficialCards() {
    const officialCards = document.querySelectorAll('.official-card');
    
    officialCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.card-title').textContent;
            const position = this.querySelector('.card-text').textContent;
            
            // Show quick info (could be expanded to a modal)
            console.log(`Selected: ${name} - ${position}`);
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
}

// Loading Buttons Animation
function initLoadingButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-loading')) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading"></span> Loading...';
                this.disabled = true;
                
                // Restore after 3 seconds (simulate loading)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 3000);
            }
        });
    });
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x300/198754/ffffff?text=Image+Not+Found';
        e.target.alt = 'Image not available';
    }
}, true);

// Add some utility functions
window.tadianUtils = {
    // Format phone number
    formatPhone: function(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    
    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    getCurrentPage: function() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }
};

function trackPageView() {
    console.log(`Page viewed: ${window.tadianUtils.getCurrentPage()}`);
}

trackPageView();