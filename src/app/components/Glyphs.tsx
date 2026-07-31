/**
 * Geometric SVG set.
 *
 * Every shape draws in `currentColor` or `var(--accent)`, so the whole set
 * re-themes with the page rather than carrying its own palette. All are
 * decorative and marked `aria-hidden`; nothing here is load-bearing for meaning.
 *
 * Coordinates are hard-coded rather than generated. A random layout would
 * differ between the server render and the client, and this is a static export
 * — the shape needs to be the same every time it is built.
 */

/**
 * Neural on the left, symbolic on the right, edges across the gap.
 *
 * The left cluster sits on irregular coordinates and the right on an exact
 * lattice — that contrast is the entire idea, so it is drawn rather than
 * described. Strokes animate in once on load, never on scroll.
 */
export function NeuroSymbolic({ className = "" }: { className?: string }) {
  const neural: [number, number][] = [
    [26, 42], [18, 88], [46, 20], [52, 66], [34, 112], [62, 96], [70, 46], [22, 132],
  ];
  const symbolic: [number, number][] = [
    [176, 30], [216, 30], [176, 70], [216, 70], [176, 110], [216, 110], [196, 150],
  ];
  const bridges: [number, number][] = [
    [6, 0], [3, 2], [5, 3], [1, 4], [7, 6], [4, 5],
  ];

  return (
    <svg
      viewBox="0 0 240 176"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Symbolic lattice rules */}
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.28">
        <path d="M176 30 H216 M176 70 H216 M176 110 H216" />
        <path d="M176 30 V110 M216 30 V110" />
        <path d="M176 110 L196 150 L216 110" />
      </g>

      {/* Bridges */}
      <g stroke="var(--accent)" strokeWidth="0.9" opacity="0.5">
        {bridges.map(([a, b], i) => (
          <line
            key={i}
            x1={neural[a][0]}
            y1={neural[a][1]}
            x2={symbolic[b][0]}
            y2={symbolic[b][1]}
            className="kj-draw-line"
            style={{ animationDelay: `${240 + i * 90}ms` }}
          />
        ))}
      </g>

      {/* Neural cluster — soft, irregular */}
      <g>
        {neural.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 5 : 3.5}
            fill="var(--accent)"
            opacity={0.75}
            className="kj-pop"
            style={{ animationDelay: `${i * 55}ms` }}
          />
        ))}
      </g>

      {/* Symbolic nodes — exact, square */}
      <g>
        {symbolic.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            fill="currentColor"
            opacity={0.85}
            className="kj-pop"
            style={{ animationDelay: `${340 + i * 55}ms` }}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * A bounded region inside an unbounded lattice — the single most useful picture
 * of what a bounded model checker actually claims. Everything inside the box is
 * proven; the dots continuing past it are the inputs the bound does not reach.
 */
export function BoundedSpace({ className = "" }: { className?: string }) {
  const dots = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 12; c++) {
      const inside = r < 4 && c < 5;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={14 + c * 20}
          cy={14 + r * 20}
          r={inside ? 3 : 2}
          fill={inside ? "var(--accent)" : "currentColor"}
          opacity={inside ? 0.9 : 0.22}
        />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 250 146"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots}
      <rect
        x="4"
        y="4"
        width="100"
        height="80"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeDasharray="4 3"
        opacity="0.8"
      />
    </svg>
  );
}

/**
 * Normal density with the tails picked out — the statistics half of the
 * identity, drawn from the actual function rather than an eyeballed bezier.
 */
export function NormalCurve({ className = "" }: { className?: string }) {
  const w = 240;
  const h = 90;
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const z = -3.4 + (6.8 * i) / 80;
    const y = Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI);
    pts.push(`${((z + 3.4) / 6.8) * w},${h - y * (h / 0.42) * 0.92}`);
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1={h - 1} x2={w} y2={h - 1} stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <polyline points={pts.join(" ")} stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      {/* ±1.96σ — the line every hypothesis test is arguing about */}
      {[-1.96, 1.96].map((z) => (
        <line
          key={z}
          x1={((z + 3.4) / 6.8) * w}
          y1={h - 1}
          x2={((z + 3.4) / 6.8) * w}
          y2={h - Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI) * (h / 0.42) * 0.92}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      ))}
    </svg>
  );
}

/** Small section marker: a square being squared off. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="0.75" width="14.5" height="14.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <rect x="4.5" y="4.5" width="7" height="7" fill="var(--accent)" />
    </svg>
  );
}
