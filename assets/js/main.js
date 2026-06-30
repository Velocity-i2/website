/* ==========================================================================
   Velocity Corporate Design System | Main JavaScript Module
   ========================================================================== */

import { products } from './products-data.js';
import { injectCommonFooter } from './footer.js';
import { injectCommonNavbar } from './navbar.js';

// CHANGE THIS: Paste your deployed Google Apps Script Web App URL here!
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym_AWdjk64njJix9UZkVYWPlwevAAfaWOsz1ACge5_v23Ohq0zu7gi4uDdlQYf1ovSdw/exec';
                          
document.addEventListener('DOMContentLoaded', () => {
  // 0. Inject Common Navbar & Footer
  injectCommonNavbar();
  injectCommonFooter();

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Hamburger Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        const isOpen = navMenu.classList.contains('open');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  }

  // 4. Highlight Active Page Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  let matched = false;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === '/'))) {
      link.classList.add('active');
      matched = true;
    }
  });
  
  // Fallback: If no match, check / default
  if (!matched && (currentPath === '/' || currentPath.endsWith('/') || currentPath === '')) {
    const homeLink = document.querySelector('.nav-link[href="/"]');
    if (homeLink) homeLink.classList.add('active');
  }

  // 5. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // 6. Interactive Cybernetic Circuit Canvas (Hero Background)
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Resize handler
    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Circuit nodes
    const nodes = [];
    const nodeCount = Math.min(40, Math.floor((width * height) / 18000));
    const connectionDistance = 120;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1.5;
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        // Bounce on borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const alpha = 0.3 + Math.sin(this.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.fill();
        
        // Draw a soft outer halo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.3})`;
        ctx.fill();
      }
    }

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    // Render Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grids briefly
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connect nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(29, 78, 216, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            
            // Draw clean 90 degree "electronics PCB style" path instead of straight lines sometimes
            if (i % 3 === 0) {
              const midX = (nodes[i].x + nodes[j].x) / 2;
              ctx.lineTo(midX, nodes[i].y);
              ctx.lineTo(midX, nodes[j].y);
            } else {
              ctx.lineTo(nodes[j].x, nodes[j].y);
            }
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // 7. Contact Page Interactive Form Submission
  const contactForm = document.getElementById('velocity-contact-form');
  const successAlert = document.getElementById('contact-success-alert');
  if (contactForm && successAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show an elegant sending spinner / disable button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="anim-pulse-glow">Transmitting project specs...</span>';
        submitBtn.setAttribute('disabled', 'true');
      }

      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      // Extract the human-readable text for dropdowns to match the website exactly
      const serviceSelect = contactForm.querySelector('select[name="service"]');
      if (serviceSelect && serviceSelect.selectedIndex !== -1) {
        payload['service'] = serviceSelect.options[serviceSelect.selectedIndex].text;
      }
      
      const timelineSelect = contactForm.querySelector('select[name="timeline"]');
      if (timelineSelect && timelineSelect.selectedIndex !== -1) {
        payload['timeline'] = timelineSelect.options[timelineSelect.selectedIndex].text;
      }
      
      const budgetSelect = contactForm.querySelector('select[name="budget"]');
      if (budgetSelect && budgetSelect.selectedIndex !== -1) {
        payload['budget'] = budgetSelect.options[budgetSelect.selectedIndex].text;
      }
      // Insert submission timestamp
      payload['timestamp'] = new Date().toISOString();
      payload['logoUrl'] = window.location.origin + 'public/logo.png';

      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        // Fallback demo/guidance mode for easy installation
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.removeAttribute('disabled');
          }
          
          contactForm.reset();
          successAlert.style.borderColor = 'rgba(234, 179, 8, 0.4)';
          successAlert.innerHTML = `
            <div class="flex" style="gap: 1rem; align-items: flex-start;">
              <i data-lucide="help-circle" style="color: #eab308; width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px;"></i>
              <div>
                <h4 style="color: var(--text-primary); margin-bottom: 0.25rem; font-weight: 600;">Form Ready (Configuration Required)</h4>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; line-height: 1.5;">
                  Your contact form is completely structured! To start receiving submissions in your Google Sheet and corporate email instantly:
                </p>
                <ol style="color: var(--text-secondary); font-size: 0.9rem; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; line-height: 1.4;">
                  <li>Follow the step-by-step Apps Script guide sent by the assistant below.</li>
                  <li>Copy your deployed Web App URL.</li>
                  <li>Open <code>/assets/js/main.js</code> and paste it into the <code>GOOGLE_SCRIPT_URL</code> variable at the top (Line 9).</li>
                </ol>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                  <em>This dynamic popup will disappear once the correct deployment URL is detected.</em>
                </p>
              </div>
            </div>
          `;
          successAlert.style.display = 'block';
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1200);
        return;
      }

      // Real integration with Google Apps Script API (bypassing preflight via text/plain JSON post)
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Solves redirect CORS issues beautifully in Apps Script
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.removeAttribute('disabled');
        }
        
        // Reset and show beautiful enterprise success alert
        contactForm.reset();
        successAlert.style.borderColor = 'rgba(6, 182, 212, 0.3)';
        successAlert.innerHTML = `
          <div class="flex" style="gap: 1rem; align-items: flex-start;">
            <i data-lucide="check-circle" style="color: var(--accent-cyan); width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px;"></i>
            <div>
              <h4 style="color: var(--text-primary); margin-bottom: 0.25rem; font-weight: 600;">Specifications Transmitted!</h4>
              <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; line-height: 1.5;">
                Your project requirements have been successfully logged to our Google Sheet and routed directly to our hardware engineering team. We are already analyzing your parameters and will get in touch within 24 hours.
              </p>
            </div>
          </div>
        `;
        successAlert.style.display = 'block';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(error => {
        console.error('Form submission failed:', error);
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.removeAttribute('disabled');
        }
        
        successAlert.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        successAlert.innerHTML = `
          <div class="flex" style="gap: 1rem; align-items: flex-start;">
            <i data-lucide="alert-circle" style="color: #ef4444; width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px;"></i>
            <div>
              <h4 style="color: var(--text-primary); margin-bottom: 0.25rem; font-weight: 600;">Transmission Failure</h4>
              <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; line-height: 1.5;">
                An issue occurred while sending your parameters. Please check your internet connection or reach out directly to us at <strong>info.velocityi2@gmail.com</strong>.
              </p>
            </div>
          </div>
        `;
        successAlert.style.display = 'block';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // 8. Dynamic Products Catalog Rendering
  const productsGrid = document.getElementById('products-dynamic-grid');
  if (productsGrid && typeof products !== 'undefined') {
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
      const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
      const card = document.createElement('div');
      card.className = `card-glow ${revealClass} product-filterable-card`;
      card.setAttribute('data-category', product.category);
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      
      let specsHTML = '';
      if (product.specs) {
        specsHTML = `
          <div style="background: rgba(15, 23, 42, 0.02); border: 1px solid var(--border-light); padding: 1.25rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 1.5rem;">
            <span style="color: var(--accent-blue); display: block; margin-bottom: 0.5rem;">[KEY SPECIFICATIONS]</span>
            ${Object.entries(product.specs).map(([key, value], i, arr) => `
              <div class="flex justify-between" style="padding: 0.25rem 0; ${i < arr.length - 1 ? 'border-bottom: 1px dashed rgba(15, 23, 42, 0.08);' : ''}">
                <span>${key}</span>
                <span>${value}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      const imageHTML = product.image ? `
        <div class="product-image-container" style="width: 100%; height: 220px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-light); margin-bottom: 1.5rem; transition: all 0.3s ease; position: relative; background: rgba(15,23,42,0.15);">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" referrerPolicy="no-referrer" />
        </div>
      ` : '';

      card.innerHTML = `
        <div class="badge badge-cyan">${product.badge}</div>
        ${imageHTML}
        <h3 style="font-size: 1.75rem; margin-top: 0.5rem;">${product.name}</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${product.description}</p>
        ${specsHTML}
        <button class="btn btn-primary request-datasheet-btn" data-product="${product.name}">
          Request Datasheet <i data-lucide="download" style="width: 14px;"></i>
        </button>
      `;
      productsGrid.appendChild(card);
    });

    // Populate dropdown in datasheet modal dynamically from our products source of truth
    const selectEl = document.getElementById('modal-product-select');
    if (selectEl) {
      selectEl.innerHTML = '';
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name;
        selectEl.appendChild(opt);
      });
    }
  }

  // 9. Products Category Filter Controls
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active filter button style
        filterButtons.forEach(btn => {
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-secondary');
        });
        button.classList.add('btn-primary');
        button.classList.remove('btn-secondary');

        const filterValue = button.getAttribute('data-filter');
        const activeCards = document.querySelectorAll('.product-filterable-card');
        activeCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 150);
          }
        });
      });
    });
  }

  // 10. Datasheet Request Modal Dialog Setup (Uses Event Delegation)
  const datasheetModal = document.getElementById('datasheet-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const datasheetForm = document.getElementById('datasheet-request-form');
  const datasheetSuccess = document.getElementById('datasheet-success-message');
  
  if (datasheetModal) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.request-datasheet-btn');
      if (btn) {
        e.preventDefault();
        const productName = btn.getAttribute('data-product') || 'Select Product';
        const selectEl = document.getElementById('modal-product-select');
        if (selectEl) {
          selectEl.value = productName;
        }
        datasheetModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });

    const closeModal = () => {
      datasheetModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      if (datasheetForm) datasheetForm.reset();
      if (datasheetSuccess) datasheetSuccess.style.display = 'none';
      if (datasheetForm) datasheetForm.style.display = 'block';
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
      if (e.target === datasheetModal) {
        closeModal();
      }
    });

    if (datasheetForm) {
      datasheetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = datasheetForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.innerHTML = 'Generating secure link...';
          submitBtn.setAttribute('disabled', 'true');
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = 'Download Datasheet';
            submitBtn.removeAttribute('disabled');
          }
          datasheetForm.style.display = 'none';
          if (datasheetSuccess) datasheetSuccess.style.display = 'block';
        }, 1200);
      });
    }
  }

  // 11. SOCIAL PROOF HUB (Google Reviews Profile & Instagram Account Integration)
  const instagramStatus = document.getElementById('instagram-status');

  // Helper to dynamically calculate initials from names
  function getInitials(name) {
    if (!name) return 'V';
    // Remove special characters
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const parts = cleanName.split(/\s+/);
    if (parts.length === 0) return 'V';
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // PREDEFINED GOOGLE REVIEWS LIST
  const localDemoReviews = [
    {
      author_name: "Kaushal Bavishiya137",
      text: "Exceptional service and professionalism! They designed and developed our PCB and firmware perfectly.",
      role: "Verified Business Reviewer"
    },
    {
      author_name: "ADHITHYAN V H",
      text: "Velocity offers a really solid mix of services under one roof — from product development and PCB design to 3D printing and even drone solutions. Their team is hands-on and knows how to turn ideas into working systems. If you're into embedded tech, they’re definitely worth checking out.",
      role: "Verified Business Reviewer"
    },
    {
      author_name: "Aniket Vadadoriya",
      text: "We were absolutely blown away by their deep expertise in embedded systems and the outstanding quality of their custom hardware. The team was professional, responsive, and delivered beyond our expectations.",
      role: "Verified Business Reviewer"
    }
  ];

  // We duplicate the reviews programmatically to ensure there are enough items for a rich infinite carousel track
  const reviews = [...localDemoReviews, ...localDemoReviews]; 
  const N_reviews = reviews.length; // 6
  const reviewCloneCount = 3; // Prepend 3, Append 3
  let currentReviewIndex = reviewCloneCount; // Starts at first real item
  let isReviewTransitioning = false;
  let reviewsAutoplayTimer = null;

  // Track elements
  const reviewsTrack = document.getElementById('google-reviews-track');
  const prevReviewBtn = document.getElementById('prev-review-btn');
  const nextReviewBtn = document.getElementById('next-review-btn');
  const reviewsDots = document.getElementById('reviews-dots');
  const reviewsWrapper = document.querySelector('.reviews-carousel-wrapper');

  // Render Reviews Carousel
  function renderReviewsCarousel() {
    if (!reviewsTrack) return;

    reviewsTrack.innerHTML = '';

    // Create the slides: [clones of last 3] + [real 6 items] + [clones of first 3]
    const startClones = reviews.slice(-reviewCloneCount);
    const endClones = reviews.slice(0, reviewCloneCount);
    const allSlidesData = [...startClones, ...reviews, ...endClones];

    allSlidesData.forEach((rev, idx) => {
      const slide = document.createElement('div');
      slide.className = 'review-slide';
      
      const initials = rev.initials || getInitials(rev.author_name);
      const charCount = rev.text.length;
      let fontSize = '0.95rem';
      let lineHeight = '1.6';
      
      if (charCount > 250) {
        fontSize = '0.82rem';
        lineHeight = '1.45';
      } else if (charCount > 150) {
        fontSize = '0.88rem';
        lineHeight = '1.5';
      }

      slide.innerHTML = `
        <div class="review-card-inner">
          <div class="review-text-container" style="line-height: ${lineHeight}; font-size: ${fontSize};">
            "${rev.text}"
          </div>
          <div class="flex items-center justify-between" style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light); flex-shrink: 0; width: 100%;">
            <div class="flex items-center gap-2">
              <div style="width: 40px; height: 40px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--accent-cyan); flex-shrink: 0;">
                ${initials}
              </div>
              <div>
                <h4 style="font-size: 0.95rem; margin: 0; color: var(--text-primary); font-weight: 600;">${rev.author_name}</h4>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${rev.role || 'Verified Customer'}</span>
              </div>
            </div>
            <div class="flex" style="color: #fbbf24; flex-shrink: 0;">
              <i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>
              <i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>
              <i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>
              <i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>
              <i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>
            </div>
          </div>
        </div>
      `;
      reviewsTrack.appendChild(slide);
    });

    // Reinitialize Lucide icons in dynamically loaded elements
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Render Dot Indicators (corresponds to the 3 unique original reviews)
    if (reviewsDots) {
      reviewsDots.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('button');
        dot.className = `review-dot ${i === 0 ? 'bg-cyan' : 'bg-slate-700'}`;
        dot.style.cssText = `width: ${i === 0 ? '16px' : '6px'}; height: 6px; background: ${i === 0 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)'}; border-radius: 999px; cursor: pointer; border: none; padding: 0; transition: all 0.3s ease;`;
        dot.setAttribute('aria-label', `Go to review slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToReview(i);
        });
        reviewsDots.appendChild(dot);
      }
    }

    updateReviewsPosition(false);
    startReviewsAutoplay();
  }

  function updateReviewsPosition(animate = true) {
    if (!reviewsTrack) return;
    
    const slideElements = reviewsTrack.querySelectorAll('.review-slide');
    if (slideElements.length === 0) return;

    const firstSlide = slideElements[0];
    const slideWidth = firstSlide.getBoundingClientRect().width;

    if (!animate) {
      reviewsTrack.style.transition = 'none';
    } else {
      reviewsTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    reviewsTrack.style.transform = `translateX(-${currentReviewIndex * slideWidth}px)`;

    // Update dots based on the active item in localDemoReviews
    if (reviewsDots) {
      const realActiveIndex = ((currentReviewIndex - reviewCloneCount) % 3 + 3) % 3;
      const dots = reviewsDots.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === realActiveIndex) {
          dots[i].style.width = '16px';
          dots[i].style.background = 'var(--accent-cyan)';
        } else {
          dots[i].style.width = '6px';
          dots[i].style.background = 'rgba(255,255,255,0.15)';
        }
      }
    }
  }

  function startReviewsAutoplay() {
    stopReviewsAutoplay();
    reviewsAutoplayTimer = setInterval(() => {
      nextReview();
    }, 3000); // Auto slide every 3 seconds
  }

  function stopReviewsAutoplay() {
    if (reviewsAutoplayTimer) {
      clearInterval(reviewsAutoplayTimer);
      reviewsAutoplayTimer = null;
    }
  }

  function resetReviewsAutoplay() {
    stopReviewsAutoplay();
    startReviewsAutoplay();
  }

  function nextReview() {
    if (isReviewTransitioning) return;
    isReviewTransitioning = true;
    currentReviewIndex++;
    updateReviewsPosition(true);
  }

  function prevReview() {
    if (isReviewTransitioning) return;
    isReviewTransitioning = true;
    currentReviewIndex--;
    updateReviewsPosition(true);
  }

  function goToReview(realIndex) {
    if (isReviewTransitioning) return;
    isReviewTransitioning = true;
    currentReviewIndex = reviewCloneCount + realIndex;
    updateReviewsPosition(true);
    resetReviewsAutoplay();
  }

  // Hook transitionend event to allow seamless jumps
  if (reviewsTrack) {
    reviewsTrack.addEventListener('transitionend', () => {
      isReviewTransitioning = false;
      if (currentReviewIndex >= N_reviews + reviewCloneCount) {
        currentReviewIndex = currentReviewIndex - N_reviews;
        updateReviewsPosition(false);
      } else if (currentReviewIndex < reviewCloneCount) {
        currentReviewIndex = currentReviewIndex + N_reviews;
        updateReviewsPosition(false);
      }
    });
  }

  // Hook navigation buttons
  if (prevReviewBtn) {
    prevReviewBtn.addEventListener('click', () => {
      prevReview();
      resetReviewsAutoplay();
    });
  }

  if (nextReviewBtn) {
    nextReviewBtn.addEventListener('click', () => {
      nextReview();
      resetReviewsAutoplay();
    });
  }

  // Pause on hover
  if (reviewsWrapper) {
    reviewsWrapper.addEventListener('mouseenter', stopReviewsAutoplay);
    reviewsWrapper.addEventListener('mouseleave', startReviewsAutoplay);
  }


  // ==========================================
  // INSTAGRAM CAROUSEL ENGINE
  // ==========================================
  const demoInstagramPosts = [
    { media_url: "/01.png", caption: "Custom Controller Testing #lab #embedded #velocity", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "High-speed differential routing in our multi-layer IoT gateway #altium #pcb", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Calibration of our Sub-GHz RF Wireless Water level controllers #rf #hardware", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Continuous telemetry data logger running tests live #iot #monitoring", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Multi-layer impedance controlled PCB stackup #hardware #engineering", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Thermal imaging analysis of active power regulators #testing #analysis", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Assembling precision SMT prototype boards in-house #prototyping #assembly", permalink: "https://www.instagram.com/velocityi2/" },
    { media_url: "/01.png", caption: "Custom firmware flash & automated hardware test cycle #firmware #coding", permalink: "https://www.instagram.com/velocityi2/" }
  ];

  const N_insta = demoInstagramPosts.length; // 8
  const instaCloneCount = 5; // Max visible cards is 5 on desktop, so we clone 5 to prepend & 5 to append
  let currentInstaIndex = instaCloneCount; // Starts at first real item
  let isInstaTransitioning = false;
  let instaAutoplayTimer = null;

  const instaTrack = document.getElementById('instagram-carousel-track');
  const instaWrapper = document.querySelector('.instagram-carousel-wrapper');

  function renderInstagramCarousel() {
    if (!instaTrack) return;

    instaTrack.innerHTML = '';

    // Create slides: [clones of last 5] + [real 8 items] + [clones of first 5]
    const startClones = demoInstagramPosts.slice(-instaCloneCount);
    const endClones = demoInstagramPosts.slice(0, instaCloneCount);
    const allSlidesData = [...startClones, ...demoInstagramPosts, ...endClones];

    allSlidesData.forEach((post, idx) => {
      const slide = document.createElement('div');
      slide.className = 'insta-carousel-slide';

      slide.innerHTML = `
        <a href="${post.permalink}" target="_blank" class="insta-carousel-card">
          <img src="${post.media_url}" alt="Instagram post" loading="lazy" referrerPolicy="no-referrer" />
          <div class="insta-caption-overlay">
            ${post.caption.length > 55 ? post.caption.slice(0, 52) + '...' : post.caption}
          </div>
        </a>
      `;
      instaTrack.appendChild(slide);
    });

    updateInstaPosition(false);
    startInstaAutoplay();
  }

  function updateInstaPosition(animate = true) {
    if (!instaTrack) return;

    const slideElements = instaTrack.querySelectorAll('.insta-carousel-slide');
    if (slideElements.length === 0) return;

    const firstSlide = slideElements[0];
    const slideWidth = firstSlide.getBoundingClientRect().width;

    if (!animate) {
      instaTrack.style.transition = 'none';
    } else {
      instaTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    instaTrack.style.transform = `translateX(-${currentInstaIndex * slideWidth}px)`;
  }

  function startInstaAutoplay() {
    stopInstaAutoplay();
    instaAutoplayTimer = setInterval(() => {
      nextInstaSlide();
    }, 2500); // Auto slide every 2.5 seconds
  }

  function stopInstaAutoplay() {
    if (instaAutoplayTimer) {
      clearInterval(instaAutoplayTimer);
      instaAutoplayTimer = null;
    }
  }

  function nextInstaSlide() {
    if (isInstaTransitioning) return;
    isInstaTransitioning = true;
    currentInstaIndex++;
    updateInstaPosition(true);
  }

  if (instaTrack) {
    instaTrack.addEventListener('transitionend', () => {
      isInstaTransitioning = false;
      if (currentInstaIndex >= N_insta + instaCloneCount) {
        currentInstaIndex = currentInstaIndex - N_insta;
        updateInstaPosition(false);
      } else if (currentInstaIndex < instaCloneCount) {
        currentInstaIndex = currentInstaIndex + N_insta;
        updateInstaPosition(false);
      }
    });
  }

  if (instaWrapper) {
    instaWrapper.addEventListener('mouseenter', stopInstaAutoplay);
    instaWrapper.addEventListener('mouseleave', startInstaAutoplay);
  }

  // Master Resize event
  window.addEventListener('resize', () => {
    updateReviewsPosition(false);
    updateInstaPosition(false);
  });

  // Load Feeds Controller
  function loadSocialFeeds() {
    renderReviewsCarousel();
    renderInstagramCarousel();
  }

  // Initialize Hub on DOMContentLoaded
  loadSocialFeeds();
});
