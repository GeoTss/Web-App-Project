import { initRegisterForm } from '../../components/forms/register-form.js';

export function renderRegister() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-register">
      <div class="help">
        <div class="second-wrap">
          <div class="wrapper" id="register-wrapper">
            <h1>Register</h1>

            <form id="register-form">
              <div><input type="text" id="username" placeholder="Username" required></div>
              <div><input type="email" id="email" placeholder="Email" required></div>
              <div><input type="password" id="password" placeholder="Password" required></div>
              <div><input type="password" id="repeat-password" placeholder="Repeat Password" required></div>

              <div class="password-strength">
                <div id="longer">Is longer than 8 characters ✖</div>
                <div id="uppercase">Has uppercase ✖</div>
                <div id="lowercase">Has lowercase ✖</div>
                <div id="number">Has number ✖</div>
                <div id="special">Has special character ✖</div>
              </div>
            </form>

            <p>
              Already have an account?
              <a href="/login" data-link>Login here</a>
            </p>
          </div>

          <div id="filters-wrapper"></div>
        </div>

        <div id="confirmation-popup">
          <div id="info-list">
            <div id="confirmation-username"></div>
            <div id="confirmation-email"></div>
            <div id="confirmation-password"></div>
            <div id="confirmation-difficulty-filters"></div>
            <div id="confirmation-categories-filters"></div>
          </div>

          <div id="reg-buttons-wrap">
            <button id="btn-go-back" class="submit-btn">Go Back</button>
            <button id="btn-confirm" class="submit-btn">Confirm</button>
          </div>
        </div>

        <button class="submit-btn" id="submit-btn">Submit</button>
      </div>
    </div>
  `;

  initRegisterForm();
}
