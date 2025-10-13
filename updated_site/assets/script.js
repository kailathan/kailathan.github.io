/*
 * Custom JavaScript for Kai Li's personal website.
 *
 * Handles the dark/light theme toggling and a playful fun‑fact generator.
 */

// Theme toggle logic
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  // Update toggle button label based on current theme
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

// Initialise theme on page load based on saved preference
document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.body.setAttribute('data-theme', storedTheme);
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = storedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  } else {
    // Default to light theme
    document.body.setAttribute('data-theme', 'light');
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