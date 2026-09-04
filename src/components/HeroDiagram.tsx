/**
 * Decorative drafting illustration: a generic socket cross-section with a
 * coordinate frame and reference marks. It is not derived from, and does not
 * represent, any of the projects on this site.
 */
export default function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 320 420"
      role="img"
      aria-label="Decorative engineering drawing of a generic socket cross-section with a coordinate frame and reference marks"
      className="h-auto w-full text-ink"
    >
      <defs>
        <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
        </pattern>
        <marker id="tick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <line x1="1" y1="5" x2="5" y2="1" stroke="currentColor" strokeWidth="0.9" />
        </marker>
      </defs>

      {/* Section wall */}
      <path
        d="M 92 60 C 80 156 82 266 108 328 C 124 368 168 382 192 352 C 214 324 220 216 214 136 C 211 100 209 76 208 60 L 191 60 C 192 76 194 102 197 138 C 202 216 198 312 182 336 C 166 358 136 348 124 316 C 102 261 100 161 110 60 Z"
        fill="url(#hatch)"
        stroke="currentColor"
        strokeWidth="1.1"
      />

      {/* Centreline — long-short-long, the conventional CAD pattern */}
      <line
        x1="152"
        y1="34"
        x2="152"
        y2="398"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="18 4 3 4"
        opacity="0.5"
      />

      {/* Overall reference dimension */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.55">
        <line x1="92" y1="42" x2="214" y2="42" markerStart="url(#tick)" markerEnd="url(#tick)" />
        <line x1="92" y1="36" x2="92" y2="62" />
        <line x1="214" y1="36" x2="214" y2="62" />
      </g>
      <text x="153" y="33" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.5">
        REF
      </text>

      {/* Measurement ticks down the left edge */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.4">
        <line x1="52" y1="60" x2="52" y2="380" />
        {[60, 100, 140, 180, 220, 260, 300, 340, 380].map((y, i) => (
          <line key={y} x1="52" y1={y} x2={i % 2 === 0 ? 62 : 58} y2={y} />
        ))}
      </g>

      {/* Callout leaders */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.6">
        <line x1="214" y1="150" x2="266" y2="126" />
        <line x1="266" y1="126" x2="288" y2="126" />
        <line x1="185" y1="330" x2="252" y2="356" />
        <line x1="252" y1="356" x2="288" y2="356" />
      </g>
      <text x="292" y="123" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">
        A
      </text>
      <text x="292" y="353" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.55">
        B
      </text>

      {/* Coordinate frame */}
      <g stroke="currentColor" strokeWidth="0.9" opacity="0.65">
        <line x1="34" y1="396" x2="34" y2="352" markerEnd="url(#tick)" />
        <line x1="34" y1="396" x2="78" y2="396" markerEnd="url(#tick)" />
      </g>
      <text x="24" y="352" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.6">
        Y
      </text>
      <text x="80" y="400" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" opacity="0.6">
        X
      </text>
    </svg>
  )
}
