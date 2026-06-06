const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#F4F1EE;font-family:'Jost',sans-serif;color:#1E1E1E;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:2px;}

  /* NAV */
  nav{position:sticky;top:0;z-index:100;background:rgba(244,241,238,0.97);backdrop-filter:blur(12px);border-bottom:1px solid #DDD8D2;padding:0 24px;}
  .nav-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 0;}
  .nav-logo{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;letter-spacing:3px;color:#1E1E1E;}
  .nav-logo span{color:#C9A84C;}
  .nav-links{display:flex;gap:24px;}
  .nav-links a{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7A7470;text-decoration:none;transition:color 0.2s;}
  .nav-links a:hover{color:#C9A84C;}
  .nav-wa{padding:8px 18px;background:linear-gradient(135deg,#C9A84C,#B8963E);color:white;border:none;border-radius:20px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;text-decoration:none;}

  /* HERO */
  .hero{max-width:900px;margin:0 auto;padding:60px 24px 40px;text-align:center;}
  .hero-sym{font-family:'Cormorant Garamond',serif;font-size:48px;color:#C9A84C;letter-spacing:6px;}
  .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,8vw,72px);font-weight:300;letter-spacing:6px;color:#1E1E1E;margin:8px 0 4px;line-height:1.1;}
  .hero-sub{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#7A7470;margin-bottom:20px;}
  .hero-tagline{font-family:'Cormorant Garamond',serif;font-size:clamp(16px,3vw,22px);font-style:italic;color:#7A7470;margin-bottom:32px;line-height:1.6;}
  .gold-divider{height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:0 auto 32px;max-width:240px;}
  .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
  .btn-primary{padding:14px 32px;background:linear-gradient(135deg,#C9A84C,#B8963E);color:white;border:none;border-radius:30px;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;}
  .btn-primary:hover{opacity:0.9;transform:translateY(-2px);}
  .btn-outline{padding:13px 32px;background:transparent;border:1px solid #C9A84C;color:#C9A84C;border-radius:30px;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;}
  .btn-outline:hover{background:#C9A84C22;}

  /* STATS */
  .stats{background:#EDEAE6;border-top:1px solid #DDD8D2;border-bottom:1px solid #DDD8D2;padding:32px 24px;}
  .stats-inner{max-width:900px;margin:0 auto;display:flex;justify-content:space-around;flex-wrap:wrap;gap:20px;}
  .stat-item{text-align:center;}
  .stat-num{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:600;color:#C9A84C;line-height:1;}
  .stat-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7470;margin-top:4px;}

  /* SECTIONS */
  section{padding:60px 24px;}
  .section-inner{max-width:900px;margin:0 auto;}
  .section-eyebrow{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;margin-bottom:8px;text-align:center;}
  .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,5vw,42px);font-weight:300;text-align:center;margin-bottom:6px;}
  .section-title span{color:#C9A84C;font-style:italic;}
  .section-sub{font-size:13px;color:#7A7470;text-align:center;margin-bottom:40px;line-height:1.7;max-width:560px;margin-left:auto;margin-right:auto;}

  /* SERVICES */
  .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;}
  .service-card{background:#EDEAE6;border:1px solid #DDD8D2;border-radius:20px;padding:28px 24px;transition:all 0.2s;}
  .service-card:hover{border-color:#C9A84C44;transform:translateY(-3px);}
  .service-card.featured{background:linear-gradient(135deg,#FAF7F0,#F5EFE0);border-color:#C9A84C44;}
  .sc-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;background:#C9A84C22;color:#8B6914;border:1px solid #C9A84C44;margin-bottom:12px;}
  .sc-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin-bottom:4px;}
  .sc-desc{font-size:11px;color:#7A7470;letter-spacing:1px;font-style:italic;margin-bottom:16px;}
  .sc-items{list-style:none;}
  .sc-items li{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #DDD8D2;font-size:13px;}
  .sc-items li:last-child{border-bottom:none;}
  .sc-items li span{color:#C9A84C;font-weight:500;}

  /* SPA */
  .spa-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin-top:8px;}
  .spa-card{background:#EDEAE6;border:1px solid #DDD8D2;border-radius:16px;padding:20px 16px;text-align:center;transition:all 0.2s;}
  .spa-card:hover{border-color:#C9A84C44;}
  .spa-icon{font-size:28px;margin-bottom:8px;}
  .spa-name{font-size:12px;font-weight:500;letter-spacing:0.5px;}
  .spa-pkg{background:linear-gradient(135deg,#FAF7F0,#F5EFE0);border:1px solid #C9A84C44;border-radius:14px;padding:16px 20px;margin-top:20px;text-align:center;}
  .spa-pkg-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7470;margin-bottom:4px;}
  .spa-pkg-price{font-family:'Cormorant Garamond',serif;font-size:28px;color:#C9A84C;}

  /* ABOUT */
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
  @media(max-width:640px){.about-grid{grid-template-columns:1fr;}}
  .about-text p{font-size:14px;color:#5C4A3A;line-height:1.8;margin-bottom:14px;}
  .about-highlights{display:flex;flex-direction:column;gap:12px;}
  .highlight{display:flex;align-items:center;gap:12px;background:#EDEAE6;border:1px solid #DDD8D2;border-radius:12px;padding:14px;}
  .h-icon{font-size:22px;}
  .h-text{font-size:13px;color:#1E1E1E;}
  .h-sub{font-size:11px;color:#7A7470;margin-top:1px;}

  /* TEAM */
  .team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;}
  .team-card{text-align:center;}
  .team-photo{width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid #DDD8D2;margin:0 auto 10px;display:block;transition:border-color 0.2s;}
  .team-card:hover .team-photo{border-color:#C9A84C;}
  .team-name{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;}
  .team-role{font-size:10px;color:#7A7470;letter-spacing:1px;margin-top:2px;}

  /* CONTACT */
  .contact-card{background:#EDEAE6;border:1px solid #DDD8D2;border-radius:20px;padding:32px;text-align:center;max-width:500px;margin:0 auto;}
  .contact-item{display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 0;border-bottom:1px solid #DDD8D2;font-size:14px;}
  .contact-item:last-child{border-bottom:none;}
  .wa-big{display:inline-flex;align-items:center;gap:10px;padding:16px 40px;background:#25D366;color:white;border-radius:30px;text-decoration:none;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin-top:20px;transition:all 0.2s;}
  .wa-big:hover{opacity:0.9;transform:translateY(-2px);}
  .rate-link{display:inline-flex;align-items:center;gap:10px;padding:13px 32px;background:#EDEAE6;border:1px solid #DDD8D2;border-radius:30px;text-decoration:none;font-family:'Jost',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin-top:12px;color:#1E1E1E;transition:all 0.2s;}
  .rate-link:hover{border-color:#C9A84C;}

  /* FOOTER */
  footer{background:#2A2A2A;color:#F4F1EE;padding:32px 24px;text-align:center;}
  .footer-logo{font-family:'Cormorant Garamond',serif;font-size:20px;letter-spacing:4px;color:#C9A84C;margin-bottom:8px;}
  .footer-sub{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7470;margin-bottom:16px;}
  .footer-links{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;}
  .footer-links a{font-size:11px;color:#A09A94;text-decoration:none;letter-spacing:1px;}
  .footer-note{font-size:11px;color:#5C4A3A;}

  @media(max-width:600px){
    .nav-links{display:none;}
    .about-grid{grid-template-columns:1fr;}
  }
`;

import { STAFF_PHOTOS } from "../staffPhotos";

const TEAM = [
  { name: "Incia Turab", role: "Owner & Luxury Artist", key: "incia" },
  { name: "Abiha", role: "Makeup Artist", key: "abiha" },
  { name: "Ayesha", role: "Makeup Artist", key: "ayesha" },
  { name: "Bushra", role: "Makeup Artist", key: "bushra" },
  { name: "Saba", role: "Makeup Artist", key: "saba" },
  { name: "Divya", role: "Makeup Artist", key: "divya" },
  { name: "Asna", role: "Makeup Artist", key: "asna" },
];

export default function Website() {
  return (
    <>
      <style>{S}</style>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <span className="nav-logo">INCIA <span>TURAB</span></span>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#spa">Spa</a>
            <a href="#about">About</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="https://wa.me/923321221223" className="nav-wa">Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-sym">✦ IT ✦</div>
        <h1 className="hero-name">INCIA TURAB</h1>
        <p className="hero-sub">Luxury Artist · Karachi, Pakistan</p>
        <div className="gold-divider" />
        <p className="hero-tagline">
          Where every face tells a story of elegance.<br />
          Bridal makeup · Party glam · Luxury spa services
        </p>
        <div className="hero-btns">
          <a href="https://wa.me/923321221223?text=Assalamualaykum! I would like to book an appointment with Incia Turab Luxury Artist." className="btn-primary">Book Your Date 🌸</a>
          <a href="#services" className="btn-outline">View Services</a>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stats-inner">
          <div className="stat-item"><div className="stat-num">7+</div><div className="stat-label">Expert Artists</div></div>
          <div className="stat-item"><div className="stat-num">500+</div><div className="stat-label">Happy Brides</div></div>
          <div className="stat-item"><div className="stat-num">5★</div><div className="stat-label">Google Rated</div></div>
          <div className="stat-item"><div className="stat-num">7</div><div className="stat-label">Days a Week</div></div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{ background: "#F4F1EE" }}>
        <div className="section-inner">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title">Makeup <span>Packages</span></h2>
          <p className="section-sub">Three levels of luxury — from our signature experience to beautiful affordable options. Every client deserves to feel extraordinary.</p>
          <div className="services-grid">
            <div className="service-card featured">
              <span className="sc-badge">✦ Most Exclusive</span>
              <div className="sc-title">Signature</div>
              <div className="sc-desc">By Incia Turab — The Ultimate Luxury Experience</div>
              <ul className="sc-items">
                <li>Baraat / Valima <span>50,000</span></li>
                <li>Mehndi <span>38,000</span></li>
                <li>Engagement / Nikkah <span>32,000</span></li>
                <li>Mayoon <span>24,000</span></li>
                <li>Party Makeup <span>18,000</span></li>
                <li>Same Day Nikkah + Reception <span>65,000</span></li>
              </ul>
            </div>
            <div className="service-card">
              <span className="sc-badge">Pro Artist</span>
              <div className="sc-title">Pro Artist</div>
              <div className="sc-desc">Trained by Incia Turab · 5+ Years · Signature Inspired</div>
              <ul className="sc-items">
                <li>Baraat / Valima <span>30,000</span></li>
                <li>Mehndi <span>25,000</span></li>
                <li>Engagement / Nikkah <span>20,000</span></li>
                <li>Mayoon <span>15,000</span></li>
                <li>Party Makeup <span>10,000</span></li>
                <li>Same Day Nikkah + Reception <span>35,000</span></li>
              </ul>
            </div>
            <div className="service-card">
              <span className="sc-badge">Studio Artist</span>
              <div className="sc-title">Studio Artist</div>
              <div className="sc-desc">Trained by Incia Turab · 1+ Year · Soft · Elegant · Timeless</div>
              <ul className="sc-items">
                <li>Baraat / Valima <span>15,000</span></li>
                <li>Mehndi <span>12,000</span></li>
                <li>Engagement / Nikkah <span>10,000</span></li>
                <li>Mayoon <span>9,000</span></li>
                <li>Party Makeup <span>7,000</span></li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 32, background: "#EDEAE6", border: "1px solid #DDD8D2", borderRadius: 20, padding: 28 }}>
            <p className="section-eyebrow" style={{ marginBottom: 8 }}>Party Makeup Deals</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "#7A7470", textAlign: "center", marginBottom: 20, fontStyle: "italic" }}>Applicable on 2 or more bookings</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
              {[
                { name: "Girl Next Door", desc: "Soft natural, matt eyes, no lashes, iron straight", price: "2,999" },
                { name: "Divine Diva", desc: "Shimmer or smokey eyes, lashes, curls or messy buns", price: "3,999" },
                { name: "Fiercely Gorgeous", desc: "Glam shimmer, dark lips, lashes, any party hairdo", price: "4,999" },
              ].map(d => (
                <div key={d.name} style={{ background: "#FAF7F0", border: "1px solid #C9A84C44", borderRadius: 14, padding: 18, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "#7A7470", marginBottom: 12, lineHeight: 1.5 }}>{d.desc}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#C9A84C" }}>PKR {d.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPA */}
      <section id="spa" style={{ background: "#EDEAE6" }}>
        <div className="section-inner">
          <p className="section-eyebrow">Bridal Spa</p>
          <h2 className="section-title">Luxury <span>Spa Services</span></h2>
          <p className="section-sub">Pamper yourself completely before your big day. Our spa services are renowned across Karachi for their exceptional quality — especially our manicure, pedicure and waxing.</p>
          <div className="spa-grid">
            {[
              { icon: "✨", name: "Glow Facial" },
              { icon: "🌿", name: "HydraFacial" },
              { icon: "🪷", name: "Face Wax Rica" },
              { icon: "💅", name: "Glow Manicure" },
              { icon: "🌸", name: "Glow Pedicure" },
              { icon: "🌺", name: "Herbal Body Facial" },
              { icon: "✋", name: "Full Hand Rica Wax" },
              { icon: "🦵", name: "Full Leg Rica Wax" },
            ].map(s => (
              <div key={s.name} className="spa-card">
                <div className="spa-icon">{s.icon}</div>
                <div className="spa-name">{s.name}</div>
              </div>
            ))}
          </div>
          <div className="spa-pkg">
            <div className="spa-pkg-label">Complete Bridal Package</div>
            <div className="spa-pkg-price">PKR 12,000</div>
            <div style={{ fontSize: 11, color: "#7A7470", marginTop: 4 }}>All 7 spa services included</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "#F4F1EE" }}>
        <div className="section-inner">
          <p className="section-eyebrow">About Us</p>
          <h2 className="section-title">The Artist Behind <span>the Magic</span></h2>
          <div className="about-grid" style={{ marginTop: 32 }}>
            <div className="about-text">
              <p>Incia Turab is one of Karachi's most sought-after luxury makeup artists, known for creating looks that are timeless, elegant, and deeply personal. With years of experience in bridal and editorial makeup, Incia has built a reputation for transforming her clients into the most beautiful version of themselves.</p>
              <p>What began as a passion became a movement. Today, Incia Turab Makeovers is home to a team of seven carefully trained artists, each sharing the same commitment to precision, luxury, and making every client feel truly special.</p>
              <p>Beyond makeup, we are renowned for our luxury spa services. Our manicure, pedicure and waxing services are particularly loved by clients across Karachi.</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: "italic", color: "#C9A84C" }}>We don't just do makeup. We create memories.</p>
            </div>
            <div className="about-highlights">
              {[
                { icon: "🌸", text: "Owner & Lead Artist", sub: "Incia Turab — Luxury Artist" },
                { icon: "📍", text: "Jamshed Road, Gurumandir", sub: "Karachi · Serving all major cities" },
                { icon: "🕐", text: "Open 7 Days a Week", sub: "7:00 AM – 7:30 PM" },
                { icon: "📱", text: "Book on WhatsApp", sub: "03321221223" },
                { icon: "📸", text: "@makeupbyinciaturab", sub: "Follow us on Instagram" },
                { icon: "⭐", text: "5 Star Rated", sub: "Trusted by hundreds of brides" },
              ].map((h, i) => (
                <div key={i} className="highlight">
                  <span className="h-icon">{h.icon}</span>
                  <div>
                    <div className="h-text">{h.text}</div>
                    <div className="h-sub">{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ background: "#EDEAE6" }}>
        <div className="section-inner">
          <p className="section-eyebrow">Our Team</p>
          <h2 className="section-title">Meet Our <span>Artists</span></h2>
          <p className="section-sub">Every artist is personally trained by Incia Turab and shares the same dedication to making you look and feel extraordinary.</p>
          <div className="team-grid">
            {TEAM.map(t => (
              <div key={t.key} className="team-card">
                <img src={STAFF_PHOTOS[t.key]} alt={t.name} className="team-photo" />
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#F4F1EE" }}>
        <div className="section-inner">
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">Book Your <span>Beautiful Day</span></h2>
          <p className="section-sub">Ready to look and feel incredible? Reach out on WhatsApp and we'll help you find the perfect artist and package for your special day.</p>
          <div className="contact-card">
            <div className="contact-item">📍 Jamshed Road, Gurumandir, Karachi</div>
            <div className="contact-item">📱 03321221223</div>
            <div className="contact-item">📸 @makeupbyinciaturab</div>
            <div className="contact-item">🕐 7:00 AM – 7:30 PM · 7 Days a Week</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <a href="https://wa.me/923321221223?text=Assalamualaykum! I would like to book an appointment with Incia Turab Luxury Artist." className="wa-big">📲 Book on WhatsApp</a>
              <a href="/rate" className="rate-link">⭐ Rate Our Artists</a>
              <a href="https://maps.app.goo.gl/KyGUWQgBt3kTQrcX9?g_st=ic" target="_blank" rel="noreferrer" className="rate-link">🗺️ Find Us on Google Maps</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">INCIA TURAB</div>
        <div className="footer-sub">Luxury Artist · Karachi, Pakistan</div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#spa">Spa</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
          <a href="/rate">Rate Artists</a>
          <a href="/studio">Studio Login</a>
        </div>
        <div className="footer-note">© 2024 Incia Turab Luxury Artist · All Rights Reserved · 📸 @makeupbyinciaturab</div>
      </footer>
    </>
  );
}
