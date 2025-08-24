document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple intersection fade-in for panels (respect reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => { 
      p.style.opacity = '0'; 
      p.style.transform = 'translateY(24px)'; 
      p.style.transition = 'opacity .9s cubic-bezier(.4,0,.2,1), transform .9s cubic-bezier(.4,0,.2,1)'; 
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    panels.forEach(p => io.observe(p));
  }

  // Timeline interactive logic
  const track = document.getElementById('timeline-track');
  const detail = document.getElementById('timeline-detail');
  const title = document.getElementById('timeline-title');
  const content = document.getElementById('timeline-content');
  
  function activateEvent(btn) {
    if (!btn || !title || !content) return;
    title.textContent = btn.getAttribute('data-title') || 'Historical Period';
    content.textContent = btn.getAttribute('data-body') || 'Information about this period.';
  }
  
  if (track) {
    track.addEventListener('click', e => {
      const btn = e.target.closest('.t-event');
      if (btn) {
        track.querySelectorAll('.t-event').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activateEvent(btn);
      }
    });
  }

  // Initialize timeline active state
  const firstEvent = track?.querySelector('.t-event');
  if (firstEvent) { 
    firstEvent.classList.add('active'); 
    activateEvent(firstEvent);
  }

  // Story pagination (top nav based)
  const pages = Array.from(document.querySelectorAll('.story-page'));
  const navLinks = Array.from(document.querySelectorAll('nav a[data-page-link]'));
  const topProgressBar = document.getElementById('top-progress-bar');
  let storyIndex = 0;
  
  function setProgress(idx) {
    if (!topProgressBar) return;
    const pct = ((idx) / (pages.length - 1)) * 100;
    topProgressBar.style.width = pct + '%';
  }
  
  function showPage(idx) {
    if (idx < 0 || idx >= pages.length || idx === storyIndex) return;
    const current = pages[storyIndex];
    const next = pages[idx];
    const forward = idx > storyIndex;
    current.classList.remove('active');
    current.classList.add(forward ? 'exit-left' : 'exit-right');
    setTimeout(() => { 
      current.classList.remove('exit-left', 'exit-right'); 
      current.style.display = 'none'; 
    }, 700);
    next.style.display = '';
    requestAnimationFrame(() => next.classList.add('active'));
    storyIndex = idx;
    document.body.setAttribute('data-story-index', String(storyIndex));
    navLinks.forEach(a => a.classList.toggle('active', Number(a.dataset.pageLink) === storyIndex));
    setProgress(storyIndex);
  }
  
  // Initialize pages
  pages.forEach((p, i) => { 
    if (i !== 0) { 
      p.style.display = 'none'; 
    } else { 
      p.classList.add('active'); 
    } 
  });
  
  navLinks.forEach(a => {
    const pageIdx = Number(a.dataset.pageLink);
    if (!isNaN(pageIdx)) {
      a.addEventListener('click', e => {
        e.preventDefault();
        showPage(pageIdx);
      });
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      showPage(storyIndex - 1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      showPage(storyIndex + 1);
    }
  });

  // Touch/swipe navigation
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });
  
  document.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 80) {
      if (dx < 0) showPage(storyIndex + 1);
      else showPage(storyIndex - 1);
    }
  }, { passive: true });

  // Hero slideshow with Soviet theme
  const heroSlides = Array.from(document.querySelectorAll('#hero-slides [data-hero-slide]'));
  if (heroSlides.length) {
    let hsIndex = 0;
    function showHero(i) {
      heroSlides.forEach((img, idx) => img.classList.toggle('active', idx === i));
    }
    showHero(0);
    // Soviet-themed slideshow timing (slightly slower for grandeur)
    setInterval(() => {
      hsIndex = (hsIndex + 1) % heroSlides.length;
      showHero(hsIndex);
    }, 12000);
  }

  // Soviet-themed easter egg: Add subtle parade march sound on interaction
  let marchingSoundPlayed = false;
  document.addEventListener('click', () => {
    if (!marchingSoundPlayed) {
      // Add subtle visual feedback for clicks
      document.body.style.setProperty('--click-feedback', 'scale(0.998)');
      setTimeout(() => {
        document.body.style.removeProperty('--click-feedback');
      }, 100);
      marchingSoundPlayed = true;
    }
  });

  // Initialize progress bar
  setProgress(storyIndex);
});