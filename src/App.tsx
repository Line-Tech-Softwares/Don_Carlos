import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react'
import { categories, menuItems, type MenuCategory, type MenuItem } from './data/menu'
import { concept, navigation } from './data/restaurant'
import { useLenis } from './hooks/useLenis'

type PhotoProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

function Photo({ src, alt, className = '', eager = false }: PhotoProps) {
  return (
    <div className={`photo ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        onError={(event) => {
          event.currentTarget.remove()
          event.currentTarget.parentElement?.classList.add('photo--missing')
        }}
      />
      <span className="photo-fallback" aria-hidden="true">A little something good</span>
    </div>
  )
}

function Price({ value }: { value: number }) {
  return <span className="demo-price"><span>DEMO PRICE</span> R{value.toFixed(2)}</span>
}

function MenuCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  return (
    <article className={`menu-card${compact ? ' menu-card--compact' : ''}`}>
      <Photo src={item.image} alt={`Demo photograph of ${item.name}`} />
      <div className="menu-card-copy">
        <div className="menu-card-meta">
          <span>{item.category}</span>
          {item.featured && <span className="featured-label"><span aria-hidden="true">✳</span> House favourite</span>}
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <Price value={item.demoPrice} />
      </div>
    </article>
  )
}

export default function App() {
  useLenis()
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const galleryClose = useRef<HTMLButtonElement>(null)
  const galleryTrigger = useRef<HTMLButtonElement | null>(null)
  const galleryDialog = useRef<HTMLDivElement>(null)
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory)
  const gallery = concept.galleryImages

  useEffect(() => {
    if (!mobileOpen) return
    const firstLink = document.querySelector<HTMLAnchorElement>('.mobile-panel a')
    firstLink?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    if (selectedImage === null) {
      galleryTrigger.current?.focus()
      return
    }
    galleryClose.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
      if (event.key === 'ArrowRight') setSelectedImage((current) => current === null ? null : (current + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setSelectedImage((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length)
      if (event.key === 'Tab') {
        const focusable = galleryDialog.current?.querySelectorAll<HTMLElement>('button:not([disabled])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedImage, gallery.length])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const closeMobileMenu = () => {
    setMobileOpen(false)
    menuButton.current?.focus()
  }

  return (
    <>
      {concept.conceptPreview && <div className="preview-ribbon"><span /> Concept preview · Demo menu and imagery</div>}
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Don Carlos, home" onClick={() => setMobileOpen(false)}>
          <span className="wordmark-symbol" aria-hidden="true">DC</span>
          <span>{concept.displayName}<small>MAMELODI WEST</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#menu">Explore menu <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button
          ref={menuButton}
          className="mobile-toggle icon-button"
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >{mobileOpen ? <X /> : <MenuIcon />}</button>
      </header>
      {mobileOpen && <div className="mobile-backdrop" onClick={closeMobileMenu} />}
      <nav id="mobile-navigation" className={`mobile-panel${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
        {navigation.map((item, index) => <a href={item.href} key={item.href} onClick={closeMobileMenu}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={16} /></a>)}
        <a className="mobile-call" href={concept.phoneHref} onClick={closeMobileMenu}><Phone size={16} /> Call Don Carlos</a>
      </nav>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <Photo src={concept.heroImage} alt="Demo photograph of a freshly prepared burger" className="hero-photo" eager />
          <div className="hero-shader" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> MAMELODI WEST · PRETORIA</p>
            <h1 id="hero-heading">GOOD FOOD.<br /><em>GOOD TIMES.</em></h1>
            <p className="hero-description">A little flavour, a lot of feeling. Your next good meal is right around the corner.</p>
            <p className="mock-note">Concept copy · Replace with approved restaurant messaging</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">Explore the menu <ArrowRight size={17} /></a>
              <a className="button button-quiet" href="#visit"><MapPin size={16} /> Find us</a>
            </div>
          </div>
          <div className="hero-bottom"><span>MADE FOR THE MOMENT</span><a href="#menu" aria-label="Scroll to featured menu"><ArrowDown /></a><span>01 / 04</span></div>
          <div className="hero-side-label">GOOD THINGS, MADE FRESH</div>
        </section>

        <section className="welcome-strip" aria-label="Restaurant details">
          <span><MapPin size={15} /> Mamelodi West, Pretoria</span>
          <span className="strip-dot" aria-hidden="true">✳</span>
          <span><Clock3 size={15} /> {concept.hours} <small>· supplied info, please confirm</small></span>
          <span className="strip-dot" aria-hidden="true">✳</span>
          <span>Dine in · Take away <small>· supplied info, please confirm</small></span>
        </section>

        <section className="section menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow"><span /> SOMETHING FOR EVERY APPETITE</p><h2 id="menu-heading">The good stuff<span className="accent-dot">.</span></h2></div>
            <p className="section-aside">A taste of what could be.<br />Every item and price is for demonstration.</p>
          </div>
          <div className="menu-toolbar" data-reveal>
            <div className="filter-list" role="group" aria-label="Filter menu by category">
              {categories.map((category) => <button className={activeCategory === category ? 'filter-button is-active' : 'filter-button'} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <span className="result-count">{filteredItems.length.toString().padStart(2, '0')} ITEMS</span>
          </div>
          {filteredItems.length > 0 ? <div className="menu-grid" aria-live="polite">{filteredItems.map((item) => <MenuCard item={item} key={item.name} />)}</div> : <p className="empty-state">No demo dishes in this category yet.</p>}
          <div className="menu-footnote"><span><Check size={14} /> All prices shown are demo values</span><a className="text-link" href={concept.phoneHref}>Ask about the real menu <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="story-section" id="story" aria-labelledby="story-heading">
          <div className="story-image-wrap" data-reveal><Photo src={concept.aboutImage} alt="Demo photograph of food being prepared over a grill" /><span className="image-stamp">FRESH<br />EVERY DAY</span></div>
          <div className="story-copy" data-reveal><p className="eyebrow"><span /> A PLACE AT THE TABLE</p><h2 id="story-heading">Good food<br />brings us <em>closer.</em></h2><p>This is a placeholder for the Don Carlos story: the people, the flavours and the moments that make this place special. We’ll shape it together with the real details, in the restaurant’s own words.</p><p className="story-footnote">No business history or claims have been assumed for this concept.</p><a className="text-link" href="#visit">Come say hello <ArrowDownRight size={17} /></a></div>
          <span className="story-vertical">A STORY TO BE TOLD</span>
        </section>

        <section className="gallery-section section" id="gallery" aria-labelledby="gallery-heading">
          <div className="section-heading" data-reveal><div><p className="eyebrow"><span /> FIRST, WE EAT WITH OUR EYES</p><h2 id="gallery-heading">A little eye candy<span className="accent-dot">.</span></h2></div><p className="section-aside">Temporary food photography<br />for this concept presentation.</p></div>
          <div className="gallery-grid" data-reveal>{gallery.map((image, index) => <button type="button" className={`gallery-tile gallery-tile-${index + 1}`} key={image.src} onClick={(event) => { galleryTrigger.current = event.currentTarget; setSelectedImage(index) }} aria-label={`Enlarge image: ${image.alt}`}><Photo src={image.src} alt={image.alt} /><span className="gallery-expand"><ArrowUpRight size={18} /></span><span className="gallery-index">0{index + 1}</span></button>)}</div>
          <p className="gallery-disclaimer">All photographs are temporary mock imagery. Client-approved restaurant photography to be added.</p>
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-heading">
          <div className="visit-top"><div data-reveal><p className="eyebrow"><span /> YOUR TABLE IS WAITING</p><h2 id="visit-heading">Find your<br /><em>happy place.</em></h2><p className="visit-intro">We’ve been given these details for the concept. Please confirm everything before the site goes live.</p></div>
            <div className="visit-details" data-reveal>
              <div className="detail-row"><MapPin /><div><span>FIND US</span><p>{concept.address}</p><small>Supplied location · map pin needs confirmation</small><a href={concept.mapHref} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a></div></div>
              <div className="detail-row"><Clock3 /><div><span>WHEN TO VISIT</span><p>{concept.hours}</p><small>Supplied hours · may vary by weekend or event</small></div></div>
              <div className="detail-row"><Phone /><div><span>GIVE US A RING</span><p><a href={concept.phoneHref}>{concept.phoneDisplay}</a></p><small>Number supplied for this concept</small></div></div>
            </div>
          </div>
          <div className="map-panel" data-reveal>
            <iframe title="Map showing the supplied Don Carlos address in Mamelodi West, Pretoria. Location pin must be confirmed." src={`https://www.google.com/maps?q=${encodeURIComponent(concept.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="map-label"><MapPin size={17} /><span>DON CARLOS<small>MAMELODI WEST, PRETORIA · PIN TO CONFIRM</small></span><a href={concept.mapHref} target="_blank" rel="noreferrer" aria-label="Open supplied location in Google Maps"><ArrowUpRight size={17} /></a></div>
          </div>
          <div className="access-note"><Check size={14} /> Dine-in, takeout and accessible entry/parking were supplied as details; please verify with the restaurant.</div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol" aria-hidden="true">DC</span><span>{concept.displayName}<small>MAMELODI WEST</small></span></a><p>Good food.<br />Good times.</p><a className="footer-top" href="#home">BACK TO TOP <ArrowUpRight size={14} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {concept.displayName}. All rights reserved.</span><nav aria-label="Footer navigation">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="social-links"><a href={concept.facebook} target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={12} /></a><a href={concept.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a></div></div>
        <div className="footer-credit"><span>Concept website by <strong>Line Tech Softwares</strong></span><span>FOR PRESENTATION ONLY · NOT A LIVE ORDERING SITE</span></div>
      </footer>

      {selectedImage !== null && <div ref={galleryDialog} className="lightbox" role="dialog" aria-modal="true" aria-label="Food gallery image" onClick={(event) => { if (event.target === event.currentTarget) setSelectedImage(null) }}>
        <button ref={galleryClose} className="lightbox-close icon-button" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image viewer"><X /></button>
        <button className="lightbox-step lightbox-prev" type="button" aria-label="Previous image" onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}>‹</button>
        <Photo src={gallery[selectedImage].src} alt={gallery[selectedImage].alt} />
        <button className="lightbox-step lightbox-next" type="button" aria-label="Next image" onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}>›</button>
        <p>{gallery[selectedImage].alt} <span>{String(selectedImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></p>
      </div>}
    </>
  )
}
