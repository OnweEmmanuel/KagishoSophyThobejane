import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';

export function Service() {
  return (
    <section className="section section--alt" id="service">
      <div className="container">
        <SectionHeading
          num={8}
          eyebrow="Pro bono & community"
          title={<>Service <em>beyond the brief</em></>}
          intro="Mentorship, access to education and human-rights work, from student years onward."
        />
        <ul className="service" data-stagger>
          {profile.service.map((s) => (
            <li key={s.org} className="service__card spot">
              <span className="service__cause">{s.cause}</span>
              <h3>{s.org}</h3>
              <ul className="service__roles">
                {s.roles.map((r) => (
                  <li key={r.title}>
                    <strong>{r.title}</strong>
                    <span>{r.when}</span>
                  </li>
                ))}
              </ul>
              {s.description && <p>{s.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
