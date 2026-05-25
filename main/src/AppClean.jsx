import { useEffect, useRef } from "react";
import logo from "./assets/logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sx { font-family: 'Inter', -apple-system, sans-serif; background: #080808; color: #f5f5f7; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  .sx-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 72px; border-bottom: 0.5px solid rgba(255,255,255,0.07); position: sticky; top: 0; background: rgba(8,8,8,0.92); backdrop-filter: blur(12px); z-index: 10; }
  .sx-logo { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
  .sx-logo-img { width: auto; height: auto; max-height: 48px; display: block; }
  .sx-nav-links { display: flex; gap: 2rem; list-style: none; }
  .sx-nav-links a { font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.5); text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s; }
  .sx-nav-links a:hover { color: rgba(255,255,255,0.85); }
  .sx-nav-cta { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 980px; border: none; background: #f5f5f7; color: #080808; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: -0.01em; transition: transform 0.12s ease, box-shadow 0.12s ease; box-shadow: 0 6px 18px rgba(6,6,6,0.45); }
  .sx-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(6,6,6,0.5); }

  .sx-hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 5rem 2rem 4rem; border-bottom: 0.5px solid rgba(255,255,255,0.07); }
  .sx-hero-tag { font-size: 11px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 1.25rem; }
  .sx-hero-badge { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; padding: 8px 14px; border-radius: 980px; border: none; background: rgba(245,245,247,0.06); color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; letter-spacing: 0.02em; text-decoration: none; }
  .sx-hero-badge i { font-size: 14px; color: rgba(255,255,255,0.95); }
  .sx-hero-h1 { font-size: clamp(44px, 6.5vw, 68px); font-weight: 300; line-height: 1.02; letter-spacing: -0.03em; color: #f5f5f7; margin-bottom: 1.25rem; max-width: 920px; }
  .sx-hero-h1 strong { font-weight: 500; background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .sx-hero-sub { font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.62); max-width: 760px; margin-bottom: 2rem; }
  .sx-hero-actions { display: flex; gap: 1rem; align-items: center; }

  .sx-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; border-radius: 980px; font-size: 13px; font-weight: 400; text-decoration: none; transition: opacity 0.2s; letter-spacing: -0.01em; cursor: pointer; border: none; }
  .sx-btn:hover { opacity: 0.85; }
  .sx-btn-fill { background: #f5f5f7; color: #080808; }
  .sx-btn-outline { background: transparent; color: rgba(255,255,255,0.65); border: 0.5px solid rgba(255,255,255,0.2); }

  .sx-section { padding: 5rem 2.5rem; border-bottom: 0.5px solid rgba(255,255,255,0.07); }
  .sx-section-eyebrow { font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 2.25rem; text-align: center; }
  .sx-section-head { max-width: 780px; margin: 0 auto 2.5rem; text-align: center; }
  .sx-section-title { font-size: clamp(30px, 4vw, 46px); font-weight: 300; line-height: 1.08; letter-spacing: -0.03em; color: #f5f5f7; }
  .sx-section-copy { margin-top: 1rem; font-size: 15px; font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.5); max-width: 760px; margin-left: auto; margin-right: auto; }

  .sx-venture-grid, .sx-project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; max-width: 1100px; margin: 0 auto; }
  .vcard { background: linear-gradient(180deg, rgba(20,20,20,0.9), #0e0e0e); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; text-decoration: none; color: #f5f5f7; transition: transform 0.16s ease, box-shadow 0.16s ease; cursor: pointer; box-shadow: 0 6px 18px rgba(2,2,2,0.6); }
  .vcard:hover { transform: translateY(-6px); box-shadow: 0 18px 46px rgba(2,2,2,0.7); }
  .vcard-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .vcard-icon { width: 56px; height: 56px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 22px; color: rgba(255,255,255,0.72); }
  .badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 980px; border: 0.5px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.55); white-space: nowrap; }
  .vcard-name { font-size: 16px; font-weight: 600; color: #f5f5f7; margin: 0; letter-spacing: -0.02em; }
  .vcard-url { font-size: 12px; color: rgba(255,255,255,0.42); margin: 3px 0 0; }
  .vcard-desc { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.62); line-height: 1.6; flex: 1; }
  .vcard-divider { height: 0.5px; background: rgba(255,255,255,0.08); }
  .vcard-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .sx-tag { font-size: 12px; color: rgba(255,255,255,0.82); background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 999px; padding: 6px 10px; font-weight: 500; }
  .vcard-link { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.9); margin-top: 6px; font-weight: 600; }

  .sx-tech-list { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 920px; margin: 0 auto; }
  .sx-tech-pill { font-size: 12px; color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 980px; padding: 10px 14px; letter-spacing: -0.01em; }

  .sx-about-wrap { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.8rem; }
  .sx-about-lead { font-size: clamp(18px, 2.5vw, 22px); font-weight: 300; line-height: 1.6; letter-spacing: -0.02em; color: rgba(255,255,255,0.82); }
  .sx-about-body { font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,0.52); }
  .sx-about-highlight { color: rgba(255,255,255,0.86); font-weight: 500; }
  .sx-focus-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .sx-focus-item { display: flex; align-items: center; gap: 10px; padding: 13px 15px; background: #111111; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 12px; font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.55); }
  .sx-focus-item i { font-size: 16px; color: rgba(255,255,255,0.38); flex-shrink: 0; }
  .sx-about-divider { width: 100%; height: 0.5px; background: rgba(255,255,255,0.08); }
  .sx-about-tagline { font-size: 13px; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.36); border-left: 1.5px solid rgba(255,255,255,0.12); padding-left: 1.25rem; font-style: italic; }

  .sx-split { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .sx-panel { background: #111111; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 1.5rem; }
  .sx-panel-title { font-size: 18px; font-weight: 500; color: #f5f5f7; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
  .sx-panel-copy { font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(255,255,255,0.52); }

  .sx-contact-block { max-width: 820px; margin: 0 auto; text-align: center; }
  .sx-contact-actions { display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }

  .sx-footer { padding: 2.25rem 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .sx-footer-copy { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.28); letter-spacing: 0.01em; }
  .sx-footer-links { display: flex; gap: 1.5rem; }
  .sx-footer-links a { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.38); text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color 0.2s; }
  .sx-footer-links a:hover { color: rgba(255,255,255,0.75); }

  @media (max-width: 900px) {
    .sx-nav { height: 64px; padding: 0 1.5rem; }
    .sx-logo-img { max-height: 40px; }
  }

  @media (max-width: 600px) {
    .sx-nav { height: 56px; padding: 0 1rem; }
    .sx-logo-img { max-height: 32px; }
    .sx-nav-links { display: none; }
    .sx-nav-cta { padding: 8px 12px; font-size: 12px; }
    .sx-hero { padding: 4rem 1.25rem 3.25rem; }
    .sx-hero-sub { font-size: 14px; margin-bottom: 1.5rem; }
    .sx-hero-actions { width: 100%; flex-direction: column; gap: 0.7rem; }
    .sx-btn { width: 100%; justify-content: center; }
    .sx-section { padding: 3.5rem 1.5rem; }
    .sx-focus-grid { grid-template-columns: repeat(2, 1fr); }
    .sx-split { grid-template-columns: 1fr; }
    .sx-footer { padding: 1.5rem; }
  }
`;

const ventures = [
  {
    icon: "ti ti-cube-3d-sphere",
    name: "Autonomous Systems",
    url: "Decision intelligence for operational environments",
    desc: "Autonomy systems engineered for confident decisions, reliable navigation, and real-world control.",
    tags: ["Autonomy", "Navigation", "Decisioning"],
    badge: "Core",
    href: "#",
    linkLabel: "Explore Autonomous Systems",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-cpu",
    name: "Robotics Engineering",
    url: "Precision machines with embedded intelligence",
    desc: "Modular robotics integrating embedded control, perception, and precision systems engineering.",
    tags: ["Robotics", "Embedded", "Systems"],
    badge: "Build",
    href: "#",
    linkLabel: "Explore Robotics",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-drone",
    name: "Drone & Flight Systems",
    url: "Aerial platforms and flight control",
    desc: "Flight controllers, stabilization, and avionics built for resilient aerial autonomy.",
    tags: ["Drones", "Flight Control", "Avionics"],
    badge: "Air",
    href: "#",
    linkLabel: "Explore Flight Systems",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-circuit-resistor",
    name: "Embedded AI",
    url: "Intelligence at the edge",
    desc: "Edge intelligence on constrained hardware with optimized inference and low-latency decisions.",
    tags: ["Edge AI", "MCUs", "Real-Time"],
    badge: "Edge",
    href: "#",
    linkLabel: "Explore Embedded AI",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-microscope",
    name: "Research & Development",
    url: "Experimentation to validated prototypes",
    desc: "Rapid prototyping and validation pipelines for frontier engineering programs.",
    tags: ["R&D", "Prototyping", "Innovation"],
    badge: "Lab",
    href: "#",
    linkLabel: "Explore R&D",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-cube",
    name: "Advanced Manufacturing",
    url: "Digital workflows to physical systems",
    desc: "Precision digital manufacturing that turns engineered concepts into production-ready hardware.",
    tags: ["Manufacturing", "Fabrication", "Prototyping"],
    badge: "Forge",
    href: "#forge",
    linkLabel: "See SAMBX Forge",
    linkIcon: "ti ti-arrow-up-right",
  },
];

const focusAreas = [
  { icon: "ti ti-brain", label: "Artificial Intelligence" },
  { icon: "ti ti-robot", label: "Robotics" },
  { icon: "ti ti-drone", label: "Drone Platforms" },
  { icon: "ti ti-cpu-2", label: "Embedded Systems" },
  { icon: "ti ti-eye", label: "Computer Vision" },
  { icon: "ti ti-cube", label: "Digital Manufacturing" },
];

const technologies = [
  "Artificial Intelligence",
  "Machine Learning",
  "Embedded Systems",
  "Robotics",
  "Computer Vision",
  "IoT Systems",
  "Flight Controllers",
  "Sensor Fusion",
  "Autonomous Navigation",
  "Digital Manufacturing",
  "Edge AI",
  "Real-Time Systems",
];

const projects = [
  {
    icon: "ti ti-rocket",
    name: "AI Flight Controller System",
    url: "Autonomous aerial intelligence",
    desc: "Adaptive flight intelligence with sensor fusion and robust autonomous control.",
    tags: ["Flight Control", "Sensor Fusion", "Autonomy"],
    badge: "Flight",
    href: "#",
    linkLabel: "View Architecture",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-robot",
    name: "Autonomous Robotics Platform",
    url: "Modular machine autonomy",
    desc: "A field-ready robotics stack unifying edge AI, navigation, perception, and embedded control.",
    tags: ["Robotics", "Edge AI", "Navigation"],
    badge: "Robot",
    href: "#",
    linkLabel: "View Platform",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-device-desktop-cog",
    name: "Smart Embedded Monitoring Device",
    url: "Real-time telemetry and diagnostics",
    desc: "Connected embedded sensing for telemetry, diagnostics, and intelligent machine monitoring.",
    tags: ["Monitoring", "Telemetry", "Embedded"],
    badge: "Edge",
    href: "#",
    linkLabel: "Inspect Device",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-vending-machine",
    name: "AI-Based Smart Vending Machine",
    url: "Intelligent automated dispensing",
    desc: "An automated vending platform combining computer vision, demand intelligence, and embedded control.",
    tags: ["Computer Vision", "Automation", "IoT"],
    badge: "AI",
    href: "#",
    linkLabel: "Explore Concept",
    linkIcon: "ti ti-arrow-up-right",
  },
];

export default function AppClean() {
  const styleRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;
    return () => tag.remove();
  }, []);

  return (
    <div className="sx">
      <nav className="sx-nav">
        <a href="#" className="sx-logo" aria-label="SAMBX">
          <img src={logo} alt="SAMBX" className="sx-logo-img" />
        </a>
        <ul className="sx-nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#ecosystem">Ecosystem</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#forge" className="sx-nav-cta">Forge <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} /></a>
      </nav>

      <section className="sx-hero">
        <p className="sx-hero-tag">Smart AI Machines Built for eXploration</p>
        <a href="#forge" className="sx-hero-badge"><i className="ti ti-cube-3d-sphere" aria-hidden="true" /> SAMBX Forge — Manufacturing & Prototyping</a>
        <h1 className="sx-hero-h1"><strong>Engineering Intelligent Machines</strong><br />for the Future.</h1>
        <p className="sx-hero-sub">SAMBX engineers autonomous systems, robotics, embedded hardware, drone platforms, and advanced manufacturing for next-generation machines.</p>
        <div className="sx-hero-actions">
          <a href="#ecosystem" className="sx-btn sx-btn-fill">Explore Ecosystem</a>
          <a href="#projects" className="sx-btn sx-btn-outline">View Projects</a>
        </div>
      </section>

      <section className="sx-section" id="ecosystem">
        <p className="sx-section-eyebrow">Ecosystem</p>
        <div className="sx-venture-grid">
          {ventures.map((v) => (
            <a key={v.name} className="vcard" href={v.href}>
              <div className="vcard-top"><div className="vcard-icon"><i className={v.icon} aria-hidden="true" /></div><span className="badge">{v.badge}</span></div>
              <div><p className="vcard-name">{v.name}</p><p className="vcard-url">{v.url}</p></div>
              <p className="vcard-desc">{v.desc}</p>
              <div className="vcard-divider" />
              <div className="vcard-tags">{v.tags.map((t) => <span key={t} className="sx-tag">{t}</span>)}</div>
              <div className="vcard-link"><i className={v.linkIcon} aria-hidden="true" style={{ fontSize: "13px" }} />{v.linkLabel}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="sx-section" id="technology">
        <p className="sx-section-eyebrow">Technology Stack</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Technology Stack</h2>
          <p className="sx-section-copy">Software intelligence and hardware engineering combined for scalable, future-ready systems.</p>
        </div>
        <div className="sx-tech-list">{technologies.map((t) => <span key={t} className="sx-tech-pill">{t}</span>)}</div>
      </section>

      <section className="sx-section" id="projects">
        <p className="sx-section-eyebrow">Projects</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Featured Projects</h2>
          <p className="sx-section-copy">Applied engineering from research concepts to deployable systems.</p>
        </div>
        <div className="sx-project-grid">
          {projects.map((p) => (
            <a key={p.name} className="vcard" href={p.href}>
              <div className="vcard-top"><div className="vcard-icon"><i className={p.icon} aria-hidden="true" /></div><span className="badge">{p.badge}</span></div>
              <div><p className="vcard-name">{p.name}</p><p className="vcard-url">{p.url}</p></div>
              <p className="vcard-desc">{p.desc}</p>
              <div className="vcard-divider" />
              <div className="vcard-tags">{p.tags.map((tag) => <span key={tag} className="sx-tag">{tag}</span>)}</div>
              <div className="vcard-link"><i className={p.linkIcon} aria-hidden="true" style={{ fontSize: "13px" }} />{p.linkLabel}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="sx-section" id="about">
        <p className="sx-section-eyebrow">About SAMBX</p>
        <div className="sx-about-wrap">
          <p className="sx-about-lead">SAMBX builds intelligent machines, autonomous systems, and advanced engineering technologies.</p>
          <p className="sx-about-body">The name <span className="sx-about-highlight">SAMBX</span> means <span className="sx-about-highlight">Smart AI Machines Built for eXploration</span> — innovation through precision and experimentation.</p>
          <p className="sx-about-body">Our mission: unite software, hardware, and automation into practical high-performance systems.</p>
          <div className="sx-focus-grid">{focusAreas.map((f) => <div key={f.label} className="sx-focus-item"><i className={f.icon} aria-hidden="true" />{f.label}</div>)}</div>
          <div className="sx-about-divider" />
          <p className="sx-about-tagline">SAMBX is an ecosystem built to explore, experiment, and engineer the future of intelligent systems.</p>
        </div>
      </section>

      <section className="sx-section" id="founder">
        <p className="sx-section-eyebrow">Founder</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Aniket Singh</h2>
          <p className="sx-section-copy">Builder focused on AI, robotics, embedded systems, autonomy, and digital manufacturing.</p>
        </div>
        <div className="sx-split">
          <div className="sx-panel"><p className="sx-panel-title">Engineering Focus</p><p className="sx-panel-copy">Building intelligent machines and future-ready hardware across software and electronics.</p></div>
          <div className="sx-panel"><p className="sx-panel-title">Builder Profile</p><p className="sx-panel-copy">From research to deployment with a precision-first mindset.</p></div>
        </div>
      </section>

      <section className="sx-section" id="forge">
        <p className="sx-section-eyebrow">Forge</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">SAMBX Forge</h2>
          <p className="sx-section-copy">SAMBX Forge is the manufacturing and prototyping division for 3D printing, custom fabrication, and digital manufacturing.</p>
        </div>
        <div className="sx-split">
          <div className="sx-panel"><p className="sx-panel-title">From Digital Design to Physical Reality</p><p className="sx-panel-copy">Forge turns concepts into physical products through precision engineering and additive manufacturing.</p></div>
          <div className="sx-panel"><p className="sx-panel-title">Production Capabilities</p><p className="sx-panel-copy">Rapid iteration and engineering-led fabrication for future hardware platforms.</p></div>
        </div>
      </section>

      <section className="sx-section" id="vision">
        <p className="sx-section-eyebrow">Future Vision</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Future Vision</h2>
          <p className="sx-section-copy">A scalable ecosystem unifying AI, robotics, embedded systems, autonomy, and advanced manufacturing.</p>
        </div>
        <div className="sx-panel" style={{ maxWidth: "920px", margin: "0 auto" }}>
          <p className="sx-panel-copy">Redefining how intelligent machines operate — from autonomous systems to future-ready hardware.</p>
        </div>
      </section>

      <section className="sx-section" id="contact">
        <p className="sx-section-eyebrow">Contact</p>
        <div className="sx-contact-block">
          <h2 className="sx-section-title">Let’s Build the Future</h2>
          <p className="sx-section-copy">For collaborations and engineering programs, connect with SAMBX and build what comes next.</p>
          <div className="sx-contact-actions">
            <a href="mailto:hello@sambx.in" className="sx-btn sx-btn-fill">Start a Conversation</a>
            <a href="https://forge.sambx.in" target="_blank" rel="noreferrer" className="sx-btn sx-btn-outline">Visit Forge</a>
          </div>
        </div>
      </section>

      <footer className="sx-footer">
        <div>
          <div className="sx-footer-copy">SAMBX — Smart AI Machines Built for eXploration</div>
          <div className="sx-footer-copy" style={{ marginTop: "0.5rem" }}>Engineering intelligent systems through AI, robotics, embedded technologies, autonomous systems, and advanced manufacturing.</div>
          <div className="sx-footer-copy" style={{ marginTop: "0.5rem", color: "rgba(255,255,255,0.42)" }}>© 2026 SAMBX. Engineering the Future.</div>
        </div>
        <div className="sx-footer-links">
          <a href="https://instagram.com/sambxforge" target="_blank" rel="noreferrer">Instagram <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} /></a>
          <a href="mailto:hello@sambx.in">Contact</a>
          <a href="https://forge.sambx.in" target="_blank" rel="noreferrer">forge.sambx.in <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} /></a>
        </div>
      </footer>
    </div>
  );
}
