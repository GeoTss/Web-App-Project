export function initAbout() {
    const aboutContainer = document.querySelector('.about-container');
    
    if (!aboutContainer) {
        return;
    }
    
    aboutContainer.innerHTML = `
        <section class="hero-section">
            <h1 class="page-title">About Us</h1>
            <p class="hero-text">Welcome to Clueless Code Learning! We are dedicated to providing top-notch resources and tutorials for those looking to master the art of doing nothing effectively. Our platform is designed for individuals who want to embrace their inner slacker while still achieving greatness in the realm of procrastination.</p>
        </section>
        
        <section class="content-grid">
            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image1.png" alt="Our Mission">
                </figure>
                <div class="card-content">   
                    <h2 class="card-title">Our Mission</h2>    
                    <p class="card-text">At Clueless Code Learning, our mission is to empower individuals with the skills and knowledge needed to excel in the world of slacking off.  We believe that everyone, regardless of their background, should have access to quality relaxation. Our goal is to create a supportive community where learners can share their experiences, tips, and tricks for maximizing downtime while minimizing effort.</p>
                </div>
            </article>
            
            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/we_are_CCL.jpg" alt="Our Team">
                </figure>
                <div class="card-content">
                    <h2 class="card-title">Our Team</h2>
                    <p class="card-text">
                        Our group consists of a 0.1x engineer, and a horrible penetration tester. Our team is passionate about spreading misinformation and helping others succeed to doing their worst possible. We've collectively spent thousands of hours perfecting our craft of inefficiency and have proudly never met a deadline. With expertise ranging from copy-pasting Stack Overflow answers to breaking production on Fridays, we're here to guide you down the path of glorious mediocrity.
                    </p>
                </div>
            </article>
            
            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image2.png" alt="Contact Us">
                </figure>
                <div class="card-content">
                    <h2 class="card-title">Contact Us</h2>
                    <p class="card-text">If you have any questions, feedback, or would like to get in touch with us, please don't. Seriously, why keep reading when you can crack open a cold one and enjoy life. But if you insist on reaching out, send us a message, and we promise to respond at our own leisurely pace, probably while contemplating the meaning of productivity.</p>
                </div>
            </article>

            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image3.png" alt="Our Inspiration">
                </figure>
                <div class="card-content">   
                    <h2 class="card-title">Our Inspiration</h2>    
                    <p class="card-text">We were captivated by the simplicity and the bloatlessness of suckless.org. Its philosophy of minimalism and efficiency inspired us to create a platform that embraces the art of doing less while achieving more.</p>
                </div>
            </article>

            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image5.png" alt="It Somehow Works">
                </figure>
                <div class="card-content">   
                    <h2 class="card-title">It Somehow Works</h2>    
                    <p class="card-text">This website may be on the brink of crashing, but its at least fun to watch it work. The HTML, CSS and JavaScript used are all carefully written to be disguisting by using the worst possible coding practices in existence. Instead of wanting to make it look and function properly, we were more concerned about making it funny. But that is the joy of it.</p>
                </div>
            </article>

            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image6.png" alt="Security">
                </figure>
                <div class="card-content">   
                    <h2 class="card-title">The two S's in Clueless</h2>    
                    <p class="card-text">The two S's in Clueless mean Sketchy Security. While 50% of our team consists of cyber security students, we don't value security at all. We don't mind belonging to a botnet or leaking your information because it simply doesn't concern us. Now that i think about it, if only I had pursued my comedy career.</p>
                </div>
            </article>
            
            <article class="content-card">
                <figure class="card-image">
                    <img src="./assets/img/about/about_image4.png" alt="Join Us">
                </figure>
                <div class="card-content">
                    <h2 class="card-title">Join Us</h2>
                    <p class="card-text">Ready to embrace your inner slacker? Join Clueless Code Learning today and start your journey towards mastering the art of doing nothing effectively. Together, we can create a world where laziness is celebrated and productivity is optional.</p>
                </div>
            </article>
        </section>
    `;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAbout);
} else {
    initAbout();
}