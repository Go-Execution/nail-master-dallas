"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const store = "https://www.nailmasterdallas.com";

const categories = [
  {
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    href: `${store}/collections/accessories`,
    className: "category-card--lilac",
  },
  {
    name: "Brushes",
    image: "/images/categories/brushes.jpg",
    href: `${store}/collections/brushes`,
    className: "category-card--blush",
  },
  {
    name: "Chromes & Powders",
    image: "/images/categories/chromes.jpg",
    href: `${store}/collections/chrome-powders`,
    className: "category-card--butter",
  },
  {
    name: "Design",
    image: "/images/categories/design.jpg",
    href: `${store}/collections/design`,
    className: "category-card--mint",
  },
  {
    name: "Equipment",
    image: "/images/categories/equipment.jpg",
    href: `${store}/collections/lamps`,
    className: "category-card--lilac",
  },
  {
    name: "Professional Nail Tools",
    image: "/images/categories/tools.jpg",
    href: `${store}/collections/professional-nail-tools`,
    className: "category-card--blush",
  },
  {
    name: "Bases",
    image: "/images/categories/bases.png",
    href: `${store}/collections/acrygel-and-fiberglass`,
    className: "category-card--butter",
  },
  {
    name: "Tops",
    image: "/images/categories/tops.png",
    href: `${store}/collections/tops`,
    className: "category-card--mint",
  },
  {
    name: "Color Gels",
    image: "/images/categories/color-gels.png",
    href: `${store}/collections/color-gels`,
    className: "category-card--lilac",
  },
  {
    name: "Magnetic Gels & Cat Eyes",
    image: "/images/categories/magnetic.jpg",
    href: `${store}/collections/cat-eyes-and-magnetic-gels`,
    className: "category-card--blush",
  },
  {
    name: "Stamping",
    image: "/images/categories/stamping.jpg",
    href: `${store}/collections/stamping`,
    className: "category-card--butter",
  },
  {
    name: "Nail Bits",
    image: "/images/categories/nail-bits.jpg",
    href: `${store}/collections/bits`,
    className: "category-card--mint",
  },
  {
    name: "Oils, Liquids & Solutions",
    image: "/images/categories/liquids.jpg",
    href: `${store}/collections/liquids-and-solutions`,
    className: "category-card--lilac",
  },
  {
    name: "Pedicure & Foot Care",
    image: "/images/categories/pedicure.jpg",
    href: `${store}/collections/pedicure-foot-care`,
    className: "category-card--blush",
  },
  {
    name: "Sliders & Stickers",
    image: "/images/categories/stickers.jpg",
    href: `${store}/collections/sliders-and-stickers`,
    className: "category-card--mint",
  },
];

const products = [
  {
    title: "LUXIO® Sterling",
    brand: "AKZENTZ",
    price: "$19.95",
    image: "/images/product-sterling.png",
    href: `${store}/products/luxio®-by-akzentz-sterling-15ml-bottle`,
  },
  {
    title: "LUXIO® Noir",
    brand: "AKZENTZ",
    price: "$19.95",
    image: "/images/product-noir.png",
    href: `${store}/products/luxio®-by-akzentz-noir-15ml-bottle`,
  },
  {
    title: "LUXIO® Persuasion",
    brand: "AKZENTZ",
    price: "$19.95",
    image: "/images/product-persuasion.png",
    href: `${store}/products/luxio®-by-akzentz-persuasion-15ml-bottle`,
  },
  {
    title: "Bottle 'N Go — Rouge Flash",
    brand: "KOKOIST",
    price: "$16.50",
    image: "/images/product-rouge.png",
    href: `${store}/products/kokoist-bottle-n-go-bc-31-rouge-flash`,
  },
];

