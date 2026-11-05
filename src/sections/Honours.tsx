import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Medal } from '../components/Medal';

/** Point and tangent angle on a cubic Bézier. */
function bezier(t: number, p: number[][]) {
  const u = 1 - t;
  const x = u ** 3 * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t ** 3 * p[3][0];
  const y = u ** 3 * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t ** 3 * p[3][1];
  const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const STEM_L = [[100, 192], [40, 186], [14, 120], [36, 40]];
const STEM_R = STEM_L.map(([x, y]) => [200 - x, y]);
const LEAF = 'M0 0c6-9 18-12 26-10-6 9-17 12-26 10z'; // points along +x

function Laurel() {
  const ts = [0.14, 0.26, 0.38, 0.5, 0.62, 0.74, 0.86, 0.97];
  const leaves = (stem: number[][], side: 1 | -1) =>
    ts.flatMap((t, i) => {
      const { x, y, angle } = bezier(t, stem);
      // outer and inner leaf at each node, angled off the stem
      return [
        <path key={`${side}o${i}`} d={LEAF} transform={`translate(${x} ${y}) rotate(${angle - side * 38})`} />,
        <path key={`${side}i${i}`} d={LEAF} transform={`translate(${x} ${y}) rotate(${angle + side * 32}) scale(.8)`} />,
      ];
    });
  const d = (p: number[][]) => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`;
  return (
    <svg className="laurel draw" viewBox="0 0 200 210" fill="none" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <path d={d(STEM_L)} />
      <path d={d(STEM_R)} />
      {leaves(STEM_L, 1)}
      {leaves(STEM_R, -1)}
      <path d="M86 196c6 4 22 4 28 0" />
    </svg>
  );
}

export function Honours() {
  return (
    <section className="section" id="honours">
      <div className="container">
        <SectionHeading num={7} eyebrow="Honours & awards" title={<>A record of <em>distinction</em></>} />

        <div className="honours">
          <div className="honours__feature reveal">
            <div className="honours__wreath">
              <Laurel />
              <p className="honours__big">
                <span data-count="3">3</span>×
              </p>
            </div>
            <p className="honours__cap">Position 1 merit awards in a single year (2019), University of Limpopo</p>
          </div>

          <ol className="honours__list" data-stagger>
            {profile.awards.map((a) => (
              <li key={a.name} className={`award award--${a.kind} spot`}>
                <Medal kind={a.kind} />
                <div className="award__body">
                  <span className="award__tag">{a.tag}</span>
                  <h3>{a.name.replace(/^(Position 1|Top 3) Merit Award: /, '')}</h3>
                  <p>
                    {a.name.match(/^(Position 1|Top 3) Merit Award/) ? `${a.name.split(':')[0]} · ` : ''}
                    {a.issuer} · {a.date}
                  </p>
                </div>
                <span className={`badge badge--${a.institution.toLowerCase()}`} title={a.institution === 'UCT' ? 'University of Cape Town' : 'University of Limpopo'}>
                  {a.institution}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
