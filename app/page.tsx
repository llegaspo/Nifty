import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Creative systems that convert | Get Nifty",
  description:
    "Generative Content, smart web systems, and marketing support that turn perception into profit.",
  alternates: {
    canonical: "https://getnifty.xyz/",
  },
  openGraph: {
    type: "website",
    url: "https://getnifty.xyz/",
    title: "Creative systems that convert",
    description:
      "Generative Content, smart web systems, and marketing support that turn perception into profit.",
    images: [
      {
        url: "https://getnifty.xyz/og-image.png",
      },
    ],
    siteName: "Get Nifty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative systems that convert",
    description:
      "Generative Content, smart web systems, and marketing support that turn perception into profit.",
    images: ["https://getnifty.xyz/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<a class="skip-link" href="#get-nifty">Skip to Get Nifty</a>

  <!-- Play Button Follower -->
  <div id="play-follower" class="cursor-follower">
    <svg class="play-icon" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
    <svg class="pause-icon" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  </div>

  <!-- SECTION 1: HERO VIDEO -->
  <section class="hero-scrub" aria-label="Hero video">
    <div class="hero-sticky">
      <video class="hero-video" preload="auto" muted playsinline webkit-playsinline
        poster="assets/images/posters/hero.jpg">
        <source media="(max-width: 768px)" src="assets/videos/hero_mobile.mp4" type="video/mp4" />
        <source src="assets/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div class="hero-overlay">
        <div class="hero-text-sequence">
          <h1 class="hero-brand">Get Nifty</h1>
          <div class="scroll-indicator" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
          <h2 class="hero-title-line-1">If you are not proud of your brand</h2>
          <h2 class="hero-title-line-2">They will not desire it</h2>
          <h2 class="hero-title-line-3">Turn perception into profit</h2>
          <h2 class="hero-title-line-4">Time to level up</h2>
        </div>
      </div>

      <div class="hero-gradient" aria-hidden="true"></div>
    </div>
  </section>

  <!-- SECTION 2: GET NIFTY LANDING -->
  <main id="get-nifty" class="landing">
    <header class="landing-header">
      <a href="/" class="logo" aria-label="Get Nifty Home">
        <span class="logo-mark" aria-hidden="true"></span>
        <span class="logo-text">Get Nifty</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false"
        aria-controls="primary-nav">
        <span class="menu-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <nav id="primary-nav" class="nav" aria-label="Primary">
        <a href="#portfolio">Our Work</a>
        <a href="#what-we-do">What We Do</a>
        <a href="#how">How It Works</a>
        <a href="/get-started">Get started</a>
      </nav>
    </header>



    <section id="what-we-do" class="what-we-do">
      <div class="what-we-do-text">
        <h2 class="section-title" style="margin-bottom: 24px;">What We Do</h2>
        <p class="section-description">We build the systems that define your brand online. A <strong>Brand
            Showroom</strong> to organize your assets, a <strong>Landing Page</strong> to tell your story, and
          <strong>Generative Content</strong> to keep you relevant. Available as a full system or individual services.
        </p>
        <div class="cta-row" style="margin-top: 24px;">
          <a class="btn btn-primary" href="/get-started">Bring My Brand to Life</a>
          <a class="btn btn-ghost" href="https://wa.me/17874685579" target="_blank">Contact Us</a>
        </div>
      </div>
      <div class="brand-hub-preview">
        <video src="assets/videos/portfolio/Brandhub.mp4" loop playsinline
          poster="assets/images/posters/Brandhub.jpg"></video>
        <div class="video-indicator">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </section>

    <!-- PORTFOLIO SECTION -->
    <section id="portfolio" class="portfolio-section">
      <div class="portfolio-container">
        <h2 class="section-title">Generative Content</h2>
        <p class="section-description">Graphics and video content built to grab and hold attention.
        </p>

      </div> <!-- End Container -->

      <div class="portfolio-carousel-wrapper">
        <div class="portfolio-carousel">
          <!-- Video 1 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-1.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-1.jpg"></video>
          </article>
          <!-- Video 2 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-2.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-2.jpg"></video>
          </article>
          <!-- Video 3 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-3.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-3.jpg"></video>
          </article>
          <!-- Video 4 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-4.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-4.jpg"></video>
          </article>
          <!-- Video 5 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-5.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-5.jpg"></video>
          </article>
          <!-- Video 6 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-6.mp4" muted loop playsinline
              preload="metadata"></video>
          </article>
          <!-- Video 7 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-7.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-7.jpg"></video>
          </article>
          <!-- Video 8 -->
          <article class="portfolio-item">
            <video class="portfolio-video" src="assets/videos/portfolio/portfolio-8.mp4" muted loop playsinline
              preload="metadata" poster="assets/images/posters/portfolio-8.jpg"></video>
          </article>
        </div>
      </div>

      <div class="portfolio-container">
        <div class="carousel-nav">
          <button class="nav-btn prev" aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="nav-btn next" aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>



    <section class="services">
      <div class="services-header">
        <h2 class="section-title">Complete Brand System</h2>
        <p class="section-description">Content, web, and marketing systems built to keep you relevant.</p>
      </div>

      <div class="services-grid">
        <div class="service-card">
          <div class="service-title">Brand Showroom</div>
          <p class="service-desc">A central hub for your brand assets, messaging, and guidelines. Share it internally or
            with partners.</p>
        </div>
        <div class="service-card">
          <div class="service-title">Landing Page</div>
          <p class="service-desc">A high-converting page that tells your story and captures leads.</p>
        </div>
        <div class="service-card">
          <div class="service-title">Generative Content</div>
          <p class="service-desc">Social content and visuals that keep your brand top of mind.</p>
        </div>
      </div>
    </section>


    <!-- HOW IT WORKS SECTION -->
    <section id="how" class="process">
      <div class="process-header">
        <h2 class="section-title">How It Works</h2>
        <p class="section-description">We match your offer to a story your audience will remember.</p>
      </div>
      <ol class="process-steps">
        <li>
          <h3>Discover</h3>
          <p>We get clear on audience, offer, and desired perception.</p>
        </li>
        <li>
          <h3>Design the Story</h3>
          <p>Map the narrative into motion.</p>
        </li>
        <li>
          <h3>Build It</h3>
          <p>Website experience plus social content.</p>
        </li>
        <li>
          <h3>Launch and Evolve</h3>
          <p>Track what works and scale the wins.</p>
        </li>
      </ol>
    </section>

    <section id="why" class="why">
      <h2 class="section-title">Why It Matters</h2>
      <p class="section-description">When your website, social content, and internal assets all tell the same story, you
        build unstoppable momentum. We replace scattered files and disconnected visuals with a single, premium creative
        system.</p>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section id="testimonials" class="testimonials">
      <div class="testimonials-container">
        <h2 class="section-title">Kind Words</h2>
        <p class="section-description">What our clients say about the Nifty experience.</p>
        <div id="card-stack" class="card-stack"></div>
      </div>
    </section>

    <!-- FAQ SECTION -->


    <section id="final-cta" class="final-cta">
      <h2 class="cta-title">Get started</h2>
      <div class="cta-row">
        <a class="btn btn-primary" href="/get-started">Bring It to Life</a>
        <a class="btn btn-ghost" href="https://wa.me/17874685579" target="_blank">Contact Us</a>
      </div>
    </section>

    <footer class="footer">
      <p><span class="logo-text">Get Nifty</span> &copy; 2026 All rights reserved</p>
      <a class="to-top" href="#">Back to top</a>
    </footer>
  </main>

  <div class="cursor-spotlight" aria-hidden="true"></div>

  <!-- Include GSAP --><!-- WhatsApp Chat Widget -->
  <div class="whatsapp-widget" id="whatsapp-widget">
    <a class="whatsapp-bubble" id="whatsapp-bubble" href="https://wa.me/17874685579" target="_blank">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
    <div class="whatsapp-popup" id="whatsapp-popup">
      <div class="whatsapp-popup-close" id="whatsapp-close">×</div>
      <a href="https://wa.me/17874685579" target="_blank" class="whatsapp-message">
        <span class="wave-emoji">👋</span> Chat on WhatsApp
      </a>
    </div>
  </div>`,
        }}
      />

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/script.js" strategy="afterInteractive" />
      <Script src="/testimonials.js" strategy="afterInteractive" />
    </>
  );
}
