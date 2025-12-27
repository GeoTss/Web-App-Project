const form = document.getElementById('login-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        // redirect the user to /api/users/profile
        // if (res.ok) {
        //     window.location.href = '/profile';
        // } else {
        //     alert(data.message || 'Login failed');
        // }
    } catch (err) {
        console.error('Error during login:', err);
    }
});