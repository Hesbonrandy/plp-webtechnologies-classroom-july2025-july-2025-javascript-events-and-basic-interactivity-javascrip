/**
 * 🎯 PART 1: EVENT HANDLING & INTERACTIVE ELEMENTS
 * We'll set up event listeners to respond to user actions like clicks and form submissions.
 */

// 🌓 DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  themeToggle.textContent = isDarkMode ? '🌞 Switch to Light Mode' : '🌓 Toggle Dark Mode';
});

/**
 * 🎮 PART 2: BUILDING INTERACTIVE ELEMENTS
 * Feature 1: Dark Mode Toggle (above)
 * Feature 2: FAQ Accordion — Click questions to toggle answers
 */

// 📚 FAQ ACCORDION
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle the answer visibility
    const answer = button.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    // Close all answers first
    document.querySelectorAll('.faq-answer').forEach(el => {
      el.style.display = 'none';
    });

    // Open this one if it wasn't already open
    if (!isOpen) {
      answer.style.display = 'block';
    }
  });
});

/**
 * 📋 PART 3: FORM VALIDATION WITH JAVASCRIPT
 * Custom validation for name, email, and password fields.
 * Uses regex and real-time feedback.
 */

const registerForm = document.getElementById('registerForm');

// Helper: Show or hide error message
function showError(inputId, message) {
  const errorSpan = document.getElementById(`${inputId}Error`);
  errorSpan.textContent = message;
  errorSpan.style.display = message ? 'block' : 'none';
}

// Validation functions
function validateName(name) {
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name can only contain letters and spaces.";
  }
  return "";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
}

function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return "";
}

// Real-time validation on input
document.getElementById('name').addEventListener('input', function () {
  const error = validateName(this.value);
  showError('name', error);
});

document.getElementById('email').addEventListener('input', function () {
  const error = validateEmail(this.value);
  showError('email', error);
});

document.getElementById('password').addEventListener('input', function () {
  const error = validatePassword(this.value);
  showError('password', error);
});

// Form submission handler
registerForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  // Get values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate all
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  // Show errors if any
  showError('name', nameError);
  showError('email', emailError);
  showError('password', passwordError);

  // If no errors, show success
  if (!nameError && !emailError && !passwordError) {
    alert('✅ Registration successful! Welcome aboard!');
    registerForm.reset(); // Clear form
    // Hide all errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }
});