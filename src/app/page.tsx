"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const store = "https://www.nailmasterdallas.com";

const categories = [
  {
    name: "Color & Gel",
    eyebrow: "01 / COLOR",
    image: "/images/product-persuasion.png",
    href: `${store}/collections/color-gels`,
    className: "category-card--lilac",
  },
  {
    name: "Equipment",
    eyebrow: "02 / STUDIO",
    image: "/images/product-lamp.jpg",
    href: `${store}/collections/lamps`,
    className: "category-card--blush",
  },
  {
    name: "Nail Art",
    eyebrow: "03 / CREATE",
    image: "/images/product-rose-quartz.png",
    href: `${store}/collections/design`,
    className: "category-card--butter",
  },
  {
    name: "Tools & Bits",
    eyebrow: "04 / PRECISION",
    image: "/images/product-handrest.jpg",
    href: `${store}/collections/professional-nail-tools`,
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

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (query) window.location.href = `${store}/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="announcement">
        <p>Free shipping on continental US orders over $150</p>
        <a href={`${store}/collections/all`}>Explore what&apos;s new <span>↗</span></a>
      </div>

      <header className="site-header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" />
        </button>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#categories">Shop</a>
          <a href={`${store}/collections/all`}>New</a>
          <a href={`${store}/collections/lamps`}>Equipment</a>
        </nav>
        <a className="brand" href={store} aria-label="Nail Master Dallas home">
          <Image src="/images/nmd-logo.png" alt="Nail Master Dallas" width={92} height={92} priority />
        </a>
        <nav className="secondary-nav" aria-label="Resources">
          <a href="#academy">Academy</a>
          <a href={`${store}/pages/about-us`}>Our story</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
          <a className="icon-button desktop-only" aria-label="Account" href={`${store}/account`}><Icon name="user" /></a>
          <a className="icon-button" aria-label="Shopping bag" href={`${store}/cart`}><Icon name="bag" /></a>
        </div>
      </header>

      <section className="hero" id="content">
        <div className="hero-copy reveal">
          <p className="eyebrow">CURATED FOR NAIL ARTISTS</p>
          <h1>Tools for your<br /><em>best work.</em></h1>
          <p className="hero-intro">Professional nail essentials, iconic international brands, and expert education—thoughtfully selected in Dallas.</p>
          <div className="button-row">
            <a className="button button--light" href="#categories">Shop the edit <Icon name="arrow" /></a>
            <a className="text-link" href={`${store}/collections/all`}>View all products</a>
          </div>
        </div>
        <a className="hero-visual" href={`${store}/collections/echo-fall-winter-collection-by-luxio`} aria-label="Shop the Echo collection">
          <Image src="/images/hero-echo.jpg" alt="Echo gel color collection by Akzentz" fill priority sizes="(max-width: 800px) 100vw, 60vw" />
          <span className="hero-tag">NEW / ECHO F·W 26</span>
        </a>
      </section>

      <section className="section categories" id="categories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">START HERE</p>
            <h2>Shop by category</h2>
          </div>
          <p>Everything in its place. Find the right products for every step of your service.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className={`category-card ${category.className}`} href={category.href} key={category.name}>
              <div className="category-card__top"><span>{category.eyebrow}</span><Icon name="arrow" /></div>
              <div className="category-card__image">
                <Image src={category.image} alt="" fill sizes="(max-width: 700px) 85vw, 25vw" />
              </div>
              <h3>{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="section product-section">
        <div className="section-heading section-heading--inline">
          <div><p className="eyebrow">JUST IN</p><h2>New & noteworthy</h2></div>
          <a className="text-link" href={`${store}/collections/all`}>Shop all new arrivals <Icon name="arrow" /></a>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.title}>
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
        <div className="equipment-story__image">
          <Image src="/images/editorial-nails.jpg" alt="Professional nail studio lamp and dust collector" fill sizes="(max-width: 800px) 100vw, 55vw" />
          <span className="image-caption">STUDIO, ELEVATED.</span>
        </div>
        <div className="equipment-story__copy">
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

      <section className="brands" aria-label="Featured brands">
        <p className="eyebrow">PRO BRANDS WE LOVE</p>
        <div className="brand-list">
          <span>AKZENTZ</span><span>KOKOIST</span><span>STALEKS</span><span>SMART PRO</span><span>ULKA</span><span>LUMINARY</span>
        </div>
        <a className="text-link" href={`${store}/collections`}>Discover all brands <Icon name="arrow" /></a>
      </section>

      <section className="academy" id="academy">
        <div className="academy-mark" aria-hidden="true">NMD<span>academy</span></div>
        <div className="academy-copy">
          <p className="eyebrow">LEARN WITH US</p>
          <h2>Technique changes<br />everything.</h2>
          <p>Hands-on education for ambitious nail artists. Learn modern techniques, refine your craft, and grow with a community that gets it.</p>
          <a className="button button--light" href={`${store}/collections/nmd-school-classes`}>Explore NMD Academy <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="service-strip">
        <div><strong>PRO-APPROVED</strong><span>Curated by working nail artists</span></div>
        <div><strong>FAST SHIPPING</strong><span>Fulfilled with care from Dallas</span></div>
        <div><strong>REWARDS</strong><span>Earn points while you shop</span></div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/images/nmd-logo.png" alt="Nail Master Dallas" width={112} height={112} />
            <p>Nailing the best nails.<br />Dallas, Texas.</p>
          </div>
          <div className="footer-column"><p>SHOP</p><a href="#categories">Categories</a><a href={`${store}/collections/all`}>New arrivals</a><a href={`${store}/collections/best-of-the-best`}>Best sellers</a><a href={`${store}/collections/on-sale`}>Sale</a></div>
          <div className="footer-column"><p>LEARN</p><a href={`${store}/collections/nmd-school-classes`}>NMD Academy</a><a href={`${store}/pages/about-us`}>About us</a><a href={`${store}/pages/nmd-rewards`}>Rewards</a><a href={`${store}/blogs/news`}>Journal</a></div>
          <div className="footer-newsletter">
            <p className="eyebrow">STAY IN THE KNOW</p>
            <h3>Fresh drops,<br />straight to your inbox.</h3>
            <form action={`${store}/contact#contact_form`} method="post"><label className="sr-only" htmlFor="email">Email address</label><input id="email" name="contact[email]" type="email" placeholder="Email address" required /><button aria-label="Subscribe"><Icon name="arrow" /></button></form>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Nail Master Dallas</span><div><a href={`${store}/policies/shipping-policy`}>Shipping</a><a href={`${store}/policies/refund-policy`}>Returns</a><a href={`${store}/policies/privacy-policy`}>Privacy</a></div><span>USD / US</span></div>
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
