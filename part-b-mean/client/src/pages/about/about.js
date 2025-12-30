import { renderMenu } from '../../components/menu.js';

export function renderAbout() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-about">
      <section class="hero-section">
        <h1 class="page-title">About Us</h1>
        <p class="hero-text">
          Welcome to Clueless Code Learning! We are dedicated to providing top-notch resources
          and tutorials for those looking to master the art of doing nothing effectively.
        </p>
      </section>

      <section class="content-grid">
        ${articlesData.map(article => `
          <article class="content-card">
            <figure class="card-image">
              <img src="${article.img}" alt="${article.alt}">
            </figure>
            <div class="card-content">
              <h2 class="card-title">${article.title}</h2>
              <p class="card-text">${article.text}</p>
            </div>
          </article>
        `).join('')}
      </section>
    </div>
  `;

  renderFooter();
}

const articlesData = [
  {
    img: 'client/src/pages/about/images/about_image1.png',
    alt: 'Our Mission',
    title: 'Our Mission',
    text: 'At Clueless Code Learning, our mission is to empower individuals with the skills and knowledge needed to excel in the world of slacking off. We believe that everyone, regardless of their background, should have access to quality relaxation. Our goal is to create a supportive community where learners can share their experiences, tips, and tricks for maximizing downtime while minimizing effort.'
  },
  {
    img: 'client/src/pages/about/images/we_are_CCL.jpg',
    alt: 'Our Team',
    title: 'Our Team',
    text: 'Our group consists of a 0.1x engineer, and a horrible penetration tester. Our team is passionate about spreading misinformation and helping others succeed to doing their worst possible. We\'ve collectively spent thousands of hours perfecting our craft of inefficiency and have proudly never met a deadline. With expertise ranging from copy-pasting Stack Overflow answers to breaking production on Fridays, we\'re here to guide you down the path of glorious mediocrity.'
  },
  {
    img: 'client/src/pages/about/images/about_image2.png',
    alt: 'Contact Us',
    title: 'Contact Us',
    text: 'If you have any questions, feedback, or would like to get in touch with us, please don\'t. Seriously, why keep reading when you can crack open a cold one and enjoy life. But if you insist on reaching out, send us a message, and we promise to respond at our own leisurely pace, probably while contemplating the meaning of productivity.'
  },
  {
      img: 'client/src/pages/about/images/about_image3.png',
      alt: 'Our Inspiration',
      title: 'Our Inspiration',
      text: 'We were captivated by the simplicity and the bloatlessness of suckless.org. Its philosophy of minimalism and efficiency inspired us to create a platform that embraces the art of doing less while achieving more.'
  },
  {
      img: 'client/src/pages/about/images/about_image5.png',
      alt: 'It Somehow Works',
      title: 'It Somehow Works',
      text: 'This website may be on the brink of crashing, but its at least fun to watch it work. The HTML, CSS and JavaScript used are all carefully written to be disguisting by using the worst possible coding practices in existence. Instead of wanting to make it look and function properly, we were more concerned about making it funny. But that is the joy of it.'
  },
  {
      img: 'client/src/pages/about/images/about_image6.png',
      alt: 'Security',
      title: "The two S's in Clueless",
      text: 'The two S\'s in Clueless mean Sketchy Security. While 50% of our team consists of cyber security students, we don\'t value security at all. We don\'t mind belonging to a botnet or leaking your information because it simply doesn\'t concern us. Now that i think about it, if only I had pursued my comedy career.'
  },
  {
      img: 'client/src/pages/about/images/about_image4.png',
      alt: 'Join Us',
      title: 'Join Us',
      text: 'Ready to embrace your inner slacker? Join Clueless Code Learning today and start your journey towards mastering the art of doing nothing effectively. Together, we can create a world where laziness is celebrated and productivity is optional.'
  }
];

