/* ==========================================================================
   Velocity Corporate Design System | Main JavaScript Module
   ========================================================================== */

import { products } from './products-data.js';

document.addEventListener('DOMContentLoaded', () => {
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
        submitBtn.innerHTML = '<span class="anim-pulse-glow">Sending project specs...</span>';
        submitBtn.setAttribute('disabled', 'true');
      }

      // Simulate sending data to API proxy
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.removeAttribute('disabled');
        }
        
        // Reveal success feedback
        contactForm.reset();
        successAlert.style.display = 'block';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide feedback after 8 seconds
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 8000);
      }, 1500);
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

  // Slider controls
  const prevReviewBtn = document.getElementById('prev-review-btn');
  const nextReviewBtn = document.getElementById('next-review-btn');
  const reviewsDots = document.getElementById('reviews-dots');
  const reviewsViewport = document.getElementById('google-reviews-viewport');

  let currentReviewIndex = 0;
  let totalReviews = 1;
  let autoplayTimer = null;

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
  // Add, edit, or remove reviews here. The slideshow and navigation dots will update automatically!
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

  const localDemoInstaPosts = [
    {
      media_url: "/public/01.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    },
    {
      media_url: "/public/02.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    },
    {
      media_url: "/public/03.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    },
    {
      media_url: "/public/04.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    },
    {
      media_url: "/public/05.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    },
    {
      media_url: "/public/06.png",
      caption: "",
      permalink: "https://www.instagram.com/velocityi2/"
    }
  ];

  // Load Feeds Controller
  function loadSocialFeeds() {
    renderReviews(localDemoReviews);
    renderInstagramGrid(localDemoInstaPosts);
  }

  // Autoplay functionality for the slideshow
  function startAutoplay() {
    stopAutoplay();
    if (totalReviews > 1) {
      autoplayTimer = setInterval(() => {
        currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
        updateSliderPosition();
      }, 5000); // Transitions to next review every 5 seconds
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Setup hover handlers to pause autoplay when reading
  const reviewsContainer = document.querySelector('.reviews-slider-container');
  if (reviewsContainer) {
    reviewsContainer.addEventListener('mouseenter', stopAutoplay);
    reviewsContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Render Reviews Slider
  function renderReviews(reviewsList) {
    if (!reviewsViewport) return;
    
    totalReviews = reviewsList.length;
    currentReviewIndex = 0;
    
    reviewsViewport.innerHTML = '';
    reviewsList.forEach(rev => {
      const slide = document.createElement('div');
      slide.className = 'review-slide';
      slide.style.cssText = 'width: 100%; max-width: 100%; min-width: 100%; flex-shrink: 0; padding-right: 1.25rem; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;';
      
      const initials = rev.initials || getInitials(rev.author_name);
      // Automatically adjust font size and line height based on character length so it never overflows!
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
        <div class="review-text-container" style="line-height: ${lineHeight}; font-size: ${fontSize};">
          "${rev.text}"
        </div>
        <div class="flex items-center gap-2" style="margin-top: auto; padding-top: 0.5rem; flex-shrink: 0;">
          <div style="width: 40px; height: 40px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--accent-cyan); flex-shrink: 0;">
            ${initials}
          </div>
          <div>
            <h4 style="font-size: 0.95rem; margin: 0; color: var(--text-primary);">${rev.author_name}</h4>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${rev.role}</span>
          </div>
        </div>
      `;
      reviewsViewport.appendChild(slide);
    });

    // Create Navigation Dots
    if (reviewsDots) {
      reviewsDots.innerHTML = '';
      for (let i = 0; i < totalReviews; i++) {
        const dot = document.createElement('div');
        dot.className = `review-dot ${i === 0 ? 'bg-cyan' : 'bg-slate-700'}`;
        dot.style.cssText = `width: ${i === 0 ? '16px' : '6px'}; height: 6px; background: ${i === 0 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)'}; border-radius: 999px; cursor: pointer; transition: all 0.3s ease;`;
        dot.addEventListener('click', () => {
          goToReview(i);
        });
        reviewsDots.appendChild(dot);
      }
    }

    updateSliderPosition();
    startAutoplay(); // Start slideshow autoplay once rendered
  }

  // Go to dynamic slide
  function goToReview(index) {
    currentReviewIndex = index;
    updateSliderPosition();
    resetAutoplay(); // Reset timer on manual selection
  }

  function updateSliderPosition() {
    if (!reviewsViewport) return;
    reviewsViewport.style.transform = `translateX(-${currentReviewIndex * 100}%)`;

    // Update dots style
    if (reviewsDots) {
      const dots = reviewsDots.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === currentReviewIndex) {
          dots[i].style.width = '16px';
          dots[i].style.background = 'var(--accent-cyan)';
        } else {
          dots[i].style.width = '6px';
          dots[i].style.background = 'rgba(255,255,255,0.15)';
        }
      }
    }
  }

  // Click event logic for next / prev button
  if (prevReviewBtn) {
    prevReviewBtn.addEventListener('click', () => {
      currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
      updateSliderPosition();
      resetAutoplay(); // Reset timer on manual selection
    });
  }

  if (nextReviewBtn) {
    nextReviewBtn.addEventListener('click', () => {
      currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
      updateSliderPosition();
      resetAutoplay(); // Reset timer on manual selection
    });
  }

  // Render Instagram Posts
  function renderInstagramGrid(postsList) {
    const gridContainer = document.getElementById('instagram-posts-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    postsList.forEach(post => {
      const postCard = document.createElement('a');
      postCard.href = post.permalink || 'https://instagram.com';
      postCard.target = '_blank';
      postCard.className = 'insta-post-card';
      postCard.style.cssText = 'position: relative; aspect-ratio: 1; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-light); background: rgba(15,23,42,0.1); cursor: pointer; display: block;';
      
      postCard.innerHTML = `
        <img src="${post.media_url}" alt="Instagram post" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);" referrerPolicy="no-referrer" />
        <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); padding: 0.75rem; font-size: 0.75rem; color: #fff; transform: translateY(100%); opacity: 0; transition: all 0.3s ease;" class="insta-caption-overlay">
          ${post.caption.length > 55 ? post.caption.slice(0, 52) + '...' : post.caption}
        </div>
      `;
      gridContainer.appendChild(postCard);
    });
  }

  // Initialize Hub on DOMContentLoaded
  loadSocialFeeds();
});
