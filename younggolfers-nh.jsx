import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Community", "Events", "Waarom", "FAQ", "Join"];

const STATS = [
  { value: "120+", label: "Leden" },
  { value: "340+", label: "Rondes gespeeld" },
  { value: "12", label: "Events dit jaar" },
  { value: "8", label: "Partnerbanen" },
];

const EVENTS = [
  {
    date: "31 MEI",
    day: "ZA",
    title: "BB Night — Driving Range",
    location: "Golfbaan Spaarnwoude",
    spots: "6 plekken vrij",
    type: "Biertje & Balletje",
    color: "#C9A84C",
  },
  {
    date: "7 JUN",
    day: "ZO",
    title: "Casual Round — 9 holes",
    location: "Golf & Country Club Velserbroek",
    spots: "4 plekken vrij",
    type: "Casual Ronde",
    color: "#2d6a4f",
  },
  {
    date: "21 JUN",
    day: "ZA",
    title: "Zomerschramble Tournament",
    location: "Kennemer Golf & Country Club",
    spots: "Teams welkom",
    type: "Tournament",
    color: "#C9A84C",
  },
  {
    date: "5 JUL",
    day: "ZA",
    title: "BB Night — Sunset Edition",
    location: "Golf Club Amsterdam",
    spots: "8 plekken vrij",
    type: "Biertje & Balletje",
    color: "#b5451b",
  },
];

const TESTIMONIALS = [
  {
    name: "Daan V.",
    age: 24,
    text: "Eindelijk een community waar golf niet saai is. Ik ken nu meer mensen op de baan dan thuis.",
    emoji: "⛳",
  },
  {
    name: "Lisa M.",
    age: 27,
    text: "Via de WhatsApp groep ben ik in één week al drie keer wezen golfen. Echt ongelooflijk.",
    emoji: "🏌️‍♀️",
  },
  {
    name: "Ruben K.",
    age: 22,
    text: "BB nights zijn legendarisch. Golf + bier + goede mensen. Meer heb ik niet nodig.",
    emoji: "🍺",
  },
  {
    name: "Sophie B.",
    age: 26,
    text: "Ik speelde altijd alleen. Nu heb ik een groep van 12 mensen met wie ik weekenden plan.",
    emoji: "🌟",
  },
];

const FAQS = [
  {
    q: "Hoe word ik lid van Young Golfers NH?",
    a: "Heel simpel: join onze WhatsApp community via de knop op deze pagina. Geen lidmaatschapskosten, geen gedoe.",
  },
  {
    q: "Heb ik een vaste baan of handicap nodig?",
    a: "Nee! We spelen op verschillende banen in Noord-Holland. Elk level is welkom, van beginner tot scratch.",
  },
  {
    q: "Hoe oud moet ik zijn?",
    a: "We richten ons op golfers tussen 21 en 29 jaar. Jong, sociaal en klaar om te spelen.",
  },
  {
    q: "Kosten de events geld?",
    a: "De meeste events zijn gratis of split je de greenfee. BB nights zijn voor eigen rekening (dus een biertje en een bucket balletjes).",
  },
  {
    q: "Kan ik iemand meenemen?",
    a: "Absoluut. Hoe meer, hoe beter. Stuur ze gewoon de link naar de WhatsApp groep.",
  },
];

