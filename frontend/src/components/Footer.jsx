import { Link } from 'react-router-dom';
import {
  Code,
  Globe,
  Share2,
  Mail,
} from 'lucide-react';

import Logo from './Logo';
import logoImage from '../assets/logo.png';
import { useState } from "react";



const footerLinks = {
  Products: [
    {
      label: 'Lithophane Lamps',
      to: '/products?category=Lithophane+Lamps',
    },
    {
      label: 'Keychains',
      to: '/products?category=Keychains',
    },
    {
      label: 'Robotics Parts',
      to: '/products?category=Robotics+Parts',
    },
    {
      label: 'Drone Components',
      to: '/products?category=Drone+Components',
    },
  ],

  Services: [
    {
      label: '3D Printing',
      to: '/services',
    },
    {
      label: 'Rapid Prototyping',
      to: '/services',
    },
    {
      label: 'Product Design',
      to: '/services',
    },
    {
      label: 'Custom Enclosures',
      to: '/services',
    },
  ],

  Company: [
    {
      label: 'About',
      to: '/about',
    },
    {
      label: 'Contact',
      to: '/contact',
    },
  ],

  Catalogue: [
    {
      label: 'Download Catalogue',
      to: '/catalogue.pdf',
    },
  ],
};

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


export default function Footer() {
  const [isSharing, setIsSharing] = useState(false);
  return (
    <footer className="bg-surface-container border-t border-surface-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Logo
              useImage
              imageSrc={logoImage}
              size="lg"
              className="mb-4"
            />

            <p className="text-secondary-text text-sm leading-relaxed max-w-sm mb-5">
              Powered by SAMBX. Precision 3D printing
              across India.
            </p>

            
           {/* ICONS */}
<div className="flex items-center gap-3">
  {[
    {
      icon: Globe,
      href: 'https://sambx.vercel.app',
    },
    {
  icon: Share2,
  onClick: async () => {
    if (isSharing) return;

    try {
      setIsSharing(true);

      if (navigator.share) {
        await navigator.share({
          title: 'SAMBX',
          url: 'https://sambx.vercel.app/',
        });
      } else {
        window.open('https://sambx.vercel.app/', '_blank');
      }
    } catch (err) {
      console.log("Share cancelled or failed", err);
    } finally {
      setIsSharing(false);
    }
  },
},
    {
      icon: InstagramIcon,
      href: 'https://instagram.com/sambx.forge',
    },
    {
      icon: Mail,
      href: 'mailto:sambx.tech@gmail.com',
    },
  ].map((item, i) => {
    const Icon = item.icon;

    return item.onClick ? (
      <button
        key={i}
        onClick={item.onClick}
        className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-outline hover:bg-primary hover:text-white transition-material"
      >
        <Icon size={16} />
      </button>
    ) : (
      <a
        key={i}
        href={item.href}
        target={item.href.startsWith('http') ? '_blank' : undefined}
        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-outline hover:bg-primary hover:text-white transition-material"
      >
        <Icon size={16} />
      </a>
    );
  })}
</div>
          </div>
          {/* FOOTER LINKS */}
          {Object.entries(footerLinks).map(
            ([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-foreground text-sm mb-4">
                  {title}
                </h4>

                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to &&
                      link.to.endsWith('.pdf') ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-text text-sm hover:text-primary transition-material"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-secondary-text text-sm hover:text-primary transition-material"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-8 border-t border-surface-muted flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-outline">
            © 2026 SAMBX Forge. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-outline hover:text-primary transition-material"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-xs text-outline hover:text-primary transition-material"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-xs text-outline hover:text-primary transition-material"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}