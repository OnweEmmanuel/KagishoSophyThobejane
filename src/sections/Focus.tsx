import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

export function Focus() {
  return (
    <section className="section" id="focus">
      <div className="container">
        <SectionHeading
          num={2}
          eyebrow="Areas of focus"
          title={<>Where law meets <em>revenue</em></>}
          intro="A foundation in litigation and practice, now deepened by hands-on work inside South Africa’s revenue authority."
        />
        <ul className="focus" data-stagger>
          {profile.focus.map((f, i) => (
            <li key={f.title} className="focus__card spot tilt">
              <span className="focus__index">{String.fromCharCode(97 + i)}.</span>
              <span className="focus__icon draw">
                <Icon name={f.icon} size={40} strokeWidth={1.25} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
