/*
 * Custom JavaScript for Kai Li's personal website.
 *
 * Handles the dark/light theme toggling and a playful fun‑fact generator.
 */

const THEME_STORAGE_KEY = 'theme';
const FONT_STORAGE_KEY = 'font';
const DEFAULT_THEME = 'light';
const DEFAULT_FONT = 'default';
const FONT_PRESETS = new Set(['default', 'grotesk', 'mono', 'tech']);
const LEGACY_FONT_MAP = {
  modern: 'default',
  default: 'default',
  editorial: 'grotesk',
  airy: 'grotesk',
  mono: 'mono',
};

function updateThemeToggleButton(currentTheme) {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  button.textContent = currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function applyFontPreset(preset, options = {}) {
  const { persist = false } = options;
  const mappedPreset = LEGACY_FONT_MAP[preset] || preset;
  const finalPreset = FONT_PRESETS.has(mappedPreset) ? mappedPreset : DEFAULT_FONT;
  document.body.setAttribute('data-font', finalPreset);
  const select = document.getElementById('font-select');
  if (select && select.value !== finalPreset) {
    select.value = finalPreset;
  }
  if (persist) {
    localStorage.setItem(FONT_STORAGE_KEY, finalPreset);
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

  const fontSelect = document.getElementById('font-select');
  if (fontSelect) {
    const storedFont = localStorage.getItem(FONT_STORAGE_KEY);
    const normalisedStoredFont = LEGACY_FONT_MAP[storedFont] || storedFont;
    const initialFont = FONT_PRESETS.has(normalisedStoredFont) ? normalisedStoredFont : DEFAULT_FONT;
    applyFontPreset(initialFont);
    fontSelect.value = initialFont;
    fontSelect.addEventListener('change', (event) => {
      const nextPreset = event.target.value;
      applyFontPreset(nextPreset, { persist: true });
    });
  } else {
    // Ensure default font when no selector is present
    document.body.setAttribute('data-font', DEFAULT_FONT);
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
