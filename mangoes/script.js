document.addEventListener('DOMContentLoaded', () => {
  const gramsInput = document.getElementById('grams');
  const form = document.getElementById('portion-form');
  const out = document.getElementById('estimates');
  const yearSpan = document.getElementById('year');
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
});