const PARTNERS = [
  "Spaarnwoude Golf",
  "Velserbroek G&CC",
  "Kennemer G&CC",
  "Golf Club Amsterdam",
  "Haarlemmermeersche Golf",
  "Golf Olympus",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,14,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color: "#C9A84C", fontSize: "1.6rem" }}>⛳</span>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          Young Golfers <span style={{ color: "#C9A84C" }}>NH</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.slice(0, -1).map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#C9A84C"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
          >
            {l}
          </a>
        ))}
        <a
          href="#join"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #e8c96a)",
            color: "#0a0f0c",
            padding: "0.5rem 1.4rem",
            borderRadius: "2rem",
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 0 20px rgba(201,168,76,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
        >
          Join Nu
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "#080e0a",
    }}>
      {/* Background gradient landscape */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 60% 40%, rgba(45,106,79,0.35) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.12) 0%, transparent 50%), linear-gradient(180deg, #080e0a 0%, #0d1f14 40%, #0a1a0f 100%)",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Decorative golf hole */}
      <div style={{
        position: "absolute",
        right: "8%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "380px",
        height: "380px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,106,79,0.2) 0%, transparent 70%)",
        border: "1px solid rgba(201,168,76,0.1)",
        animation: "pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        right: "12%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        border: "1px solid rgba(201,168,76,0.2)",
        animation: "pulse 4s ease-in-out infinite 1s",
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "0 1.5rem",
        maxWidth: "900px",
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(201,168,76,0.1)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderRadius: "2rem",
          padding: "0.4rem 1.2rem",
          marginBottom: "2rem",
          animation: "fadeInDown 0.8s ease",
        }}>
          <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
            Noord-Holland · 21–29 jaar
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          color: "#fff",
          marginBottom: "1.5rem",
          animation: "fadeInUp 0.9s ease 0.1s both",
        }}>
          Golf is leuker<br />
          <span style={{
            background: "linear-gradient(135deg, #C9A84C, #e8c96a, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>samen.</span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          maxWidth: "560px",
          margin: "0 auto 3rem",
          lineHeight: 1.7,
          animation: "fadeInUp 0.9s ease 0.2s both",
        }}>
          Young Golfers NH is dé community voor jonge golfers in Noord-Holland.
          Spontane rondes, driving range avonden, en mensen die het snappen.
        </p>

        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeInUp 0.9s ease 0.3s both",
        }}>
          <a
            href="#join"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #e8c96a)",
              color: "#0a0f0c",
              padding: "1rem 2.2rem",
              borderRadius: "3rem",
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 0 40px rgba(201,168,76,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.3)"; }}
          >
            💬 Join de WhatsApp Community
          </a>
          <a
            href="#events"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "1rem 2.2rem",
              borderRadius: "3rem",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
          >
            Bekijk Events ↓
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex",
          gap: "0",
          justifyContent: "center",
          marginTop: "5rem",
          flexWrap: "wrap",
          animation: "fadeInUp 0.9s ease 0.4s both",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "1rem 2rem",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#C9A84C" }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        animation: "bounce 2s infinite",
      }}>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)" }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform:translateY(-50%) scale(1); opacity:0.6; } 50% { transform:translateY(-50%) scale(1.05); opacity:1; } }
        @keyframes bounce { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(8px); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080e0a; font-family: 'DM Sans', sans-serif; }
      `}</style>
    </section>
  );
}

function About() {
  return (
    <section id="community" style={{ background: "#080e0a", padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
      }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <AnimatedSection>
          <div style={{
            background: "linear-gradient(135deg, rgba(45,106,79,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "2rem",
            padding: "3rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "-50px", right: "-50px",
              width: "200px", height: "200px",
              background: "radial-gradient(circle, rgba(201,168,76,0.1), transparent)",
              borderRadius: "50%",
            }} />
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>⛳</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#fff", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.3 }}>
              Meer dan een<br /><span style={{ color: "#C9A84C" }}>golfclub.</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Young Golfers NH is ontstaan uit frustratie. Te weinig jongeren op de baan. Te formeel. Te saai.
              We bouwen iets anders: een community waar golf lékker is.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["🏌️ Casual rounds", "🍺 BB nights", "🏆 Scrambles", "📍 Noord-Holland"].map(tag => (
                <span key={tag} style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "2rem",
                  padding: "0.3rem 0.9rem",
                  color: "#C9A84C",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>
              Waarom Young Golfers NH
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 800, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Jij kent vast het gevoel.
            </h2>
            {[
              { icon: "😶", text: "Je staat op de range en kent niemand." },
              { icon: "📅", text: "Je wil een ronde spelen maar mist speelmaatjes." },
              { icon: "👴", text: "De sfeer op de club is... niet bepaald 23 jaar." },
              { icon: "💡", text: "Je wil impromptu kunnen zeggen: 'wie is er morgen in?'" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "0.5rem",
                transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
              >
                <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.7 }}>
              Young Golfers NH is het antwoord. Een WhatsApp community, spontane events en een groep die het begrijpt.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" style={{ background: "#060c09", padding: "8rem 1.5rem", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
              Aankomende events
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", fontWeight: 800 }}>
              Altijd iets te doen.
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {EVENTS.map((e, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1.5rem",
                padding: "1.8rem",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                height: "100%",
              }}
                onMouseEnter={el => {
                  el.currentTarget.style.transform = "translateY(-6px)";
                  el.currentTarget.style.borderColor = `${e.color}50`;
                  el.currentTarget.style.boxShadow = `0 20px 60px ${e.color}15`;
                }}
                onMouseLeave={el => {
                  el.currentTarget.style.transform = "translateY(0)";
                  el.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  el.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${e.color}, transparent)`,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ color: e.color, fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Playfair Display', serif" }}>{e.date}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>{e.day}</div>
                  </div>
                  <span style={{
                    background: `${e.color}18`,
                    color: e.color,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "2rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    border: `1px solid ${e.color}30`,
                  }}>{e.type}</span>
                </div>
                <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.3 }}>{e.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginBottom: "1.5rem" }}>📍 {e.location}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>✓ {e.spots}</span>
                  <button style={{
                    background: `linear-gradient(135deg, ${e.color}, ${e.color}cc)`,
                    color: "#0a0f0c",
                    border: "none",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "2rem",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                  }}>Aanmelden →</button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background: "#080e0a", padding: "8rem 1.5rem", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
              Wat leden zeggen
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", fontWeight: 800 }}>
              Play. Connect. Grow.
            </h2>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div style={{
                background: "linear-gradient(135deg, rgba(45,106,79,0.08), rgba(201,168,76,0.03))",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.5rem",
                padding: "2rem",
                transition: "transform 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{t.emoji}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #2d6a4f, #C9A84C)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: "0.85rem",
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>{t.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{t.age} jaar · lid</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section style={{ background: "#060c09", padding: "6rem 1.5rem", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
            Volg ons
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", fontWeight: 800, marginBottom: "1rem" }}>
            Stay in the loop.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "3rem", lineHeight: 1.7 }}>
            Van spontane rondes tot BB night highlights — alles op Instagram en TikTok.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "📸", label: "Instagram", handle: "@younggolfersnl", color: "#E1306C" },
              { icon: "🎵", label: "TikTok", handle: "@younggolfersnl", color: "#69C9D0" },
              { icon: "💬", label: "WhatsApp", handle: "Community groep", color: "#25D366" },
            ].map((s, i) => (
              <a key={i} href="#join" style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${s.color}30`,
                borderRadius: "1rem",
                textDecoration: "none",
                transition: "transform 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.background = `${s.color}10`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem" }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: "0.75rem" }}>{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
          {/* Mock grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginTop: "3rem", borderRadius: "1rem", overflow: "hidden", opacity: 0.6 }}>
            {["🏌️", "⛳", "🍺", "🏆", "🌅", "👥", "🎯", "🌿"].map((e, i) => (
              <div key={i} style={{
                aspectRatio: "1",
                background: `linear-gradient(135deg, rgba(45,106,79,${0.1 + i * 0.05}), rgba(201,168,76,${0.05 + i * 0.03}))`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                borderRadius: "0.3rem",
              }}>{e}</div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section style={{ background: "#080e0a", padding: "5rem 1.5rem", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      }} />
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>
            Partnerbanen in Noord-Holland
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {PARTNERS.map((p, i) => (
              <span key={i} style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.85rem",
                padding: "0.5rem 1.2rem",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2rem",
                letterSpacing: "0.05em",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.target.style.color = "#C9A84C"; e.target.style.borderColor = "rgba(201,168,76,0.3)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.3)"; e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >{p}</span>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", marginTop: "2rem" }}>
            Jouw baan erbij? <a href="mailto:info@younggolfers.nl" style={{ color: "#C9A84C", textDecoration: "none" }}>Neem contact op →</a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background: "#060c09", padding: "8rem 1.5rem", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
      }} />
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>FAQ</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", fontWeight: 800 }}>Vragen?</h2>
          </div>
        </AnimatedSection>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div style={{
                background: open === i ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "1rem",
                overflow: "hidden",
                transition: "border-color 0.3s, background 0.3s",
                cursor: "pointer",
              }} onClick={() => setOpen(open === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.3rem 1.5rem" }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", flex: 1, paddingRight: "1rem" }}>{f.q}</span>
                  <span style={{ color: "#C9A84C", fontSize: "1.2rem", transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </div>
                {open === i && (
                  <div style={{ padding: "0 1.5rem 1.3rem", color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>{f.a}</div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  return (
    <section id="join" style={{ background: "#080e0a", padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(45,106,79,0.15), transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <AnimatedSection>
          <div style={{
            display: "inline-block",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "2rem",
            padding: "0.4rem 1.2rem",
            marginBottom: "2rem",
          }}>
            <span style={{ color: "#C9A84C", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
              Gratis · Geen gedoe · Direct mee
            </span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Jouw game.<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Jouw mensen.
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Join de WhatsApp community en speel volgende week al een rondje met mensen van jouw leeftijd.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/" style={{
              background: "linear-gradient(135deg, #25D366, #1ebe5e)",
              color: "#fff",
              padding: "1.1rem 2.5rem",
              borderRadius: "3rem",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.03em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              boxShadow: "0 0 40px rgba(37,211,102,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(37,211,102,0.25)"; }}
            >
              💬 Join WhatsApp Community
            </a>
            <a href="https://instagram.com/" style={{
              background: "transparent",
              color: "#fff",
              padding: "1.1rem 2rem",
              borderRadius: "3rem",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
            >
              📸 Volg op Instagram
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", marginTop: "2rem" }}>
            Al 120+ golfers gingen je voor · Noord-Holland · 21–29 jaar
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#040a06",
      borderTop: "1px solid rgba(201,168,76,0.1)",
      padding: "3rem 1.5rem",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#C9A84C", fontSize: "1.3rem" }}>⛳</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>
            Young Golfers <span style={{ color: "#C9A84C" }}>NH</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {["Instagram", "TikTok", "WhatsApp"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#C9A84C"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
            >{l}</a>
          ))}
          <a href="mailto:info@younggolfers.nl" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#C9A84C"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >Contact</a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
          © 2026 Young Golfers NH · Noord-Holland
        </p>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      right: "1.5rem",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    }}>
      {[
        { icon: "💬", color: "#25D366", label: "WhatsApp", href: "https://wa.me/" },
        { icon: "📸", color: "#E1306C", label: "Instagram", href: "https://instagram.com/" },
        { icon: "🎵", color: "#69C9D0", label: "TikTok", href: "https://tiktok.com/" },
      ].map((b, i) => (
        <a key={i} href={b.href}
          title={b.label}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: `${b.color}20`,
            border: `1px solid ${b.color}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
            textDecoration: "none",
            backdropFilter: "blur(8px)",
            transition: "transform 0.2s, background 0.2s",
            boxShadow: `0 4px 20px ${b.color}20`,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.background = `${b.color}35`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = `${b.color}20`; }}
        >
          {b.icon}
        </a>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: "#080e0a", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Testimonials />
      <Social />
      <Partners />
      <FAQ />
      <JoinCTA />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
