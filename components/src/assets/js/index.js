// Updated JavaScript for the frontend form to integrate with PHP backend
document.getElementById('enquiryForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
    submitBtn.disabled = true;

    try {
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Client-side validation
        const errors = validateFormData(data);
        if (errors.length > 0) {
            showAlert('error', 'Please fix the following errors:\nâ€¢ ' + errors.join('\nâ€¢ '));
            return;
        }

        // Submit to PHP backend
        const response = await fetch('application_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showAlert('success', result.message);
            this.reset(); // Clear form

            // Optional: Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 30000,
                    'currency': 'NGN'
                });
            }
        } else {
            showAlert('error', result.message || 'Something went wrong. Please try again.');
            if (result.errors && result.errors.length > 0) {
                showAlert('error', 'Errors: ' + result.errors.join(', '));
            }
        }

    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('error', 'Network error. Please check your connection and try again.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Enhanced client-side validation
function validateFormData(data) {
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    if (data.name && data.name.length > 100) {
        errors.push('Name must be less than 100 characters');
    }
    if (data.name && !/^[a-zA-Z\s\'-]+$/.test(data.name.trim())) {
        errors.push('Name contains invalid characters');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please provide a valid email address');
    }
    if (data.email && data.email.length > 100) {
        errors.push('Email address is too long');
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('Please provide a valid phone number');
    }

     // Date of birth validation
    if (!data.dob) {
        errors.push('Date of birth is required');
    } else {
        const birthDate = new Date(data.dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 10 || age > 17) {
            errors.push('Applicant must be between 10 and 17 years old');
        }

        if (birthDate > today) {
            errors.push('Date of birth cannot be in the future');
        }
    }

    // Preferred course validation
    const validCourses = ['scratch', 'web_dev', 'mobile_app', 'robotics'];
    if (!data.course || !validCourses.includes(data.course)) {
        errors.push('Please select a valid course');
    }
  
     // How heard validation
    const validSources = ['whatsapp', 'instagram', 'facebook', 'tiktok', 'linkedin', 'twitter', 'youtube', 'friends', 'school', 'other'];
    if (!data.how_heard || !validSources.includes(data.how_heard)) {
        errors.push('Please select how you heard about us');
    }
    return errors;
}

// Enhanced alert system with better styling
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;

    const bgColor = type === 'success' ? '#d4edda' : '#f8d7da';
    const textColor = type === 'success' ? '#155724' : '#721c24';
    const borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';

    alert.innerHTML = `
        <div class="alert-content">
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;

    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${borderColor};
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: inherit;
    `;

    // Add to document
    document.body.appendChild(alert);

    // Auto remove after 6 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => alert.remove(), 300);
        }
    }, 6000);
}

// Real-time form validation
document.querySelectorAll('#enquiryForm input, #enquiryForm textarea, #enquiryForm select').forEach(field => {
    field.addEventListener('blur', function () {
        validateField(this);
    });

    field.addEventListener('input', function () {
        // Clear previous error styling on input
        this.classList.remove('is-invalid');
        const errorElement = this.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }

        // Update character counter for message field
        if (this.id === 'message') {
            updateCharacterCounter(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let error = '';

    switch (field.name) {
        case 'name':
            if (!value || value.length < 2) {
                error = 'Name must be at least 2 characters long';
            } else if (value.length > 100) {
                error = 'Name must be less than 100 characters';
            } else if (!/^[a-zA-Z\s\'-]+$/.test(value)) {
                error = 'Name contains invalid characters';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                error = 'Please provide a valid email address';
            } else if (value.length > 100) {
                error = 'Email address is too long';
            }
            break;

        case 'phone':
            const phoneRegex = /^\+?([0-9]{2,3})?[-.\s]?([0-9]{1,4})[-.\s]?([0-9]{1,4})[-.\s]?([0-9]{1,9})$/;
            if (!value || !phoneRegex.test(value)) {
                error = 'Please provide a valid phone number';
            }
            break;

        case 'dob':
            if (!value) {
                error = 'Date of birth is required';
            } else {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();

                if (age < 10 || age > 17) {
                    error = 'Applicant must be between 10 and 17 years old';
                }

                if (birthDate > today) {
                    error = 'Date of birth cannot be in the future';
                }
            }
            break;

        case 'course':
            const validCourses = ['scratch', 'web_dev', 'mobile_app', 'robotics'];
            if (!value || !validCourses.includes(value)) {
                error = 'Please select a valid course';
            }
            break;

        case 'how_heard':
            const validSources = ['whatsApp', 'instagram', 'facebook', 'tiktok', 'linkedin', 'twitter', 'youtube', 'friends', 'school', 'other'];
            if (!value || !validSources.includes(value)) {
                error = 'Please select how you heard about us';
            }
            break;
    }

    // Remove existing error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    if (error) {
        field.classList.add('is-invalid');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error text-danger small mt-1';
        errorElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${error}`;
        field.parentElement.appendChild(errorElement);
    } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }
}

// Character counter for message field
const messageField = document.getElementById('message');
if (messageField) {
    const counter = document.createElement('div');
    counter.className = 'char-counter text-muted small text-end';
    counter.style.marginTop = '5px';
    messageField.parentElement.appendChild(counter);

    function updateCharacterCounter(field) {
        const current = field.value.length;
        const max = 300;
        const remaining = max - current;

        counter.textContent = `${current}/300 characters`;

        if (remaining < 50) {
            counter.className = 'char-counter text-warning small text-end';
        } else if (remaining < 0) {
            counter.className = 'char-counter text-danger small text-end';
        } else {
            counter.className = 'char-counter text-muted small text-end';
        }
    }

    messageField.addEventListener('input', function () {
        updateCharacterCounter(this);
    });

    // Initialize counter
    updateCharacterCounter(messageField);
}

// Add enhanced CSS for form validation and animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .custom-alert .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .custom-alert .alert-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.7;
        color: inherit;
    }

    .custom-alert .alert-close:hover {
        opacity: 1;
    }

    .form-group input.is-invalid,
    .form-group textarea.is-invalid,
    .form-group select.is-invalid {
        border-color: #dc3545;
        box-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
    }

    .form-group input.is-valid,
    .form-group textarea.is-valid,
    .form-group select.is-valid {
        border-color: #28a745;
        box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
    }

    .field-error {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .char-counter {
        font-size: 0.8rem;
        transition: color 0.3s ease;
    }

    /* Enhanced form styling */
    .form-group {
        position: relative;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        border-color: var(--primary-gold);
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        transform: scale(1.01);
        transition: all 0.3s ease;
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Loading animation */
    .submit-btn .bi-hourglass-split {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(enhancedStyle);