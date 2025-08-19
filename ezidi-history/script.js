document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple intersection fade-in for panels (respect reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(24px)'; p.style.transition = 'opacity .9s cubic-bezier(.4,0,.2,1), transform .9s cubic-bezier(.4,0,.2,1)'; });
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
});
