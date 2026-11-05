import { duration, formatYM, profile, type Role } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { T } from '../components/Text';

function CaseFile({ role, index }: { role: Role; index: number }) {
  const active = role.end === null;
  const caseNo = `${role.start.replace('-', '/')}`;
  return (
    <article className="case reveal">
      <div className="case__tab">
        <span>Case No. {caseNo}</span>
        <span className="case__tab-org">{role.orgShort ?? role.org}</span>
      </div>
      <div className="case__body spot">
        <span className={`stamp ${active ? 'stamp--active' : ''}`} aria-label={active ? 'Current role' : 'Concluded role'}>
          {active ? 'Current' : 'Concluded'}
        </span>
        <p className="case__meta">
          {formatYM(role.start)} – {formatYM(role.end)} · {duration(role.start, role.end)}
        </p>
        <h3 className="case__title">{role.title}</h3>
        <p className="case__org">
          {role.org}
          <span className="case__where">
            <Icon name="pin" size={14} /> {role.location} · {role.mode} · {role.type}
          </span>
        </p>
        {role.summary && (
          <p className="case__summary">
            <T v={role.summary} />
          </p>
        )}
        {role.tags && (
          <ul className="docket" aria-label="Areas of exposure">
            {role.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {role.highlights && (
          <ul className="case__highlights">
            {role.highlights.map((h, i) => (
              <li key={i}>
                <span className="para" aria-hidden="true">
                  {index + 1}.{i + 1}
                </span>
                <T v={h} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function Carried({ role }: { role: Role }) {
  return (
    <>
      {role.lesson && <p className="earlier__lesson">{role.lesson}</p>}
      {role.carried && (
        <ul className="earlier__carried" aria-label="Skills carried forward">
          {role.carried.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
    </>
  );
}

/** A support-desk ticket, marked resolved. */
function Ticket({ role }: { role: Role }) {
  return (
    <article className="ticket spot">
      <header className="ticket__head">
        <span>
          <Icon name="headset" size={16} /> Ticket #{role.start.replace('-', '')}
        </span>
        <span className="ticket__status">
          <Icon name="check" size={14} strokeWidth={2.5} /> Resolved
        </span>
      </header>
      <div className="ticket__body">
        <p className="ticket__meta">
          {formatYM(role.start)} – {formatYM(role.end)} · {role.mode}
        </p>
        <h4>{role.title.split('·')[0].trim()}</h4>
        <p className="ticket__org">
          {role.org}
          {role.title.includes('·') && <span> · {role.title.split('·')[1].trim()}</span>}
        </p>
        <Carried role={role} />
      </div>
    </article>
  );
}

/** A bank card whose "valid" dates are the dates of the role. */
function BankCard({ role }: { role: Role }) {
  const mmyy = (ym: Role['start']) => `${ym.slice(5)}/${ym.slice(2, 4)}`;
  return (
    <article className="bankwrap">
      <div className="bankcard spot tilt">
        <div className="bankcard__top">
          <span className="bankcard__org">{role.org}</span>
          <svg className="bankcard__waves" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 7a7 7 0 0 1 0 10M12 5a10 10 0 0 1 0 14M16 3a13 13 0 0 1 0 18" />
          </svg>
        </div>
        <span className="bankcard__chip" aria-hidden="true" />
        <p className="bankcard__number" aria-hidden="true">
          •••• •••• •••• {role.start.slice(0, 4)}
        </p>
        <div className="bankcard__bottom">
          <div>
            <small>Role</small>
            <span>{role.title}</span>
          </div>
          <div>
            <small>Valid</small>
            <span>
              {mmyy(role.start)} – {mmyy(role.end ?? role.start)}
            </span>
          </div>
        </div>
      </div>
      <div className="bankwrap__text">
        <p className="ticket__meta">
          {role.location} · {role.mode}
        </p>
        <Carried role={role} />
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading num={4} eyebrow="Experience" title={<>The <em>case files</em></>} intro="Professional roles, most recent first." />

        <div className="cases">
          {profile.experience.map((r, i) => (
            <CaseFile key={r.org} role={r} index={i} />
          ))}
        </div>

        <div className="earlier">
          <div className="earlier__head reveal">
            <h3 className="earlier__title">
              Before <em>the bar</em>
            </h3>
            <p>Not legal roles, but very much part of the story: where client care and composure were learned.</p>
          </div>
          <div className="earlier__grid" data-stagger>
            {profile.earlierExperience.map((r) => (r.org === 'Capitec' ? <BankCard key={r.org} role={r} /> : <Ticket key={r.org} role={r} />))}
          </div>
        </div>
      </div>
    </section>
  );
}
