// Handle contact channel change to show/hide relevant fields
const contactChannelSelect = document.getElementById('contactChannel');
if (contactChannelSelect) {
    contactChannelSelect.addEventListener('change', function() {
        // Hide all fields
        document.getElementById('whatsappField').classList.add('hidden');
        document.getElementById('phoneField').classList.add('hidden');
        document.getElementById('emailField').classList.add('hidden');
        
        // Show selected field
        if (this.value === 'whatsapp') {
            document.getElementById('whatsappField').classList.remove('hidden');
        } else if (this.value === 'phone') {
            document.getElementById('phoneField').classList.remove('hidden');
        } else if (this.value === 'email') {
            document.getElementById('emailField').classList.remove('hidden');
        }
    });
}

// Form submission handler - Only run if form exists
const legalForm = document.getElementById('legalForm');
if (legalForm) {
    legalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactChannel = document.getElementById('contactChannel')?.value;
        
        // Get form data
        const formData = {
            decisionType: document.getElementById('decisionType')?.value,
            contactChannel: contactChannel,
            language: document.getElementById('language')?.value,
            whatsupnumber: null,
            phoneNumber: null,
            email: null
        };
        
        // Get the appropriate contact field based on channel
        if (contactChannel === 'whatsapp') {
            formData.whatsupnumber = document.getElementById('whatsupnumber')?.value;
        } else if (contactChannel === 'phone') {
            formData.phoneNumber = document.getElementById('phoneInput')?.value;
        } else if (contactChannel === 'email') {
            formData.email = document.getElementById('emailInput')?.value;
        }
        
        // Validate form
        if (!formData.decisionType || !formData.contactChannel) {
            showMessage('الرجاء ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Validate contact information based on channel
        if (contactChannel === 'whatsapp' && !formData.whatsupnumber) {
            showMessage('الرجاء إدخال رقم واتس اب', 'error');
            return;
        } else if (contactChannel === 'phone' && !formData.phoneNumber) {
            showMessage('الرجاء إدخال رقم الهاتف', 'error');
            return;
        } else if (contactChannel === 'email' && !formData.email) {
            showMessage('الرجاء إدخال البريد الإلكتروني', 'error');
            return;
        }
        
        // Validate phone/whatsapp format (basic validation)
        const phoneRegex = /^\+?[0-9\s-]+$/;
        if ((contactChannel === 'whatsapp' && !phoneRegex.test(formData.whatsupnumber)) ||
            (contactChannel === 'phone' && !phoneRegex.test(formData.phoneNumber))) {
            showMessage('الرجاء إدخال رقم صحيح', 'error');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'تم الإرسال بنجاح ✓';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.disabled = true;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
        
        // Show success notification
        showMessage('تم استلام طلبك بنجاح. سنتواصل معك قريباً.', 'success');
    });
}

// Show notification message
function showMessage(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Smooth scroll for anchor links (if any)
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .hero-text, .content-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
