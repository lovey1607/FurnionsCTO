'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { isNonEmptyString, isValidEmail, isValidPhone } from '../../lib/validation';
import { LockIcon } from '../icons/LockIcon';

type CommunityFormValues = {
  name: string;
  email: string;
  phone: string;
};

type CommunityFormErrors = Partial<Record<keyof CommunityFormValues, string>>;

type StoredRequest = CommunityFormValues & {
  submittedAt: string;
};

const STORAGE_KEY = 'furnions.community.requests';

export function CommunitySection() {
  const shouldReduceMotion = useReducedMotion();

  const [values, setValues] = useState<CommunityFormValues>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<CommunityFormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = useCallback((next: CommunityFormValues): CommunityFormErrors => {
    const nextErrors: CommunityFormErrors = {};

    if (!isNonEmptyString(next.name)) nextErrors.name = 'Please enter your name.';
    if (!isValidEmail(next.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!isValidPhone(next.phone)) nextErrors.phone = 'Please enter a valid phone number.';

    return nextErrors;
  }, []);

  return (
    <section id="community" className="section" aria-labelledby="community-title">
      <div className="container">
        <m.div
          className="exclusiveCard"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.75 } }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -5,
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }
          }
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="exclusiveHeader">
            <m.div
              className="exclusiveIcon"
              aria-hidden
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LockIcon width={22} height={22} />
            </m.div>
            <div>
              <h2 id="community-title" className="exclusiveTitle">
                Join Furnions Owners Community
              </h2>
              <p className="exclusiveSubtitle">Exclusive access for verified owners</p>
            </div>
          </div>

          <div className="exclusiveGrid">
            <ul className="benefits" aria-label="Community benefits">
              <li>Get latest product drops</li>
              <li>Exclusive previews</li>
              <li>Early access to launches</li>
              <li>Community support</li>
            </ul>

            <div>
              <m.form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();

                  const nextErrors = validate(values);
                  setErrors(nextErrors);

                  if (Object.keys(nextErrors).length > 0) return;

                  try {
                    const raw = window.localStorage.getItem(STORAGE_KEY);
                    const existing: StoredRequest[] = raw ? (JSON.parse(raw) as StoredRequest[]) : [];

                    const next: StoredRequest = { ...values, submittedAt: new Date().toISOString() };
                    window.localStorage.setItem(
                      STORAGE_KEY,
                      JSON.stringify([next, ...existing].slice(0, 50)),
                    );
                  } catch {
                    // ignore
                  }

                  setIsSuccess(true);
                  setValues({ name: '', email: '', phone: '' });
                  setErrors({});
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
              >
                <div className="formRow">
                  <div className="field">
                    <label className="label" htmlFor="owners-name">
                      Name
                    </label>
                    <input
                      id="owners-name"
                      className="input"
                      value={values.name}
                      onChange={(e) => {
                        setIsSuccess(false);
                        setValues((v) => ({ ...v, name: e.target.value }));
                      }}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'owners-name-error' : undefined}
                    />
                    <AnimatePresence>
                      {errors.name ? (
                        <m.p
                          id="owners-name-error"
                          className="fieldError"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          {errors.name}
                        </m.p>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="owners-email">
                      Email
                    </label>
                    <input
                      id="owners-email"
                      type="email"
                      className="input"
                      value={values.email}
                      onChange={(e) => {
                        setIsSuccess(false);
                        setValues((v) => ({ ...v, email: e.target.value }));
                      }}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'owners-email-error' : undefined}
                    />
                    <AnimatePresence>
                      {errors.email ? (
                        <m.p
                          id="owners-email-error"
                          className="fieldError"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          {errors.email}
                        </m.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="owners-phone">
                    Phone
                  </label>
                  <input
                    id="owners-phone"
                    type="tel"
                    className="input"
                    value={values.phone}
                    onChange={(e) => {
                      setIsSuccess(false);
                      setValues((v) => ({ ...v, phone: e.target.value }));
                    }}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'owners-phone-error' : undefined}
                  />
                  <AnimatePresence>
                    {errors.phone ? (
                      <m.p
                        id="owners-phone-error"
                        className="fieldError"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        {errors.phone}
                      </m.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="formActions">
                  <m.button
                    type="submit"
                    className="button buttonPrimary"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    Request Access
                  </m.button>

                  <AnimatePresence>
                    {isSuccess ? (
                      <m.p
                        className="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                      >
                        Request received — we’ll be in touch.
                      </m.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </m.form>

              <p className="formHint">Frontend only: submissions are stored locally on this device.</p>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
