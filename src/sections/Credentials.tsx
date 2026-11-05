import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { T } from '../components/Text';

const letter = (i: number) => String.fromCharCode(65 + i);

export function Credentials() {
  const featured = profile.certificates.filter((c) => c.featured);
  const rest = profile.certificates.filter((c) => !c.featured);

  return (
    <section className="section section--alt" id="credentials">
      <div className="container">
        <SectionHeading num={5} eyebrow="Education & credentials" title={<>Entered <em>into evidence</em></>} />

        <ul className="exhibits" data-stagger>
          {profile.education.map((e, i) => (
            <li key={e.qualification} className="exhibit spot tilt">
              <span className="exhibit__tag">
                <span className="exhibit__hole" aria-hidden="true" />
                Exhibit {letter(i)}
              </span>
              <span className="exhibit__icon draw">
                <Icon name={e.icon} size={34} strokeWidth={1.25} />
              </span>
              <h3>{e.qualification}</h3>
              <p className="exhibit__inst">{e.institution}</p>
              <p className="exhibit__when">
                {e.when}
                {e.note && (
                  <>
                    {' · '}
                    <T v={e.note} />
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="subhead reveal">Certifications</h3>
        <div className="certs">
          <ul className="certs__featured" data-stagger>
            {featured.map((c) => (
              <li key={c.issuer}>
                <a className="cert spot" href={c.url} target="_blank" rel="noopener noreferrer">
                  <span className="cert__issuer">{c.issuer}</span>
                  <span className="cert__name">{c.name}</span>
                  <span className="cert__foot">
                    <span>
                      {c.issued}
                      {c.credentialId && <> · ID {c.credentialId}</>}
                    </span>
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="certs__list reveal">
            {rest.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  <span>{c.name}</span>
                  <span className="certs__meta">
                    {c.issuer} · {c.issued} <Icon name="arrow-up-right" size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
