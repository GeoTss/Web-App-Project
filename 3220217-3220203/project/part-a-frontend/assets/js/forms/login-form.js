const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const userJson = JSON.stringify({
        username,
        password
    });
    const encodedUser = btoa(userJson);
    window.location.href = `/courses.html?user=${encodedUser}`;
});