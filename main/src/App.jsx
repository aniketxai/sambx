import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  html {
    scroll-behavior: smooth;
  }

  body, .sx {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #080808;
    color: #f5f5f7;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  /* Background Gradients */
  .sx::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% -20%, rgba(14, 165, 233, 0.08) 0%, transparent 60%);
    pointer-events: none;
    z-index: -1;
  }

  /* Navigation */
  .sx-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2.5rem;
    height: 80px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    position: sticky;
    top: 0;
    background: rgba(8, 8, 8, 0.85);
    backdrop-filter: blur(16px) saturate(1.2);
    z-index: 100;
    animation: slideDown 0.6s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sx-logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .sx-logo:hover {
    transform: scale(1.05);
  }

  .sx-logo-img {
    width: auto;
    height: 48px;
    display: block;
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1));
  }

  .sx-nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .sx-nav-links a {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: all 0.3s ease;
    position: relative;
  }

  .sx-nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }

  .sx-nav-links a:hover {
    color: #f5f5f7;
  }

  .sx-nav-links a:hover::after {
    width: 100%;
  }

  .sx-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
    color: #f5f5f7;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
  }

  .sx-nav-cta:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
  }

  /* Hero Section */
  .sx-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 7rem 2rem 5rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }

  .sx-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .sx-hero-tag {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 1.5rem;
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sx-hero-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 3rem;
    padding: 16px 32px;
    border-radius: 16px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: fadeInUp 0.8s ease-out 0.1s both;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .sx-hero-badge::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .sx-hero-badge:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  }

  .sx-hero-badge:hover::before {
    opacity: 1;
  }

  .sx-hero-badge i {
    font-size: 18px;
    position: relative;
    z-index: 2;
  }

  .sx-hero-badge span {
    position: relative;
    z-index: 2;
  }

  .sx-hero-badge i {
    font-size: 16px;
    position: relative;
    z-index: 1;
  }

  .sx-hero-badge i {
    font-size: 14px;
  }

  .sx-hero-h1 {
    font-size: clamp(44px, 6.5vw, 72px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #f5f5f7;
    margin-bottom: 1.5rem;
    max-width: 900px;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .sx-hero-h1 .gradient-text {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .sx-hero-sub {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.65);
    max-width: 720px;
    margin-bottom: 2.5rem;
    animation: fadeInUp 0.8s ease-out 0.3s both;
  }

  .sx-hero-actions {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }

  .sx-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    letter-spacing: -0.01em;
    cursor: pointer;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .sx-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sx-btn:hover::before {
    opacity: 1;
  }

  .sx-btn-fill {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }

  .sx-btn-fill:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(59, 130, 246, 0.45);
  }

  .sx-btn-outline {
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
  }

  .sx-btn-outline:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
  }

  /* Sections */
  .sx-section {
    padding: 6rem 2.5rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    position: relative;
  }

  .sx-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
  }

  .sx-section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
    margin-bottom: 3.5rem;
    text-align: center;
  }

  .sx-section-head {
    max-width: 800px;
    margin: 0 auto 3.5rem;
    text-align: center;
  }

  .sx-section-title {
    font-size: clamp(32px, 4.5vw, 52px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #f5f5f7;
    margin-bottom: 1.2rem;
  }

  .sx-section-copy {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.55);
  }

  /* Grid Components */
  .sx-venture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .vcard {
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-decoration: none;
    color: #f5f5f7;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .vcard::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .vcard:hover {
    transform: translateY(-8px);
    border-color: rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 10, 0.92));
    box-shadow: 0 20px 48px rgba(59, 130, 246, 0.2);
  }

  .vcard:hover::before {
    opacity: 1;
  }

  .vcard-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .vcard-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 24px;
    color: rgba(59, 130, 246, 0.8);
    transition: all 0.3s ease;
  }

  .vcard:hover .vcard-icon {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.15));
    transform: scale(1.1) rotate(8deg);
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    border: 0.5px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.45);
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .badge-live {
    background: rgba(16, 185, 129, 0.12);
    color: rgba(16, 185, 129, 0.9);
    border-color: rgba(16, 185, 129, 0.25);
  }

  .vcard-name {
    font-size: 18px;
    font-weight: 700;
    color: #f5f5f7;
    margin: 0;
    letter-spacing: -0.02em;
    position: relative;
    z-index: 1;
  }

  .vcard-url {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.42);
    margin: 4px 0 0;
    position: relative;
    z-index: 1;
  }

  .vcard-desc {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .vcard-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  .vcard-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .sx-tag {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.55);
    background: rgba(59, 130, 246, 0.08);
    border: 0.5px solid rgba(59, 130, 246, 0.15);
    border-radius: 8px;
    padding: 6px 12px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .vcard:hover .sx-tag {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.25);
    color: rgba(59, 130, 246, 0.8);
  }

  .vcard-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: rgba(59, 130, 246, 0.8);
    margin-top: 8px;
    font-weight: 600;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .vcard:hover .vcard-link {
    color: #3b82f6;
    gap: 12px;
  }

  .vcard-link i {
    opacity: 0.85;
    transition: transform 0.3s ease;
  }

  .vcard:hover .vcard-link i {
    transform: translateX(4px);
  }

  /* Tech Stack */
  .sx-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .sx-tech-pill {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 10px 16px;
    letter-spacing: -0.01em;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .sx-tech-pill:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
    color: rgba(59, 130, 246, 0.9);
    transform: translateY(-3px);
  }

  /* Split Panels */
  .sx-split {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .sx-panel {
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.8));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .sx-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sx-panel:hover {
    border-color: rgba(59, 130, 246, 0.2);
    box-shadow: 0 12px 32px rgba(59, 130, 246, 0.1);
  }

  .sx-panel:hover::before {
    opacity: 1;
  }

  .sx-panel-title {
    font-size: 20px;
    font-weight: 700;
    color: #f5f5f7;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .sx-panel-copy {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.55);
    position: relative;
    z-index: 1;
  }

  /* About Section */
  .sx-about-wrap {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .sx-about-lead {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: -0.01em;
    color: rgba(255, 255, 255, 0.75);
  }

  .sx-about-body {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.9;
    color: rgba(255, 255, 255, 0.5);
  }

  .sx-about-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    margin: 0 auto;
    border-radius: 2px;
  }

  .sx-about-founder {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05));
    border: 1px solid rgba(59, 130, 246, 0.15);
    transition: all 0.3s ease;
  }

  .sx-about-founder:hover {
    border-color: rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.08));
  }

  .sx-founder-avatar {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 24px;
    color: rgba(59, 130, 246, 0.8);
  }

  .sx-founder-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    line-height: 1.3;
  }

  .sx-founder-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 4px;
  }

  .sx-founder-name {
    font-size: 17px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.01em;
  }

  .sx-founder-role {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 3px;
  }

  /* Contact Section */
  .sx-contact-block {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .sx-contact-actions {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.5rem;
  }

  /* Footer */
  .sx-footer {
    padding: 3rem 2.5rem;
    border-top: 0.5px solid rgba(255, 255, 255, 0.05);
    background: rgba(8, 8, 8, 0.95);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .sx-footer-copy {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 0.01em;
  }

  .sx-footer-links {
    display: flex;
    gap: 2rem;
  }

  .sx-footer-links a {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    position: relative;
  }

  .sx-footer-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }

  .sx-footer-links a:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  .sx-footer-links a:hover::after {
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .sx-nav {
      padding: 1rem 1.5rem;
      height: 72px;
    }

    .sx-logo-img {
      height: 40px;
    }

    .sx-nav-links {
      gap: 1.5rem;
    }

    .sx-hero {
      padding: 5rem 1.5rem 4rem;
    }

    .sx-section {
      padding: 4.5rem 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .sx-nav {
      padding: 1rem;
      height: 64px;
    }

    .sx-logo-img {
      height: 36px;
    }

    .sx-nav-links {
      display: none;
    }

    .sx-hero {
      padding: 3.5rem 1rem 2.5rem;
    }

    .sx-hero-h1 {
      font-size: 36px;
    }

    .sx-hero-sub {
      font-size: 15px;
    }

    .sx-section {
      padding: 3.5rem 1rem;
    }

    .sx-section-title {
      font-size: 28px;
    }

    .sx-venture-grid,
    .sx-split {
      grid-template-columns: 1fr;
    }

    .sx-footer {
      padding: 2rem 1rem;
      flex-direction: column;
      text-align: center;
    }

    .sx-footer-copy:first-child {
      order: -1;
    }
  }

  @media (max-width: 480px) {
    .sx-nav {
      height: 56px;
      padding: 0.75rem;
    }

    .sx-nav-cta {
      padding: 8px 14px;
      font-size: 12px;
    }

    .sx-hero {
      padding: 2.5rem 0.75rem 2rem;
    }

    .sx-hero-h1 {
      font-size: 28px;
    }

    .sx-hero-sub {
      font-size: 14px;
    }

    .sx-hero-actions {
      flex-direction: column;
      width: 100%;
    }

    .sx-btn {
      width: 100%;
    }

    .sx-section {
      padding: 2.5rem 0.75rem;
    }

    .sx-btn-outline,
    .sx-btn-fill {
      font-size: 12px;
      padding: 10px 16px;
    }
  }
`;

const ventures = [
  {
    icon: "ti ti-cube-3d-sphere",
    name: "Autonomous Systems",
    url: "Decision intelligence",
    desc: "Intelligent autonomy for real-world decision making, robust navigation, and context-aware system behavior.",
    tags: ["Autonomy", "Navigation", "AI"],
    badge: "Core",
    live: true,
    href: "#",
    linkLabel: "Learn more",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-cpu",
    name: "Robotics Engineering",
    url: "Precision machines",
    desc: "Designing modular robotic platforms with embedded control, perception, and deterministic systems engineering.",
    tags: ["Robotics", "Embedded", "Systems"],
    badge: "Build",
    live: false,
    href: "#",
    linkLabel: "Explore",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-drone",
    name: "Drone & Flight Systems",
    url: "Aerial platforms",
    desc: "Flight controllers, stabilization systems, and avionics for resilient aerial autonomy.",
    tags: ["Drones", "Flight", "Avionics"],
    badge: "Air",
    live: false,
    href: "#",
    linkLabel: "Explore",
    linkIcon: "ti ti-arrow-up-right",
  },
];

const projects = [
  {
    icon: "ti ti-robot",
    name: "Autonomous Robotics Platform",
    url: "Modular machine autonomy",
    desc: "A robotics stack combining edge AI, navigation, perception, and embedded control for field-ready intelligent machines.",
    tags: ["Robotics", "Edge AI", "Navigation"],
    badge: "Robot",
    live: false,
    href: "#",
    linkLabel: "View platform",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-circuit-resistor",
    name: "Embedded AI",
    url: "Intelligence at the edge",
    desc: "Machine learning on constrained hardware — optimized inference, RTOS integration, and low-latency decisioning.",
    tags: ["Edge AI", "MCUs", "ML"],
    badge: "Edge",
    live: false,
    href: "#",
    linkLabel: "Explore",
    linkIcon: "ti ti-arrow-up-right",
  },
  {
    icon: "ti ti-cube",
    name: "Advanced Manufacturing",
    url: "Digital to physical",
    desc: "Digital manufacturing and precision fabrication to convert engineered concepts into production-ready hardware.",
    tags: ["Manufacturing", "Fabrication", "3D"],
    badge: "Forge",
    live: false,
    href: "#forge",
    linkLabel: "Visit Forge",
    linkIcon: "ti ti-arrow-up-right",
  },
];

const technologies = [
  "React", "Node.js", "Python", "TensorFlow", "PyTorch", "ROS", "OpenCV", 
  "Arduino", "Raspberry Pi", "Docker", "Kubernetes", "MQTT", "AWS", "EdgeAI"
];

export default function App() {
  const styleRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;
    setIsLoaded(true);
    return () => tag.remove();
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="sx">
      {/* Navigation */}
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
        <a href="#forge" className="sx-nav-cta">
          Forge <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="sx-hero">
        <p className="sx-hero-tag">🚀 Engineering Intelligent Machines</p>
        <a href="#forge" className="sx-hero-badge">
          <i className="ti ti-hammer" aria-hidden="true" />
          <span>Explore SAMBX Forge</span>
        </a>
        <h1 className="sx-hero-h1">
          <span className="gradient-text">Autonomous AI Systems</span>
          <br />
          for the Future
        </h1>
        <p className="sx-hero-sub">
          SAMBX is a deep-tech ecosystem engineering AI-powered autonomous systems, robotics, embedded hardware, and advanced manufacturing — designed for exploration and next-generation intelligent machines.
        </p>
        <div className="sx-hero-actions">
          <a href="#ecosystem" className="sx-btn sx-btn-fill">
            <i className="ti ti-rocket" />
            Explore Ecosystem
          </a>
          <a href="#contact" className="sx-btn sx-btn-outline">
            Get in Touch <i className="ti ti-arrow-up-right" />
          </a>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="sx-section" id="ecosystem">
        <p className="sx-section-eyebrow">Ecosystem</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Core Capabilities</h2>
          <p className="sx-section-copy">
            A comprehensive ecosystem of AI, robotics, and intelligent systems
          </p>
        </div>
        <div className="sx-venture-grid">
          {ventures.map((v) => (
            <a key={v.name} className="vcard" href={v.href}>
              <div className="vcard-top">
                <div className="vcard-icon">
                  <i className={v.icon} aria-hidden="true" />
                </div>
                <span className={`badge${v.live ? " badge-live" : ""}`}>
                  {v.live && <i className="ti ti-circle-filled" aria-hidden="true" style={{ fontSize: "6px", marginRight: "4px" }} />}
                  {v.badge}
                </span>
              </div>
              <div>
                <p className="vcard-name">{v.name}</p>
                <p className="vcard-url">{v.url}</p>
              </div>
              <p className="vcard-desc">{v.desc}</p>
              <div className="vcard-divider" />
              <div className="vcard-tags">
                {v.tags.map((t) => (
                  <span key={t} className="sx-tag">{t}</span>
                ))}
              </div>
              <div className="vcard-link">
                <i className={v.linkIcon} aria-hidden="true" />
                {v.linkLabel}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="sx-section" id="technology">
        <p className="sx-section-eyebrow">Technology Stack</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Powered By Modern Tech</h2>
          <p className="sx-section-copy">
            Building with cutting-edge frameworks, tools, and platforms
          </p>
        </div>
        <div className="sx-tech-list">
          {technologies.map((tech) => (
            <span key={tech} className="sx-tech-pill">{tech}</span>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="sx-section" id="projects">
        <p className="sx-section-eyebrow">Projects</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">Featured Projects</h2>
          <p className="sx-section-copy">
            Prototype systems and applied engineering concepts for real-world deployment
          </p>
        </div>
        <div className="sx-venture-grid">
          {projects.map((project) => (
            <a key={project.name} className="vcard" href={project.href}>
              <div className="vcard-top">
                <div className="vcard-icon">
                  <i className={project.icon} aria-hidden="true" />
                </div>
                <span className={`badge${project.live ? " badge-live" : ""}`}>
                  {project.badge}
                </span>
              </div>
              <div>
                <p className="vcard-name">{project.name}</p>
                <p className="vcard-url">{project.url}</p>
              </div>
              <p className="vcard-desc">{project.desc}</p>
              <div className="vcard-divider" />
              <div className="vcard-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="sx-tag">{tag}</span>
                ))}
              </div>
              <div className="vcard-link">
                <i className={project.linkIcon} aria-hidden="true" />
                {project.linkLabel}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="sx-section" id="about">
        <p className="sx-section-eyebrow">About</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">SAMBX Mission</h2>
        </div>
        <div className="sx-about-wrap">
          <p className="sx-about-lead">
            <strong>Smart AI Machines Built for eXploration</strong> — representing innovation, experimentation, and the pursuit of future technologies.
          </p>
          <p className="sx-about-body">
            SAMBX combines artificial intelligence, robotics, embedded systems, autonomous machines, and advanced digital manufacturing into one evolving technology ecosystem. We're passionate about building the next generation of intelligent systems.
          </p>
          <div className="sx-about-divider" />
          <div className="sx-about-founder">
            <div className="sx-founder-avatar">
              <i className="ti ti-user" />
            </div>
            <div className="sx-founder-meta">
              <span className="sx-founder-label">Founder</span>
              <span className="sx-founder-name">Aniket Singh</span>
              <span className="sx-founder-role">Engineer & Builder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Forge Section */}
      <section className="sx-section" id="forge">
        <p className="sx-section-eyebrow">Manufacturing</p>
        <div className="sx-section-head">
          <h2 className="sx-section-title">SAMBX Forge</h2>
          <p className="sx-section-copy">
            Digital design to physical reality through precision engineering and additive manufacturing
          </p>
        </div>
        <div className="sx-split">
          <div className="sx-panel">
            <p className="sx-panel-title">From Concept to Creation</p>
            <p className="sx-panel-copy">
              Transform designs into physical products through precision engineering, 3D printing, and practical production workflows.
            </p>
          </div>
          <div className="sx-panel">
            <p className="sx-panel-title">Production Capabilities</p>
            <p className="sx-panel-copy">
              Rapid iteration, custom builds, and engineering-led fabrication for prototypes, systems, and future hardware platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="sx-section" id="contact">
        <p className="sx-section-eyebrow">Contact</p>
        <div className="sx-contact-block">
          <h2 className="sx-section-title">Let's Build Together</h2>
          <p className="sx-section-copy">
            Interested in collaboration, innovation, or engineering projects? Connect with SAMBX and become part of the journey toward intelligent systems.
          </p>
          <div className="sx-contact-actions">
            <a href="mailto:hello@sambx.in" className="sx-btn sx-btn-fill">
              <i className="ti ti-mail" />
              Start a Conversation
            </a>
            <a href="https://forge.sambx.in" target="_blank" rel="noreferrer" className="sx-btn sx-btn-outline">
              Visit Forge <i className="ti ti-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sx-footer">
        <div>
          <div className="sx-footer-copy"><strong>SAMBX</strong> — Smart AI Machines Built for eXploration</div>
          <div className="sx-footer-copy" style={{ marginTop: "0.5rem" }}>Engineering intelligent systems through AI, robotics, and advanced manufacturing.</div>
          <div className="sx-footer-copy" style={{ marginTop: "0.5rem", color: "rgba(255,255,255,0.25)" }}>© 2026 SAMBX. All rights reserved.</div>
        </div>
        <div className="sx-footer-links">
          <a href="https://instagram.com/sambxforge" target="_blank" rel="noreferrer">
            Instagram <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} />
          </a>
          <a href="mailto:hello@sambx.in">Contact</a>
          <a href="https://forge.sambx.in" target="_blank" rel="noreferrer">
            Forge <i className="ti ti-arrow-up-right" aria-hidden="true" style={{ fontSize: "11px" }} />
          </a>
        </div>
      </footer>
    </div>
  );
}
