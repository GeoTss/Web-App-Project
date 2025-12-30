import { initLoginForm } from '../../components/forms/login-form.js';

export function renderLogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-login">
        <div class="help">
            <div class="wrapper" id="login-wrapper">
                <form id="login-form">
                    <h1>Login</h1>
                    <div>
                        <input type="text" id="username" placeholder="Username" required />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Password" required />
                    </div>
                    <button id="loginButton" type="submit">Submit</button>
                </form>     
                <a href="/register" data-link>Register here</a>
            </div>  
        </div>
    </div>
  `;

  initLoginForm();

}
