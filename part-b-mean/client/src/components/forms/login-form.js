export function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!username || !password) return;

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      await res.json();

      history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (err) {
      console.error(err);
    }
  });
}
