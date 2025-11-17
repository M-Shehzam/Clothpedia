// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle?.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample search data - you can expand this
const searchData = [
  { title: 'Home', url: 'index.html', description: 'Welcome to ClothPedia - Your clothing encyclopedia' },
  { title: 'Categories', url: 'categories.html', description: 'Browse all clothing categories' },
  { title: 'Summer Clothing', url: 'categories.html#summer', description: 'Light and breathable summer wear' },
  { title: 'Winter Clothing', url: 'categories.html#winter', description: 'Warm winter essentials' },
  { title: 'Spring Clothing', url: 'categories.html#spring', description: 'Fresh spring fashion' },
  { title: 'Autumn Clothing', url: 'categories.html#autumn', description: 'Cozy autumn styles' },
  { title: 'About Us', url: 'About.html', description: 'Learn more about ClothPedia' },
  { title: 'Contact', url: 'contact.html', description: 'Get in touch with us' },
  { title: 'Men\'s Fashion', url: 'categories.html', description: 'Clothing guides for men' },
  { title: 'Women\'s Fashion', url: 'categories.html', description: 'Clothing guides for women' },
  { title: 'Seasonal Wear', url: 'categories.html', description: 'Clothing for different seasons' },
  { title: 'Fashion Tips', url: 'About.html', description: 'Expert fashion advice and tips' }
];

searchToggle?.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput?.focus(), 300);
});

searchClose?.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
});

// Search functionality
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length < 2) {
    searchResults.innerHTML = '';
    return;
  }
  
  const results = searchData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  );
  
  displaySearchResults(results, query);
});

function displaySearchResults(results, query) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="text-center py-4">
        <i class="fas fa-search fa-3x mb-3" style="opacity: 0.3;"></i>
        <p>No results found for "${query}"</p>
      </div>
    `;
    return;
  }
  
  searchResults.innerHTML = results.map(result => `
    <div class="search-result-item">
      <a href="${result.url}" style="text-decoration: none; color: white;">
        <h5 style="margin-bottom: 0.5rem;">${highlightText(result.title, query)}</h5>
        <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">${highlightText(result.description, query)}</p>
      </a>
    </div>
  `).join('');
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background: #d4a574; color: #000; padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn?.classList.add('visible');
  } else {
    backToTopBtn?.classList.remove('visible');
  }
  
  // Navbar scroll effect
  const navbar = document.getElementById('mainNavbar');
  if (window.pageYOffset > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===================================
// NAVBAR COLLAPSE ON CLICK (MOBILE)
// ===================================
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
    }
  });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===================================
// ANIMATE ON SCROLL
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .section-title, .section-subtitle');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// ===================================
// CAROUSEL AUTO-PLAY CONTROL
// ===================================
const carousel = document.querySelector('#heroCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 4000,
    wrap: true,
    touch: true
  });
}

// ===================================
// FORM VALIDATION (if forms exist)
// ===================================
const forms = document.querySelectorAll('.needs-validation');
forms.forEach(form => {
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👗 Welcome to ClothPedia! 👔', 'font-size: 20px; font-weight: bold; color: #d4a574;');
console.log('%cYour Ultimate Clothing Encyclopedia', 'font-size: 14px; color: #b8860b;');
