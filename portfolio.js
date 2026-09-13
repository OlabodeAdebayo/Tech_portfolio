// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.querySelector('.icon-sun');
const moonIcon = themeToggle.querySelector('.icon-moon');
const html = document.documentElement;

// Load saved preference or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
setTheme(initialTheme);

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ========== Mobile Menu ==========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ========== Fade-in on Scroll ==========
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach(el => observer.observe(el));

// ========== Contact Form Validation ==========
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Reset errors
  document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) {
    document.getElementById('nameError').style.display = 'block';
    valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('emailError').style.display = 'block';
    valid = false;
  }
  if (!message.value.trim()) {
    document.getElementById('messageError').style.display = 'block';
    valid = false;
  }

  if (valid) {
    formSuccess.style.display = 'block';
    form.reset();
    // In a real project, send data to a backend / Formspree / EmailJS here
    setTimeout(() => formSuccess.style.display = 'none', 5000);
  }
});

// ========== Footer Year ==========
document.getElementById('year').textContent = new Date().getFullYear();