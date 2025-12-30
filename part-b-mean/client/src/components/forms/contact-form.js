export function renderContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value;

    console.log('Sending email:', { name, email, subject, message });

    alert('Message successfully sent (not really, but we are pretending it did)!');
    form.reset();
  });
}
