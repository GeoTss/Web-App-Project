import { renderFooter } from '../../components/footer.js';
import { renderContactForm } from '../../components/forms/contact-form.js';

export function renderHome() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-home">
      <section class="hero">
        <h1>Welcome to Clueless Code Learning</h1>
        <p>
          Your go-to platform for mastering the art of doing nothing effectively. Dive into our curated resources and tutorials designed to help you embrace your inner slacker while achieving greatness in procrastination.
        </p>
        <div class="cta">
          <a class="btn btn-primary" data-link href="/login">Get Started</a>
          <a class="btn btn-outline" href="https://www.w3schools.com/" target="_blank">
            Actually Learn
          </a>
        </div>
      </section>

      <section class="highlights">
        ${cardsHTML()}
      </section>

      <article class="about-section">
        <h2>Why Choose Clueless Code Learning?</h2>
        <p>At Clueless Code Learning, we believe in the power of confusion and chaos. Our platform is designed for those who want to learn coding without actually learning anything useful. We've carefully crafted a learning experience that ensures maximum frustration and minimal progress.</p>
        <p>Our team of professional procrastinators has spent countless hours (mostly on social media) creating content that will leave you more confused than when you started. From outdated tutorials to broken code examples, we've got it all. Join thousands of confused students who have chosen mediocrity over excellence.</p>
      </article>

      <div style="display:flex; gap:1.5rem; align-items:flex-start; flex-wrap:wrap; padding:3rem 12vw 4rem;">
        <div style="flex:1 1 420px;">
        <h2 style="font-size:2.25rem; margin:0 0 1rem; color:#0b1330; letter-spacing:-0.02em;">Our Headquarters</h2>
        <iframe 
          title="Our Headquarters Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3133.505327787211!2d21.736331568918526!3d38.24458457833008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135e4971e576c08b%3A0xbf6534858e95f9d!2sDrink%26Go!5e0!3m2!1sen!2sgr!4v1766071726148!5m2!1sen!2sgr"          style="width:100%; height:450px; border:0; border-radius:16px; box-shadow:0 10px 30px rgba(15,23,42,0.06);"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <section class="contact-section">
        <form class="contact-form">
            <h2>Contact Us</h2>
            <p>Have questions? Complaints? Want to tell us how terrible we are? Fill out the form below!</p>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <div class="form-group">
              <button type="submit" id="btn-primary">Send Message</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;

  renderContactForm();
  renderFooter();
}

function cardsHTML() {
  const cards = [
    ['Fast Navigation... You wish', 'Quickly jump between sections with an adaptive menu? We use a confusing maze of links instead. Good luck navigating.'],
    ['Random Content', 'Structured modules, helpful summaries, and interactive elements keep learning engaging. Just kidding! Expect random articles and videos that may or may not relate to your interests.'],
    ['Responsive Design', 'Looks like sh... Looks great on desktops, tablets, and phones. This is an act of rebellion against traditional design principles.'],
    ['Dumb Organization', 'Filter, sort, and bookmark courses the worst way possible so that nothing is searchable.'],
    ['Mental Gymnastics', 'Our courses are designed to challenge your brain... to figure out what the course doesn\'t provide you with. Good luck!'],
    ['Community of Slackers', 'Join a vibrant community of like-minded individuals who excel at doing nothing. Share tips, tricks, and memes about procrastination.'],
    ['Expert Instructors... Sort of???', 'Learn from professionals who have mastered the art of looking busy while achieving nothing. Their expertise lies in avoiding work effectively.'],
    ['Certificate of Mediocrity', 'Receive a certificate that acknowledges your ability to complete courses while doing the bare minimum. Proudly display it as a testament to your commitment to procrastination.'],
    ['24/7 Support... Kinda', 'Our support team is available around the clock to provide vague answers and unhelpful advice whenever you need it. Occasionally we will ignore your queries altogether.'],
    ['Almost Open Source', 'We are borrowing material from various open source projects and tutorials to build our content library. Technically this is not stealing, but, as we call it "creative borrowing".'],
  ];

  return cards.map(
    ([title, text]) => `
      <div class="card">
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    `
  ).join('');
}
