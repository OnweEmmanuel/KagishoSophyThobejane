import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

export function Skills() {
  return (
    <section className="section section--stone" id="skills">
      <div className="container">
        <SectionHeading num={6} eyebrow="Competencies" title={<>Skills <em>of the practice</em></>} />
        <div className="skills" data-stagger>
          {profile.skills.map((g) => (
            <div key={g.group} className={`skills__group spot ${g.group === 'Supporting' ? 'is-muted' : ''}`}>
              <h3>
                <Icon name={g.icon} size={22} /> {g.group}
              </h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
