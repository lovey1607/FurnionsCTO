'use client';

import { m, useReducedMotion } from 'framer-motion';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const WHATSAPP_URL = 'https://wa.me/15551234567';

export function FloatingWhatsAppButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="whatsApp"
      aria-label="Open WhatsApp chat"
      animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <span className="srOnly">Chat on WhatsApp</span>
      <WhatsAppIcon width={22} height={22} />
    </m.a>
  );
}
