/**
 * Dynamic Common Footer Component for Velocityi2
 */
export function injectCommonFooter() {
  const footerElement = document.querySelector('.site-footer');
  if (!footerElement) return;

  footerElement.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        
        <div>
          <a href="/" class="logo-wrapper">
            <img src="public/logo.png" alt="Velocity Logo" style="height: 44px;">
          </a>

          <p class="footer-brand-desc">
            Velocity is an innovative embedded systems and electronics company dedicated to transforming ideas into reliable, intelligent, and scalable technology solutions.
          </p>

          <div class="footer-socials">
              <a href="https://wa.me/919274524204" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp">
                  <img src="public/whatsapp.png" alt="WhatsApp" class="social-img">
              </a>
              <a href="https://github.com/Velocity-i2" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
                  <img src="public/github.png" alt="GitHub" class="social-img">
              </a>
              <a href="https://www.instagram.com/velocityi2" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                  <img src="public/instagram.png" alt="Instagram" class="social-img">
              </a>
              <a href="https://www.linkedin.com/company/velocity-igniting-innovation" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
                  <img src="public/linkdin.png" alt="LinkedIn" class="social-img">
              </a>
              <a href="https://www.youtube.com/@velocityi2" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
                  <img src="public/youtube.png" alt="YouTube" class="social-img">
              </a>
              <a href="https://share.google/dO0JNt6wWKF4vVy8C" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Google Reviews">
                  <img src="public/review.png" alt="Google Reviews" class="social-img">
              </a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Services</h4>
          <div class="footer-links">
            <a href="services.html" class="footer-link">Services Overview</a>
            <a href="pcb-design.html" class="footer-link">High-Speed PCB Design</a>
            <a href="services.html#firmware" class="footer-link">Embedded Firmware</a>
            <a href="services.html#iot" class="footer-link">IoT Solutions</a>
            <a href="services.html#industrial" class="footer-link">Industrial Automation</a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Corporate</h4>
          <div class="footer-links">
            <a href="about.html" class="footer-link">About Velocity</a>
            <a href="portfolio.html" class="footer-link">Portfolio Case Studies</a>
            <a href="blogs.html" class="footer-link">Engineering Blog</a>
            <a href="careers.html" class="footer-link">Careers <span style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 600; padding: 2px 6px; background: rgba(6, 182, 212, 0.15); border-radius: 4px; margin-left: 5px;">Hiring</span></a>
            <a href="contact.html" class="footer-link">Contact Us</a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Corporate HQ</h4>
          <div class="footer-links" style="gap: 1rem;">
            <div class="flex" style="gap: 0.75rem; align-items: flex-start;">
              <i data-lucide="map-pin" style="color: var(--accent-blue); width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px;"></i>
              <span style="font-size: 0.95rem; color: var(--text-secondary);">
                SF/3, Shivam Complex, nr. Rajhans cinema,<br>
                New India Colony, Nikol,<br>
                Ahmedabad, Gujarat - 380049, India
              </span>
            </div>
            <div class="flex" style="gap: 0.75rem; align-items: center;">
              <i data-lucide="mail" style="color: var(--accent-blue); width: 18px; height: 18px; flex-shrink: 0;"></i>
              <a href="mailto:info.velocityi2@gmail.com" class="footer-link" style="margin: 0;">info.velocityi2@gmail.com</a>
            </div>
            <div class="flex" style="gap: 0.75rem; align-items: center;">
              <i data-lucide="phone" style="color: var(--accent-blue); width: 18px; height: 18px; flex-shrink: 0;"></i>
              <a href="tel:+919274524204" class="footer-link" style="margin: 0;">+91 92745 24204</a>
            </div>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span class="copyright-text">
          &copy; 2026 Velocity - Igniting Innovation (Velocityi2). All rights reserved. Designed and developed in India.
        </span>
        <div class="footer-bottom-links">
          <a href="privacy-policy.html" class="footer-bottom-link">Privacy Policy</a>
          <a href="terms-and-conditions.html" class="footer-bottom-link">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  `;
}
