import { useEffect, useRef } from "react";
import logo from "./assets/logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #080808;
    color: #f5f5f7;
  }

  #root {
    min-height: 100vh;
  }

  .coming-soon {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: max(1.25rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
    background:
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.16), transparent 45%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.14), transparent 45%),
      #080808;
  }

  .coming-soon-card {
    width: min(680px, 100%);
    margin: 0 auto;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    background: rgba(14, 14, 14, 0.9);
    backdrop-filter: blur(8px);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  }

  .coming-soon-logo {
    width: auto;
    max-height: 64px;
    margin-bottom: 1.5rem;
  }

  .coming-soon-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem auto;
    width: fit-content;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    border: 1.5px solid rgba(59, 130, 246, 0.42);
    border-radius: 999px;
    padding: 0.55rem 1.2rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.06));
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    transition: all 0.2s ease;
  }

  .coming-soon-badge:hover {
    border-color: rgba(59, 130, 246, 0.65);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.1));
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.25);
    transform: translateY(-1px);
  }

  .coming-soon-title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    word-spacing: 0.1em;
  }

  .coming-soon-copy {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.72);
    max-width: 50ch;
    margin: 0 auto;
    display: block;
  }

  .coming-soon-contact {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    padding: 0.72rem 1.15rem;
    background: rgba(255, 255, 255, 0.04);
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .coming-soon-note {
    margin-top: 1.2rem;
    font-size: 0.97rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.82);
    display: block;
  }

  .coming-soon-note a {
    color: #ffffff;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }

  .coming-soon-links {
    margin-top: 1.25rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .coming-soon-forge {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    padding: 0.72rem 1.15rem;
    background: rgba(255, 255, 255, 0.04);
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .coming-soon-contact:hover,
  .coming-soon-forge:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.32);
    background: rgba(255, 255, 255, 0.08);
  }

  @media (min-width: 900px) {
    .coming-soon {
      padding: 2rem;
    }

    .coming-soon-card {
      width: min(760px, 100%);
      padding: 3.2rem 3rem;
      border-radius: 28px;
    }

    .coming-soon-logo {
      max-height: 72px;
      margin-bottom: 1.8rem;
    }

    .coming-soon-badge {
      font-size: 12px;
      letter-spacing: 0.14em;
      padding: 0.65rem 1.35rem;
      margin-bottom: 1.4rem;
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
    }

    .coming-soon-title {
      font-size: clamp(2.3rem, 4.2vw, 3.4rem);
      margin-bottom: 1.2rem;
      line-height: 1.2;
    }

    .coming-soon-copy {
      font-size: 1.08rem;
      line-height: 1.9;
      max-width: 55ch;
      color: rgba(255, 255, 255, 0.75);
    }

    .coming-soon-note {
      margin-top: 1.4rem;
      font-size: 1.02rem;
      line-height: 1.75;
    }

    .coming-soon-links {
      margin-top: 1.6rem;
      gap: 0.9rem;
    }
  }
  }

  @media (max-width: 640px) {
    .coming-soon-card {
      border-radius: 18px;
      padding: 1.6rem 1.15rem;
    }

    .coming-soon-logo {
      max-height: 50px;
      margin-bottom: 1rem;
    }

    .coming-soon-badge {
      font-size: 11px;
      padding: 0.35rem 0.75rem;
      margin-bottom: 0.85rem;
    }

    .coming-soon-title {
      font-size: clamp(1.6rem, 8vw, 2.2rem);
      margin-bottom: 0.65rem;
    }

    .coming-soon-copy {
      font-size: 0.95rem;
      line-height: 1.65;
    }

    .coming-soon-note {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .coming-soon-links {
      margin-top: 1rem;
      gap: 0.7rem;
      flex-direction: column;
      align-items: stretch;
    }

    .coming-soon-contact,
    .coming-soon-forge {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 10px;
      padding: 0.68rem 0.8rem;
      background: rgba(255, 255, 255, 0.03);
      min-height: 42px;
    }
  }

  @media (max-width: 380px) {
    .coming-soon {
      padding: 0.9rem;
    }

    .coming-soon-card {
      padding: 1.2rem 0.9rem;
    }
  }
`;

export default function ComingSoon() {
  const styleRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;

    return () => {
      tag.remove();
    };
  }, []);

  return (
    <main className="coming-soon">
      <section className="coming-soon-card" aria-label="Coming soon">
        <img src={logo} alt="SAMBX" className="coming-soon-logo" />
        <span className="coming-soon-badge">Temporary Page</span>
        <h1 className="coming-soon-title">Something great is coming soon.</h1>
        <p className="coming-soon-copy">
          We’re currently working behind the scenes to launch the new SAMBX
          experience. Please check back shortly.
        </p>
        <p className="coming-soon-note">
          For now, you can visit <a href="https://forge.sambx.in" target="_blank" rel="noreferrer">SAMBX Forge</a>.
        </p>
        <div className="coming-soon-links">
          <a className="coming-soon-contact" href="mailto:sambx.tech@gmail.com">
            Contact us →
          </a>
          <a
            className="coming-soon-forge"
            href="https://forge.sambx.in"
            target="_blank"
            rel="noreferrer"
          >
            SAMBX Forge ↗
          </a>
        </div>
      </section>
    </main>
  );
}
