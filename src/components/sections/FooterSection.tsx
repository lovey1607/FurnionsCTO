'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { isValidEmail } from '../../lib/validation';

const navLinks = [
  { href: '#hero', label: 'Top' },
  { href: '#who-we-serve', label: 'Who we serve' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#about', label: 'About' },
  { href: '#community', label: 'Community' },
  { href: '#contact', label: 'Contact' },
] as const;

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://pinterest.com', label: 'Pinterest' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
] as const;

export function FooterSection() {
  const shouldReduceMotion = useReducedMotion();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer" aria-labelledby="footer-title">
      <div className="container">
        <div className="footerGrid">
          <div>
            <h2 id="footer-title" className="footerBrand">
              Furnions
            </h2>
            <p className="footerTagline">
              Small aesthetic furniture for cafes, Airbnbs, offices &amp; modern homes.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="footerNav">
            <p className="footerHeading">Quick links</p>
            <ul className="footerList">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <m.a
                    href={l.href}
                    className="footerLink"
                    whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footerHeading">Social</p>
            <ul className="footerList">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <m.a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footerLink"
                    whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {l.label}
                  </m.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footerHeading">Newsletter</p>
            <p className="footerSmall">Optional demo signup — stored locally only.</p>

            <form
              className="newsletter"
              onSubmit={(e) => {
                e.preventDefault();
                setNewsletterSuccess(false);

                if (!isValidEmail(newsletterEmail)) {
                  setNewsletterError('Enter a valid email.');
                  return;
                }

                setNewsletterError(null);
                setNewsletterSuccess(true);
                setNewsletterEmail('');
              }}
            >
              <label className="srOnly" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                className="input"
                type="email"
                autoComplete="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterSuccess(false);
                  setNewsletterEmail(e.target.value);
                }}
                placeholder="Email address"
              />
              <m.button
                className="button buttonTertiary"
                type="submit"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                Sign up
              </m.button>
            </form>

            <AnimatePresence>
              {newsletterError ? (
                <m.p
                  className="fieldError"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  {newsletterError}
                </m.p>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {newsletterSuccess ? (
                <m.p
                  className="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  Signed up (demo).
                </m.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="footerBottom">
          <p className="footerSmall">© {year} Furnions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
