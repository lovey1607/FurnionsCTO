'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { isNonEmptyString, isValidEmail, isValidPhone } from '../../lib/validation';

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const [values, setValues] = useState<ContactValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = useCallback((next: ContactValues): ContactErrors => {
    const nextErrors: ContactErrors = {};

    if (!isNonEmptyString(next.name)) nextErrors.name = 'Please enter your name.';
    if (!isValidEmail(next.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!isValidPhone(next.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!isNonEmptyString(next.message)) nextErrors.message = 'Please enter a short message.';

    return nextErrors;
  }, []);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <header className="sectionHeader centered">
          <p className="sectionKicker">Contact</p>
          <h2 id="contact-title" className="sectionTitle">
            Let’s design your space.
          </h2>
          <p className="sectionSubtitle">
            Tell us what you’re building. We’ll respond with recommendations within this demo experience.
          </p>
        </header>

        <m.form
          className="contactCard"
          onSubmit={(e) => {
            e.preventDefault();
            const nextErrors = validate(values);
            setErrors(nextErrors);

            if (Object.keys(nextErrors).length > 0) return;

            setIsSuccess(true);
            setErrors({});
            setValues({ name: '', email: '', phone: '', message: '' });
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
        >
          <div className="floatingGrid">
            <FloatingField
              id="contact-name"
              label="Name"
              value={values.name}
              onChange={(v) => {
                setIsSuccess(false);
                setValues((prev) => ({ ...prev, name: v }));
              }}
              error={errors.name}
              autoComplete="name"
            />
            <FloatingField
              id="contact-email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(v) => {
                setIsSuccess(false);
                setValues((prev) => ({ ...prev, email: v }));
              }}
              error={errors.email}
              autoComplete="email"
            />
            <FloatingField
              id="contact-phone"
              label="Phone"
              type="tel"
              value={values.phone}
              onChange={(v) => {
                setIsSuccess(false);
                setValues((prev) => ({ ...prev, phone: v }));
              }}
              error={errors.phone}
              autoComplete="tel"
            />
          </div>

          <FloatingField
            id="contact-message"
            label="Message"
            value={values.message}
            onChange={(v) => {
              setIsSuccess(false);
              setValues((prev) => ({ ...prev, message: v }));
            }}
            error={errors.message}
            textarea
          />

          <div className="formActions">
            <m.button
              type="submit"
              className="button buttonSecondary"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              Send message
            </m.button>

            <AnimatePresence>
              {isSuccess ? (
                <m.p
                  className="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  Message sent (demo) — thanks for reaching out.
                </m.p>
              ) : null}
            </AnimatePresence>
          </div>

          <p className="formHint">No external API calls. This form validates client-side only.</p>
        </m.form>
      </div>
    </section>
  );
}

function FloatingField({
  id,
  label,
  value,
  onChange,
  error,
  type,
  autoComplete,
  textarea,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="floatingField">
      {textarea ? (
        <textarea
          id={id}
          className="floatingInput"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          rows={5}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          className="floatingInput"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          type={type ?? 'text'}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}

      <label className="floatingLabel" htmlFor={id}>
        {label}
      </label>

      <AnimatePresence>
        {error ? (
          <m.p
            id={describedBy}
            className="fieldError"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {error}
          </m.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
