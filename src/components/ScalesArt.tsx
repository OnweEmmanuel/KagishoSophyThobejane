/**
 * Hero illustration: a column-mounted scale of justice.
 * Left pan holds a law book, right pan a stack of coins: law and tax in balance.
 * Elements with `.stroke` are line-drawn by GSAP; groups are animated by class.
 */
export function ScalesArt() {
  return (
    <svg className="scales" viewBox="0 0 400 440" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* halo rings */}
      <circle className="scales__halo" cx="200" cy="215" r="188" />
      <circle className="scales__halo scales__halo--dash" cx="200" cy="215" r="160" />

      {/* column + plinth */}
      <g className="scales__column">
        <path className="stroke" d="M200 40v15" />
        <circle className="stroke" cx="200" cy="64" r="9" />
        <path className="stroke" d="M200 119v9" />
        <path className="stroke" d="M178 128h44l-6 9h-32z" />
        <path className="stroke" d="M188 137v219" />
        <path className="stroke" d="M212 137v219" />
        <path className="stroke thin" d="M196 150v196" />
        <path className="stroke thin" d="M204 150v196" />
        <path className="stroke" d="M166 356h68l14 16H152z" />
        <path className="stroke" d="M126 372h148l8 18H118z" />
        <path className="stroke thin" d="M100 404h200" />
      </g>

      {/* beam (rotates about the pivot) */}
      <g className="scales__beam">
        <path className="stroke" d="M70 112Q200 94 330 112" />
        <circle className="stroke" cx="200" cy="112" r="7" />
        <circle className="stroke" cx="70" cy="112" r="3.5" />
        <circle className="stroke" cx="330" cy="112" r="3.5" />
      </g>

      {/* left hanger: law */}
      <g className="scales__pan scales__pan--l">
        <path className="stroke thin" d="M70 116 36 228" />
        <path className="stroke thin" d="M70 116l34 112" />
        <path className="fill-in pan-fill" d="M26 228h88q-6 34-44 36-38-2-44-36z" />
        <path className="stroke" d="M26 228h88q-6 34-44 36-38-2-44-36z" />
        <g className="fill-in">
          <rect className="book" x="47" y="210" width="46" height="16" rx="2" />
          <path className="book-line" d="M52 214h36M52 222h36" />
        </g>
      </g>

      {/* right hanger: tax */}
      <g className="scales__pan scales__pan--r">
        <path className="stroke thin" d="M330 116l-34 112" />
        <path className="stroke thin" d="M330 116l34 112" />
        <path className="fill-in pan-fill" d="M286 228h88q-6 34-44 36-38-2-44-36z" />
        <path className="stroke" d="M286 228h88q-6 34-44 36-38-2-44-36z" />
        <g className="fill-in coins">
          <ellipse cx="330" cy="221" rx="17" ry="5" />
          <ellipse cx="330" cy="214" rx="17" ry="5" />
          <ellipse cx="330" cy="207" rx="17" ry="5" />
        </g>
      </g>
    </svg>
  );
}