function Icon({ name }: { name: "search" | "user" | "bag" | "menu" | "arrow" | "close" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    menu: <><path d="M3 7h18M3 17h18" /></>,
    arrow: <><path d="M4 12h16M15 7l5 5-5 5" /></>,
    close: <><path d="m5 5 14 14M19 5 5 19" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const categoryTrack = useRef<HTMLDivElement>(null);
  const categoryDrag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });
  const categoryAutoPaused = useRef(false);
  const categoryResumeTimer = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const track = categoryTrack.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track || reduceMotion) return;

    const interval = window.setInterval(() => {
      if (categoryAutoPaused.current || categoryDrag.current.active || document.hidden) return;

      const firstCard = track.querySelector<HTMLElement>(".category-card");
      if (!firstCard) return;

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const step = firstCard.offsetWidth + gap;
      const end = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft + step >= end - 2 ? 0 : track.scrollLeft + step;
      track.scrollTo({ left: next, behavior: "smooth" });
    }, 3200);

    return () => {
      window.clearInterval(interval);
      if (categoryResumeTimer.current) window.clearTimeout(categoryResumeTimer.current);
    };
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (query) window.location.href = `${store}/search?q=${encodeURIComponent(query)}`;
  }

  function scrollCategories(direction: -1 | 1) {
    const track = categoryTrack.current;
    if (!track) return;
    pauseCategoryAutoSlide();
    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: "smooth" });
  }

  function pauseCategoryAutoSlide(duration = 5000) {
    categoryAutoPaused.current = true;
    if (categoryResumeTimer.current) window.clearTimeout(categoryResumeTimer.current);
    categoryResumeTimer.current = window.setTimeout(() => {
      categoryAutoPaused.current = false;
    }, duration);
  }

  function holdCategoryAutoSlide() {
    categoryAutoPaused.current = true;
    if (categoryResumeTimer.current) window.clearTimeout(categoryResumeTimer.current);
  }

  function resumeCategoryAutoSlide() {
    if (categoryResumeTimer.current) window.clearTimeout(categoryResumeTimer.current);
    categoryAutoPaused.current = false;
  }

  function startCategoryDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const track = categoryTrack.current;
    if (!track) return;
    holdCategoryAutoSlide();
    categoryDrag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  }

  function moveCategoryDrag(event: PointerEvent<HTMLDivElement>) {
    const track = categoryTrack.current;
    const drag = categoryDrag.current;
    if (!track || !drag.active) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    track.scrollLeft = drag.scrollLeft - distance;
  }

  function endCategoryDrag(event: PointerEvent<HTMLDivElement>) {
    const track = categoryTrack.current;
    if (!track || !categoryDrag.current.active) return;
    categoryDrag.current.active = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    pauseCategoryAutoSlide();
  }

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className={`site-header h-auto ${scrolled ? "is-scrolled" : ""}`}>
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#categories">Shop</a>
          <a href={`${store}/collections/all`}>New</a>
          <a href={`${store}/collections/lamps`}>Equipment</a>
          <a href="#academy">Academy</a>
          <a href={`${store}/pages/about-us`}>Our story</a>
        </nav>
        <a className="brand" href={store} aria-label="Nail Master Dallas home">
          <Image src="/images/nmd-logo.png" className="h-auto w-auto" alt="Nail Master Dallas" width={100} height={100} priority />
        </a>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
          <a className="icon-button" aria-label="Account" href={`${store}/account`}><Icon name="user" /></a>
          <a className="icon-button" aria-label="Shopping bag" href={`${store}/cart`}><Icon name="bag" /></a>
        </div>
      </header>

      <div className="announcement">
        <p>Free shipping on orders over $150 <span>Continental US only</span></p>
        <a href={`${store}/collections/all`}>Explore what&apos;s new <span>↗</span></a>
      </div>

      <section className="hero" id="content">
        <div className="hero-copy hero-enter">
          <p className="eyebrow">CURATED FOR NAIL ARTISTS</p>
          <h1>Tools for your<br /><em>best work.</em></h1>
          <p className="hero-intro">Professional nail essentials, iconic international brands, and expert education—thoughtfully selected in Dallas.</p>
          <div className="hero-promo-actions">
            <a className="button button--brand" href={`${store}/collections/echo-fall-winter-collection-by-luxio`}>
              New 2027 ECHO COLLECTION
            </a>
            <a className="button button--brand" href={`${store}/products/smart-pro-new-desk-lamp-for-manicure`}>
              New SMART PRO desk lamp
            </a>
          </div>
        </div>
        <a className="hero-visual hero-enter" href={`${store}/collections/echo-fall-winter-collection-by-luxio`} aria-label="Shop the Echo collection">
          <Image src="/images/hero-echo.jpg" alt="Echo gel color collection by Akzentz" fill priority sizes="(max-width: 800px) 100vw, 60vw" />
          <span className="hero-tag">NEW / ECHO F·W 26</span>
        </a>
      </section>

      <section className="section categories" id="categories">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">START HERE</p>
            <h2>Shop by category</h2>
          </div>
          <div className="category-heading-side">
            <p>Everything in its place. Find the right products for every step of your service.</p>
            <div className="slider-controls" aria-label="Category slider controls">
              <button aria-label="Previous categories" onClick={() => scrollCategories(-1)}>←</button>
              <button aria-label="Next categories" onClick={() => scrollCategories(1)}>→</button>
            </div>
          </div>
        </div>
        <div
          className="category-grid"
          ref={categoryTrack}
          onPointerDown={startCategoryDrag}
          onPointerMove={moveCategoryDrag}
          onPointerUp={endCategoryDrag}
          onPointerCancel={endCategoryDrag}
          onMouseEnter={holdCategoryAutoSlide}
          onMouseLeave={resumeCategoryAutoSlide}
          onFocusCapture={holdCategoryAutoSlide}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) resumeCategoryAutoSlide();
          }}
          onTouchStart={() => pauseCategoryAutoSlide()}
          onClickCapture={(event) => {
            if (categoryDrag.current.moved) {
              event.preventDefault();
              event.stopPropagation();
              categoryDrag.current.moved = false;
            }
          }}
        >
          {categories.map((category, index) => (
            <a
              className={`category-card ${category.className}`}
              href={category.href}
              key={category.name}
              data-reveal
              style={{ "--delay": `${(index % 4) * 70}ms` } as CSSProperties}
            >
              <div className="category-card__top"><span>{String(index + 1).padStart(2, "0")} / CATEGORY</span><Icon name="arrow" /></div>
              <div className="category-card__image">
                <Image src={category.image} alt="" fill sizes="(max-width: 700px) 85vw, 25vw" />
              </div>
              <h3>{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="section product-section">
        <div className="section-heading section-heading--inline" data-reveal>
          <div><p className="eyebrow">JUST IN</p><h2>New & noteworthy</h2></div>
          <a className="text-link" href={`${store}/collections/all`}>Shop all new arrivals <Icon name="arrow" /></a>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className="product-card"
              key={product.title}
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <a className="product-card__image" href={product.href}>
                {index < 2 && <span className="pill">NEW</span>}
                <Image src={product.image} alt={product.title} fill sizes="(max-width: 700px) 50vw, 25vw" />
                <span className="quick-view">View product</span>
              </a>
              <a className="product-card__meta" href={product.href}>
                <div><p>{product.brand}</p><h3>{product.title}</h3></div><strong>{product.price}</strong>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="equipment-story">
        <div className="equipment-story__image" data-reveal>
          <Image src="/images/editorial-nails.jpg" alt="Professional nail studio lamp and dust collector" fill sizes="(max-width: 800px) 100vw, 55vw" />
          <span className="image-caption">STUDIO, ELEVATED.</span>
        </div>
        <div className="equipment-story__copy" data-reveal>
          <p className="eyebrow">THE PRO EDIT</p>
          <h2>Build a studio<br />that works <em>beautifully.</em></h2>
          <p>Reliable lighting, powerful dust collection, and ergonomic essentials. Professional equipment chosen to make long days feel lighter.</p>
          <ul>
            <li><span>01</span> Smart lighting</li>
            <li><span>02</span> Dust collection</li>
            <li><span>03</span> E-files & handpieces</li>
          </ul>
          <a className="button button--dark" href={`${store}/collections/lamps`}>Shop equipment <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="brands" aria-label="Featured brands" data-reveal>
        <p className="eyebrow">PRO BRANDS WE LOVE</p>
        <div className="brand-list">
          <span>AKZENTZ</span><span>KOKOIST</span><span>STALEKS</span><span>SMART PRO</span><span>ULKA</span><span>LUMINARY</span>
        </div>
        <a className="text-link" href={`${store}/collections`}>Discover all brands <Icon name="arrow" /></a>
      </section>

      <section className="academy" id="academy">
        <div className="academy-mark" aria-hidden="true" data-reveal>NMD<span>academy</span></div>
        <div className="academy-copy" data-reveal>
          <p className="eyebrow">LEARN WITH US</p>
          <h2>Technique changes<br />everything.</h2>
          <p>Hands-on education for ambitious nail artists. Learn modern techniques, refine your craft, and grow with a community that gets it.</p>
          <a className="button button--light" href={`${store}/collections/nmd-school-classes`}>Explore NMD Academy <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="service-strip">
        <div data-reveal style={{ "--delay": "0ms" } as CSSProperties}><strong>PRO-APPROVED</strong><span>Curated by working nail artists</span></div>
        <div data-reveal style={{ "--delay": "90ms" } as CSSProperties}><strong>FAST SHIPPING</strong><span>Fulfilled with care from Dallas</span></div>
        <div data-reveal style={{ "--delay": "180ms" } as CSSProperties}><strong>REWARDS</strong><span>Earn points while you shop</span></div>
      </section>

      <footer>
        <div className="footer-review" data-reveal>
          <strong>Judge.me</strong><span>CERTIFIED</span><i />
          <b>4.8 ★★★★★</b><span>864 reviews</span>
        </div>
        <nav className="footer-policy-feature" aria-label="Featured store policies" data-reveal>
          <a href={`${store}/policies/shipping-policy`}>Shipping policy</a>
          <span>—</span>
          <a href={`${store}/policies/refund-policy`}>Return/refund policy</a>
          <a className="footer-search-link" href={`${store}/search`}>Search</a>
        </nav>
        <div className="footer-main" data-reveal>
          <div className="footer-newsletter">
            <h3>Subscribe to our emails</h3>
            <form action={`${store}/contact#contact_form`} method="post"><label className="sr-only" htmlFor="email">Email address</label><input id="email" name="contact[email]" type="email" placeholder="Email" required /><button aria-label="Subscribe"><Icon name="arrow" /></button></form>
          </div>
          <div className="footer-socials">
            <a className="shop-follow" href={store} aria-label="Follow Nail Master Dallas on Shop"><span>♡</span> Follow on <strong>shop</strong></a>
            <a className="instagram-link" href="https://www.instagram.com/nailmasterdallas/" aria-label="Nail Master Dallas on Instagram">◎</a>
          </div>
        </div>
        <div className="footer-commerce">
          <div className="footer-country"><span>Country/region</span><a href={store}>United States | USD $ <b>⌄</b></a></div>
          <div className="payment-methods" aria-label="Accepted payment methods">
            {['amazon', 'AMEX', 'Apple Pay', 'Diners', 'Discover', 'G Pay', 'Mastercard', 'PayPal', 'shop', 'VISA'].map((method) => <span key={method}>{method}</span>)}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026, <a href={store}>NailMasterDallas.Com</a> <a href="https://www.shopify.com/">Powered by Shopify</a></span>
          <div><a href={`${store}/policies/refund-policy`}>Refund policy</a><a href={`${store}/policies/privacy-policy`}>Privacy policy</a><a href={`${store}/policies/terms-of-service`}>Terms of service</a><a href={`${store}/policies/shipping-policy`}>Shipping policy</a><a href={`${store}/policies/contact-information`}>Contact information</a></div>
        </div>
      </footer>

      <div className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="icon-button drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button>
        <Image src="/images/nmd-logo.png" alt="" width={84} height={84} />
        <nav><a href="#categories" onClick={() => setMenuOpen(false)}>Shop</a><a href={`${store}/collections/all`}>New arrivals</a><a href={`${store}/collections/lamps`}>Equipment</a><a href="#academy" onClick={() => setMenuOpen(false)}>Academy</a><a href={`${store}/pages/about-us`}>Our story</a></nav>
      </div>
      {(menuOpen || searchOpen) && <button className="backdrop" aria-label="Close overlay" onClick={() => { setMenuOpen(false); setSearchOpen(false); }} />}
      <div className={`search-panel ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}><Icon name="close" /></button>
        <p className="eyebrow">WHAT ARE YOU LOOKING FOR?</p>
        <form onSubmit={submitSearch}><input autoFocus={searchOpen} name="q" placeholder="Search products, brands..." aria-label="Search products" /><button aria-label="Submit search"><Icon name="arrow" /></button></form>
        <div><span>Popular:</span><a href={`${store}/search?q=gel`}>Gel</a><a href={`${store}/search?q=bits`}>Bits</a><a href={`${store}/search?q=lamps`}>Lamps</a></div>
      </div>
    </main>
  );
}
