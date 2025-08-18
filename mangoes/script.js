document.addEventListener('DOMContentLoaded', () => {
  const gramsInput = document.getElementById('grams');
  const form = document.getElementById('portion-form');
  const out = document.getElementById('estimates');
  const yearSpan = document.getElementById('year');
  const themeToggle = document.getElementById('theme-toggle');
  const toTopBtn = document.getElementById('to-top');
  const reviewTrack = document.getElementById('review-track');
  const prevBtn = document.getElementById('rev-prev');
  const nextBtn = document.getElementById('rev-next');
  const dotsWrap = document.getElementById('rev-dots');
  yearSpan.textContent = new Date().getFullYear();

  // Base reference: 165 g (1 cup) values
  const base = {
    grams: 165,
    calories: 99,
    carbs: 25,
    fiber: 2.6,
    sugar: 23,
    vitaminC_pct: 67,
    vitaminA_pct: 10,
    folate_pct: 18,
    potassium_pct: 6
  };

  function scale(val) {
    return val * (Number(gramsInput.value || 0) / base.grams);
  }

  function fmt(num, digits = 1) {
    return (Math.round(num * 10 ** digits) / 10 ** digits).toString();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const g = Number(gramsInput.value);
    if (!g || g <= 0) {
      out.textContent = 'Enter a positive number of grams.';
      return;
    }

    const cals = scale(base.calories);
    const carbs = scale(base.carbs);
    const fiber = scale(base.fiber);
    const sugar = scale(base.sugar);

    out.innerHTML = `<strong>Approximate nutrition for ${g} g mango:</strong><br>
      Calories: ${fmt(cals,0)} kcal | Carbs: ${fmt(carbs)} g (Fiber: ${fmt(fiber)} g, Natural sugar: ${fmt(sugar)} g)`;
  });

  // Theme toggle (persist in localStorage)
  const storedTheme = localStorage.getItem('mango-theme');
  if (storedTheme === 'dark') document.body.classList.add('dark');
  updateThemeIcon();
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('mango-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });
  function updateThemeIcon(){
    if(!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }

  // Back to top visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTopBtn?.classList.add('visible'); else toTopBtn?.classList.remove('visible');
  });
  toTopBtn?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Entrance animation for panels
  const panels = document.querySelectorAll('.panel');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  panels.forEach(p => {
    p.classList.add('pre');
    obs.observe(p);
  });

  // Inject minimal CSS for panel animation states (in JS to avoid clutter)
  const style = document.createElement('style');
  style.textContent = `.panel.pre{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.4,0,.2,1),transform .8s cubic-bezier(.4,0,.2,1);} .panel.in{opacity:1;transform:translateY(0);}`;
  document.head.appendChild(style);

  // Reviews carousel
  let index = 0;
  let items = Array.from(reviewTrack?.children || []);
  const total = items.length;
  function buildDots(){
    if(!dotsWrap) return;
    dotsWrap.innerHTML = '';
    items.forEach((_,i)=> {
      const b = document.createElement('button');
      b.type = 'button';
      if(i===index) b.classList.add('active');
      b.addEventListener('click', ()=> { index=i; updateCarousel(true); });
      dotsWrap.appendChild(b);
    });
  }
  function updateCarousel(user){
    if(!reviewTrack) return;
    const width = reviewTrack.clientWidth; // each flex item's basis ~ width
    reviewTrack.style.transform = `translateX(${-index * 100}%)`;
    // update dots
    dotsWrap?.querySelectorAll('button').forEach((b,i)=> b.classList.toggle('active', i===index));
    // reset autoplay if user action
    if(user) { resetAuto(); }
  }
  prevBtn?.addEventListener('click', () => { index = (index - 1 + total) % total; updateCarousel(true); });
  nextBtn?.addEventListener('click', () => { index = (index + 1) % total; updateCarousel(true); });
  buildDots();
  updateCarousel();

  let autoTimer;
  function autoAdvance(){ index = (index + 1) % total; updateCarousel(); }
  function resetAuto(){ clearInterval(autoTimer); autoTimer = setInterval(autoAdvance, 7000); }
  resetAuto();
  reviewTrack?.addEventListener('pointerenter', ()=> clearInterval(autoTimer));
  reviewTrack?.addEventListener('pointerleave', resetAuto);
});
