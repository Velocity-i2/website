export function injectCommonNavbar() {
    const headerElement = document.getElementById('site-header');
    if (!headerElement) return;

    headerElement.innerHTML = `
    <div class="container header-container">
      <a href="index.html" class="logo-wrapper">
        <img src="public/logo.png" alt="Velocity Logo" class="logo-img" />
      </a>
      
      <nav id="nav-menu" class="nav-menu">
        <a href="index.html" class="nav-link">Home</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="products.html" class="nav-link">Products</a>
        <a href="industries.html" class="nav-link">Industries</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="contact.html" class="btn btn-sm btn-primary hide-on-mobile">Book Consultation</a>
      </nav>
      
      <button id="menu-toggle" class="menu-toggle" aria-label="Toggle navigation">
        <i data-lucide="menu"></i>
      </button>
    </div>
  `;
}
