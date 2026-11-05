import { useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { T } from '../components/Text';
import { Seal } from '../components/Seal';
import { FORM_ENDPOINT, FORM_LIVE } from '../lib/config';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORM_LIVE) return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const locked = !FORM_LIVE || status === 'sending';

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading num={9} eyebrow="Correspondence" title={<>Request a <em>consultation</em></>} />

        <div className="letterhead reveal">
          <div className="letterhead__side">
            <Seal monogram={profile.monogram} flat className="letterhead__seal" />
            <p className="letterhead__name">{profile.name}</p>
            <p className="letterhead__role">{profile.title}</p>
            <ul className="letterhead__details">
              <li>
                <Icon name="pin" size={18} /> {profile.location}
              </li>
              <li>
                <Icon name="mail" size={18} /> <T v={profile.email} />
              </li>
              <li>
                <Icon name="phone" size={18} /> <T v={profile.phone} />
              </li>
              <li>
                <Icon name="linkedin" size={18} />
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn profile
                </a>
              </li>
            </ul>
            <button className="btn btn--outline" type="button" disabled title="CV download available once approved">
              <Icon name="download" size={18} /> Download CV <span className="ph ph--inline">soon</span>
            </button>
          </div>

          <form className="letterhead__form" onSubmit={onSubmit}>
            {/* honeypot: bots fill it, people never see it */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />
            <p className="letterhead__re">
              <span>Re:</span> Enquiry
            </p>
            {status === 'sent' ? (
              <p className="letterhead__thanks">Thank you. Your message has been received.</p>
            ) : (
              <>
                <label>
                  <span>Full name</span>
                  <input name="name" autoComplete="name" required disabled={locked} />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" required disabled={locked} />
                </label>
                <label>
                  <span>Nature of enquiry</span>
                  <textarea name="message" rows={5} required disabled={locked} />
                </label>
                <button className="btn btn--scarlet" type="submit" disabled={locked}>
                  {!FORM_LIVE ? (
                    <>
                      <Icon name="lock" size={18} /> Opens once this draft is approved
                    </>
                  ) : status === 'sending' ? (
                    'Sending…'
                  ) : (
                    'Send enquiry'
                  )}
                </button>
                {status === 'error' && (
                  <p className="letterhead__error" role="alert">
                    Something went wrong. Please try again, or reach out via LinkedIn.
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
