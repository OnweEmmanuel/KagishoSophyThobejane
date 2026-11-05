import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { T } from '../components/Text';

export function About() {
  const admitted = profile.path.find((s) => s.milestone)!;
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading num={1} eyebrow="Preamble" title={<>About <em>Kagisho</em></>} />

        <div className="about">
          <div className="about__text">
            {profile.about.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? 'dropcap' : ''}`}>
                {p}
              </p>
            ))}

            <dl className="facts reveal">
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>{profile.currentRole}</dd>
              </div>
              <div>
                <dt>Admitted</dt>
                <dd>
                  High Court of South Africa · <T v={admitted.when} />
                </dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>
                  <T v={profile.languages} />
                </dd>
              </div>
            </dl>
          </div>

          <ul className="stats" data-stagger>
            {profile.stats.map((s) => (
              <li key={s.label} className="stat spot">
                <span className="stat__value">
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </span>
                <span className="stat__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
