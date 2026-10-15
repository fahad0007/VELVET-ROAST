import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Clock3, Coffee, Instagram, MapPin, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import './styles.css';

const menuItems = [
  { id: 1, category: 'Breakfast', name: 'Whipped Ricotta Toast', description: 'Sourdough, honey, seasonal berries, lemon zest', price: 285, image: 'photo-1525351484163-7529414344d8', tag: 'Guest favorite' },
  { id: 2, category: 'Breakfast', name: 'Garden Breakfast Plate', description: 'Farm eggs, avocado, greens, herbed labneh', price: 360, image: 'photo-1490645935967-10de6ba17061', tag: 'Fresh daily' },
  { id: 3, category: 'Coffee', name: 'Velvet Flat White', description: 'Double espresso, silky steamed milk', price: 180, image: 'photo-1461023058943-07fcbe16d735', tag: 'House blend' },
  { id: 4, category: 'Coffee', name: 'Iced Maple Latte', description: 'Cold espresso, oat milk, a touch of maple', price: 220, image: 'photo-1461023058943-07fcbe16d735', tag: 'Best seller' },
  { id: 5, category: 'Lunch', name: 'Roasted Pumpkin Bowl', description: 'Grains, charred pumpkin, greens, tahini dressing', price: 340, image: 'photo-1512621776951-a57141f2eefd', tag: 'Plant-forward' },
  { id: 6, category: 'Lunch', name: 'Wild Mushroom Pasta', description: 'Tagliatelle, forest mushrooms, parmesan, thyme', price: 420, image: 'photo-1473093295043-cdd812d0e601', tag: 'Chef’s pick' },
];
const photo = (id, w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

function App() {
  const [active, setActive] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [booking, setBooking] = useState({ name: '', date: '', time: '10:00 AM', guests: '2 guests' });
  const categories = ['All', 'Breakfast', 'Coffee', 'Lunch'];
  const visible = active === 'All' ? menuItems : menuItems.filter(item => item.category === active);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const add = item => setCart(old => {
    const found = old.find(x => x.id === item.id);
    return found ? old.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...item, qty: 1 }];
  });
  const changeQty = (id, diff) => setCart(old => old.map(x => x.id === id ? { ...x, qty: x.qty + diff } : x).filter(x => x.qty > 0));
  const closeMobile = () => setMobileOpen(false);

  return <div className="site-shell">
    <div className="announcement"><Sparkles size={13} /> GOOD COFFEE. SLOW MORNINGS. ALWAYS A TABLE FOR YOU.</div>
    <header className="header">
      <a href="#home" className="brand" onClick={closeMobile}><span className="brand-mark">V<span>&</span>R</span><span className="brand-name">VELVET <i>&</i> ROAST<small>CAFE · KITCHEN · COMPANY</small></span></a>
      <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
      <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
        <a href="#story" onClick={closeMobile}>Our story</a><a href="#menu" onClick={closeMobile}>Menu</a><a href="#space" onClick={closeMobile}>The space</a><a href="#visit" onClick={closeMobile}>Find us</a>
      </nav>
      <div className="header-actions"><a href="#visit" className="book-link">Book a table <ArrowUpRight size={15}/></a><button className="bag-button" aria-label="Open order basket" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>{count}</span></button></div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"></span> YOUR NEIGHBORHOOD HIDEAWAY</div>
          <h1>A little pause.<br/>A lot of <em>flavour.</em></h1>
          <p className="hero-text">Thoughtful plates, beautifully pulled coffee, and the kind of place where one more hour just happens.</p>
          <div className="hero-buttons"><a className="button button-dark" href="#menu">Explore the menu <ArrowRight size={16}/></a><a className="text-link" href="#story">Get to know us <ArrowDownRight size={17}/></a></div>
          <div className="hero-foot"><div className="avatar-stack"><span>J</span><span>A</span><span>M</span><span>+</span></div><div><strong>Made for your everyday</strong><small>Loved by our little community</small></div><div className="hero-rating"><span>★★★★★</span><small>4.9 / 5</small></div></div>
        </div>
        <div className="hero-visual">
          <img className="hero-image" src={photo('photo-1495474472287-4d71bcdd2085', 1400)} alt="Warm coffee and cafe table" />
          <div className="image-label"><span className="label-icon"><Coffee size={19}/></span><div><strong>Slow brewed,</strong><small>never rushed.</small></div></div>
          <div className="vertical-note">EST. 2018&nbsp; · &nbsp;MADE WITH HEART</div>
          <div className="hero-sticker"><span>GOOD<br/>THINGS<br/><em>TAKE TIME</em></span><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circlePath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"/></defs><text><textPath href="#circlePath">BREWED WITH LOVE · BREWED WITH LOVE · </textPath></text></svg></div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line"></span><span>03</span></div>
      </section>

      <section className="ticker" aria-label="Our values"><div className="ticker-track"><span>SEASONAL INGREDIENTS</span><b>✳</b><span>SMALL-BATCH COFFEE</span><b>✳</b><span>MADE FROM SCRATCH</span><b>✳</b><span>GOOD COMPANY</span><b>✳</b><span>SEASONAL INGREDIENTS</span><b>✳</b><span>SMALL-BATCH COFFEE</span><b>✳</b></div></section>

      <section className="story section-pad" id="story">
        <div className="section-kicker"><span>01 / THE FEELING</span><span className="kicker-rule"></span><span>MORE THAN A CAFE</span></div>
        <div className="story-grid"><div><h2>Come as you are.<br/>Stay a little <em>longer.</em></h2></div><div className="story-copy"><p>We believe the best moments are the unplanned ones. A coffee that turns into lunch. A quick catch-up that becomes the whole afternoon. A table full of people who feel like home.</p><p>So we make the good stuff, keep the coffee flowing, and save you a seat.</p><a href="#space" className="underlined-link">A peek inside <ArrowUpRight size={16}/></a></div></div>
        <div className="values-grid"><div className="value-item"><span>01</span><Coffee/><h3>Good, honest coffee</h3><p>Responsibly sourced beans, dialled in daily, served just how you like it.</p></div><div className="value-item"><span>02</span><Sparkles/><h3>Season-led plates</h3><p>Local ingredients, familiar favourites, and a little something unexpected.</p></div><div className="value-item"><span>03</span><HeartIcon/><h3>Room for everyone</h3><p>Your morning ritual, your workday nook, your long-overdue catch-up.</p></div></div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="section-kicker"><span>02 / FROM OUR KITCHEN</span><span className="kicker-rule"></span><span>MADE FRESH, EVERY DAY</span></div>
        <div className="menu-heading"><div><h2>A menu worth<br/><em>lingering over.</em></h2><p>Comforting classics and fresh little discoveries.</p></div><a className="text-link menu-full-link" href="#visit">View all & visit <ArrowUpRight size={16}/></a></div>
        <div className="menu-tabs">{categories.map(c => <button key={c} className={active === c ? 'menu-tab active' : 'menu-tab'} onClick={() => setActive(c)}>{c}</button>)}<span className="menu-count">0{visible.length} ITEMS</span></div>
        <div className="menu-grid">{visible.map((item, i) => <article className="menu-card" key={item.id}>
          <div className="menu-card-image"><img src={photo(item.image, 700)} alt={item.name}/><span className="menu-tag">{item.tag}</span><button aria-label={`Add ${item.name} to order`} className="add-button" onClick={() => add(item)}><Plus size={19}/></button></div>
          <div className="menu-card-info"><div><span className="menu-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div><strong className="price">₹{item.price}</strong></div>
        </article>)}</div>
        <div className="menu-bottom"><span>GOOD FOOD, NO FUSS. ALWAYS MADE WITH CARE.</span><a href="#visit">Have a look around <ArrowRight size={15}/></a></div>
      </section>

      <section className="feature section-pad" id="space">
        <div className="feature-image-wrap"><img src={photo('photo-1445116572660-236099ec97a0', 1300)} alt="Sunlit cafe interior with warm natural textures"/><div className="feature-stamp">YOUR<br/><em>HAPPY</em><br/>PLACE</div></div>
        <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-line"></span> A SPACE TO SETTLE IN</div><h2>Soft light.<br/>Warm corners.<br/><em>Good energy.</em></h2><p>Come for the coffee, stay for the atmosphere. A thoughtful mix of old-world charm and modern comfort, with a favourite seat waiting to be found.</p><div className="feature-details"><div><Clock3/><span><strong>Every day, 8am – 10pm</strong><small>Slow mornings welcome</small></span></div><div><MapPin/><span><strong>In the heart of the neighbourhood</strong><small>Easy to find, hard to leave</small></span></div></div><a className="button button-light" href="#visit">Come on in <ArrowRight size={16}/></a></div>
      </section>

      <section className="quote-section"><span className="quote-mark">“</span><blockquote>Some of the best conversations<br/>start with <em>‘one more coffee?’</em></blockquote><div className="quote-byline"><span></span> THE VELVET & ROAST WAY <span></span></div></section>

      <section className="visit section-pad" id="visit">
        <div className="section-kicker"><span>03 / YOUR TABLE IS WAITING</span><span className="kicker-rule"></span><span>COME SAY HELLO</span></div>
        <div className="visit-grid"><div className="visit-copy"><h2>Make yourself<br/>at <em>home.</em></h2><p>Planning a catch-up, a little celebration, or just craving a really good flat white? We'd love to have you.</p><div className="visit-info"><div><MapPin/><span><strong>Find your way here</strong><small>12 Civil Lines, Prayagraj</small></span></div><div><Clock3/><span><strong>Open every day</strong><small>8:00 AM – 10:00 PM</small></span></div><div><Instagram/><span><strong>Follow the good stuff</strong><small>@velvetandroast</small></span></div></div></div>
          <form className="booking-card" onSubmit={e => {e.preventDefault(); setBookingSent(true);}}><div className="booking-title"><div><span>LET'S MAKE A PLAN</span><h3>Save your spot.</h3></div><span className="booking-spark">✳</span></div>
            {bookingSent ? <div className="success-state"><span>✓</span><h4>Lovely choice!</h4><p>Thanks, {booking.name || 'friend'} — your table request is ready. Our team will confirm with you shortly.</p><button type="button" className="text-link" onClick={() => setBookingSent(false)}>Make another request ↗</button></div> : <>
              <label>Your name<input required placeholder="What should we call you?" value={booking.name} onChange={e => setBooking({...booking, name:e.target.value})}/></label>
              <div className="form-row"><label>Date<input required type="date" min={new Date().toISOString().split('T')[0]} value={booking.date} onChange={e => setBooking({...booking, date:e.target.value})}/></label><label>Time<select value={booking.time} onChange={e => setBooking({...booking, time:e.target.value})}>{['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM'].map(t=><option key={t}>{t}</option>)}</select></label></div>
              <label>Party size<select value={booking.guests} onChange={e => setBooking({...booking, guests:e.target.value})}>{['1 guest','2 guests','3 guests','4 guests','5 guests','6 guests','7+ guests'].map(g=><option key={g}>{g}</option>)}</select></label>
              <button className="button button-dark booking-submit" type="submit">Request a table <ArrowRight size={16}/></button><small className="form-note">This demo form shows a confirmation only; connect a booking service to accept real reservations.</small>
            </>}</form>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="footer-main"><a href="#home" className="brand footer-brand"><span className="brand-mark">V<span>&</span>R</span><span className="brand-name">VELVET <i>&</i> ROAST<small>CAFE · KITCHEN · COMPANY</small></span></a><p>A little pause in your everyday.<br/>Made with heart, served with warmth.</p><a href="#home" className="back-top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© 2026 VELVET & ROAST. MADE WITH CARE.</span><span>GOOD THINGS TAKE TIME.</span><span>PRIVACY · ACCESSIBILITY</span></div></footer>

    {cartOpen && <div className="drawer-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span>YOUR LITTLE ORDER</span><h3>Good choice.</h3></div><button aria-label="Close basket" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={35}/><h4>Nothing in your basket yet.</h4><p>Something delicious is waiting on the menu.</p><button className="button button-dark" onClick={() => {setCartOpen(false); document.getElementById('menu').scrollIntoView({behavior:'smooth'});}}>Explore the menu <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={photo(item.image, 180)} alt=""/><div className="cart-item-copy"><strong>{item.name}</strong><span>₹{item.price}</span><div className="qty-controls"><button onClick={() => changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>₹{total}</strong></div><p className="cart-note">Pickup and payment can be connected to your preferred checkout service.</p><button className="button button-dark booking-submit" onClick={() => alert('Thanks! Connect a checkout provider to accept orders.')}>Continue to checkout <ArrowRight size={16}/></button></>}</aside></div>}
  </div>;
}
function HeartIcon(){return <svg className="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>}
createRoot(document.getElementById('root')).render(<App/>);