export function renderFooter() {
  if (document.querySelector('footer')) {
    return;
  }
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <p>Made for slackers by slackers. &copy; 2025 Clueless Code Learning</p>
  `;

  document.body.appendChild(footer);
}