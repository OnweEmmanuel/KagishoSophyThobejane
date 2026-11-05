/**
 * Original line-art courthouse facade (columns, pediment, dome) for the hero background.
 * Every element is a stroke so GSAP can draw it in.
 */
const COLS = 8;
const COL_W = 44;
const X0 = 230;
const X1 = 970;

export function Courthouse() {
  const step = (X1 - X0) / (COLS - 1);
  const cols = Array.from({ length: COLS }, (_, i) => X0 + i * step);

  return (
    <div className="courthouse-wrap" aria-hidden="true">
    <svg className="courthouse" viewBox="0 -130 1200 720" fill="none" preserveAspectRatio="xMidYMax meet">
      <g className="courthouse__lines">
        {/* dome + lantern */}
        <path d="M600 -112v-14" />
        <path d="M588 -84q12-26 24 0z" />
        <path d="M584 -84h32v18h-32z" />
        <path d="M490 40A110 110 0 0 1 710 40" />
        <path d="M530 40q14-80 70-104" />
        <path d="M670 40q-14-80-70-104" />
        <path d="M600 -66V40" />
        <path d="M474 40h252v10H474z" />
        <path d="M484 50h232v40H484z" />
        {[512, 548, 584, 616, 652, 688].map((x) => (
          <path key={x} d={`M${x} 58v24`} />
        ))}

        {/* pediment */}
        <path d="M165 196 600 90l435 106z" />
        <path d="M218 186 600 110l382 76z" />
        <circle cx="600" cy="158" r="22" />
        <path d="M600 142v30M588 150h24M588 150l-6 12h12zM612 150l-6 12h12z" />

        {/* entablature */}
        <path d="M160 196h880v8H160z" />
        <path d="M180 204h840v16H180z" />
        <path d="M184 220h832v16H184z" />
        <text x="600" y="217" textAnchor="middle" className="courthouse__frieze">
          JUSTITIA · VERITAS · LEX
        </text>

        {/* columns */}
        {cols.map((cx) => {
          const l = cx - COL_W / 2;
          const r = cx + COL_W / 2;
          return (
            <g key={cx}>
              <path d={`M${l - 8} 236h${COL_W + 16}v8H${l - 8}z`} />
              <path d={`M${l - 3} 244h${COL_W + 6}l-4 8H${l + 1}z`} />
              <circle cx={l - 2} cy={248} r={4} />
              <circle cx={r + 2} cy={248} r={4} />
              <path d={`M${l + 2} 252V500M${r - 2} 252V500`} />
              <path d={`M${cx - 9} 262V490M${cx} 262V490M${cx + 9} 262V490`} className="thin" />
              <path d={`M${l - 4} 500h${COL_W + 8}v6H${l - 4}zM${l - 8} 506h${COL_W + 16}v6H${l - 8}z`} />
            </g>
          );
        })}

        {/* doors */}
        <path d="M566 512V432a34 34 0 0 1 68 0v80" />
        <path d="M600 398v114" className="thin" />
        <path d="M455 512v-58a22 22 0 0 1 44 0v58M701 512v-58a22 22 0 0 1 44 0v58" className="thin" />

        {/* plinth + steps */}
        <path d="M170 512h860v12H170z" />
        <path d="M140 524h920v16H140z" />
        <path d="M110 540h980v16H110z" />
        <path d="M80 556h1040v16H80z" />
        <path d="M20 572h1160" />
      </g>
    </svg>
    </div>
  );
}
