/*
 * Custom JavaScript for Kai Li's personal website.
 *
 * Handles the dark/light theme toggling and a playful fun‑fact generator.
 */

const THEME_STORAGE_KEY = 'theme';
const STYLE_STORAGE_KEY = 'style';
const DEFAULT_THEME = 'light';
const DEFAULT_STYLE = 'modern';
const STYLE_PRESETS = new Set(['modern', 'editorial', 'mono', 'airy']);

function updateThemeToggleButton(currentTheme) {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  button.textContent = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function applyStylePreset(preset, options = {}) {
  const { persist = false } = options;
  const finalPreset = STYLE_PRESETS.has(preset) ? preset : DEFAULT_STYLE;
  document.body.setAttribute('data-style', finalPreset);
  const select = document.getElementById('style-select');
  if (select && select.value !== finalPreset) {
    select.value = finalPreset;
  }
  if (persist) {
    localStorage.setItem(STYLE_STORAGE_KEY, finalPreset);
  }
}

// Theme toggle logic
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  // Update toggle button label based on current theme
  updateThemeToggleButton(newTheme);
}

// Initialise theme on page load based on saved preference
document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const initialTheme = storedTheme === 'dark' ? 'dark' : DEFAULT_THEME;
  document.body.setAttribute('data-theme', initialTheme);
  updateThemeToggleButton(initialTheme);

  const storedStyle = localStorage.getItem(STYLE_STORAGE_KEY);
  const initialStyle = STYLE_PRESETS.has(storedStyle) ? storedStyle : DEFAULT_STYLE;
  applyStylePreset(initialStyle);

  const styleSelect = document.getElementById('style-select');
  if (styleSelect) {
    styleSelect.value = initialStyle;
    styleSelect.addEventListener('change', (event) => {
      const nextPreset = event.target.value;
      applyStylePreset(nextPreset, { persist: true });
    });
  }
});

// Fun fact generator
const funFacts = [
  'I built a neural network to predict my coffee consumption during exam season.',
  'When not coding, you can find me exploring Toronto’s best ramen spots.',
  'I love astrophotography and often stay up late capturing the night sky.',
  'I once used reinforcement learning to play piano scales!',
  'Hiking and discovering new trails helps me recharge after a long week in the lab.',
];

function showFunFact() {
  const factElement = document.getElementById('fun-fact');
  if (!factElement) return;
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  factElement.textContent = funFacts[randomIndex];
}
