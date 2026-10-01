/** Premium isometric developer scene for the hero — palette via CSS variables. */
export function HeroScene() {
  return (
    <svg
      className="hero-scene"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hsBg" x1="0%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-bg1)" />
          <stop offset="100%" stopColor="var(--hero-scene-bg2)" />
        </linearGradient>

        <linearGradient id="hsTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-face-top)" />
          <stop offset="100%" stopColor="var(--hero-scene-face-mid)" />
        </linearGradient>
        <linearGradient id="hsFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-face-mid)" />
          <stop offset="100%" stopColor="var(--hero-scene-face-front)" />
        </linearGradient>
        <linearGradient id="hsSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--hero-scene-face-side)" />
          <stop offset="100%" stopColor="var(--hero-scene-face-mid)" />
        </linearGradient>
        <linearGradient id="hsScreen" x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-screen)" />
          <stop offset="55%" stopColor="var(--hero-scene-screen-deep)" />
          <stop offset="100%" stopColor="var(--hero-scene-screen)" />
        </linearGradient>
        <linearGradient id="hsGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-glass)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--hero-scene-glass-2)" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="hsFloorFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--hero-scene-grid)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--hero-scene-grid)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hsReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <filter id="hsGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hsSoftGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hsBlurFar" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id="hsBlurMid" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="1" />
        </filter>

        {/* Circuit paths — lower band, skirt the clear center text zone */}
        <path
          id="hsPathA"
          d="M280 720 L380 720 L380 680 L500 680 L500 740 L640 740 L640 700 L820 700 L820 760 L980 760 L980 720 L1120 720"
        />
        <path
          id="hsPathB"
          d="M240 780 C340 740, 420 800, 520 760 L640 760 L640 820 L820 820 C920 790, 1000 840, 1180 780"
        />
        <path
          id="hsPathC"
          d="M1120 700 L1240 700 L1240 620 L1320 620 L1320 540"
        />
        <path
          id="hsPathD"
          d="M280 700 L180 700 L180 620 L100 620 L100 540"
        />
      </defs>

      {/* Base — opaque in dark; transparent in light so CSS page-matched bg shows */}
      <rect className="hero-scene-canvas" width="1440" height="900" fill="url(#hsBg)" />

      {/* ========== FAR LAYER ========== */}
      <g className="hero-scene-far" opacity="0.55" filter="url(#hsBlurFar)">
        {[
          [50, 180],
          [110, 420],
          [90, 700],
          [160, 260],
          [1280, 160],
          [1340, 380],
          [1380, 640],
          [1260, 780],
          [40, 560],
          [200, 120],
          [1320, 240],
          [80, 800],
        ].map(([cx, cy], i) => (
          <g key={`p${i}`} transform={`translate(${cx} ${cy})`}>
            <g className="hero-scene-float" style={{ animationDelay: `${(i % 7) * 0.6}s` }}>
              <circle
                r={1 + (i % 3) * 0.6}
                fill="var(--hero-scene-particle)"
                opacity={0.25 + (i % 4) * 0.08}
              />
            </g>
          </g>
        ))}
        <g transform="translate(60 640)" opacity="0.4">
          <g className="hero-scene-float" style={{ animationDelay: "0.5s" }}>
            <g transform="rotate(-8)">
              <rect
                width="70"
                height="48"
                rx="4"
                fill="url(#hsGlass)"
                stroke="var(--hero-scene-accent-soft)"
                strokeWidth="0.8"
              />
              <rect x="8" y="10" width="36" height="2.5" rx="1" fill="var(--hero-scene-code-1)" opacity="0.5" />
              <rect x="8" y="18" width="24" height="2.5" rx="1" fill="var(--hero-scene-code-2)" opacity="0.45" />
              <rect x="8" y="26" width="40" height="2.5" rx="1" fill="var(--hero-scene-code-3)" opacity="0.4" />
            </g>
          </g>
        </g>
        <g transform="translate(1300 680)" opacity="0.35">
          <g className="hero-scene-float" style={{ animationDelay: "1.1s" }}>
            <g transform="rotate(6)">
              <rect
                width="58"
                height="40"
                rx="3"
                fill="url(#hsGlass)"
                stroke="var(--hero-scene-line)"
                strokeWidth="0.7"
                opacity="0.7"
              />
            </g>
          </g>
        </g>
      </g>

      {/* ========== MID LAYER — floor grid + circuits ========== */}
      <g className="hero-scene-mid">
        <g
          stroke="url(#hsFloorFade)"
          strokeWidth="0.7"
          fill="none"
          opacity="0.5"
          transform="translate(0 80)"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const y = 620 + i * 28;
            const inset = i * 36;
            return (
              <path
                key={`fh${i}`}
                d={`M${80 + inset} ${y} L${1360 - inset} ${y}`}
                opacity={0.55 - i * 0.07}
              />
            );
          })}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const x0 = 160 + i * 120;
            return (
              <path
                key={`fv${i}`}
                d={`M${x0} 620 L${720 + (x0 - 720) * 0.3} 820`}
                opacity="0.28"
              />
            );
          })}
        </g>

        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hsGlow)"
        >
          <use href="#hsPathA" stroke="var(--hero-scene-line)" strokeWidth="1.5" opacity="0.75" />
          <use href="#hsPathB" stroke="var(--hero-scene-line-2)" strokeWidth="1.25" opacity="0.55" />
          <use href="#hsPathC" stroke="var(--hero-scene-accent)" strokeWidth="1.35" opacity="0.65" />
          <use href="#hsPathD" stroke="var(--hero-scene-accent-soft)" strokeWidth="1.2" opacity="0.55" />

          <use href="#hsPathA" className="hero-scene-pulse" stroke="var(--hero-scene-line)" strokeWidth="2.2" />
          <use
            href="#hsPathB"
            className="hero-scene-pulse hero-scene-pulse-delay"
            stroke="var(--hero-scene-line-2)"
            strokeWidth="2"
          />
          <use
            href="#hsPathC"
            className="hero-scene-pulse hero-scene-pulse-slow"
            stroke="var(--hero-scene-accent)"
            strokeWidth="2"
          />
        </g>

        <g filter="url(#hsSoftGlow)">
          {[
            [380, 720],
            [380, 680],
            [500, 680],
            [640, 740],
            [820, 700],
            [980, 760],
            [1120, 720],
            [640, 760],
            [820, 820],
            [1240, 700],
            [1320, 620],
            [180, 700],
            [100, 620],
          ].map(([x, y], i) => (
            <circle
              key={`n${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="var(--hero-scene-line)"
              opacity={0.7}
            />
          ))}
        </g>
      </g>

      {/* ========== NEAR LAYER — main objects ========== */}
      <g className="hero-scene-near">
        {/* Glass panel — far left, lower */}
        <g transform="translate(40 620)">
          <g className="hero-scene-float" style={{ animationDelay: "0.4s" }}>
            <g transform="rotate(-11)">
              <rect
                width="120"
                height="86"
                rx="6"
                fill="url(#hsGlass)"
                stroke="var(--hero-scene-accent)"
                strokeWidth="1.2"
                opacity="0.9"
              />
              <rect x="0" y="0" width="120" height="86" rx="6" fill="url(#hsReflect)" />
              <rect x="12" y="14" width="70" height="3.5" rx="1" fill="var(--hero-scene-code-1)" opacity="0.85" />
              <rect x="12" y="24" width="48" height="3.5" rx="1" fill="var(--hero-scene-code-2)" opacity="0.75" />
              <rect x="12" y="34" width="82" height="3.5" rx="1" fill="var(--hero-scene-code-3)" opacity="0.7" />
              <rect x="12" y="44" width="36" height="3.5" rx="1" fill="var(--hero-scene-code-1)" opacity="0.65" />
              <rect x="12" y="54" width="58" height="3.5" rx="1" fill="var(--hero-scene-accent)" opacity="0.55" />
              <rect x="12" y="64" width="44" height="3.5" rx="1" fill="var(--hero-scene-code-3)" opacity="0.6" />
            </g>
          </g>
        </g>

        {/* Glass panel — left, above laptop but still low */}
        <g transform="translate(160 560)">
          <g className="hero-scene-float" style={{ animationDelay: "1.2s" }}>
            <g transform="rotate(5)">
              <rect
                width="88"
                height="64"
                rx="5"
                fill="url(#hsGlass)"
                stroke="var(--hero-scene-line-2)"
                strokeWidth="1.1"
              />
              <rect x="0" y="0" width="88" height="64" rx="5" fill="url(#hsReflect)" />
              <rect x="10" y="12" width="42" height="3" rx="1" fill="var(--hero-scene-code-2)" opacity="0.8" />
              <rect x="10" y="22" width="58" height="3" rx="1" fill="var(--hero-scene-code-1)" opacity="0.7" />
              <rect x="10" y="32" width="30" height="3" rx="1" fill="var(--hero-scene-code-3)" opacity="0.65" />
              <rect x="10" y="42" width="50" height="3" rx="1" fill="var(--hero-scene-accent)" opacity="0.55" />
            </g>
          </g>
        </g>

        {/* Glass panel — far right */}
        <g transform="translate(1260 560)">
          <g className="hero-scene-float" style={{ animationDelay: "0.8s" }}>
            <g transform="rotate(9)">
              <rect
                width="110"
                height="78"
                rx="6"
                fill="url(#hsGlass)"
                stroke="var(--hero-scene-accent-soft)"
                strokeWidth="1.2"
              />
              <rect x="0" y="0" width="110" height="78" rx="6" fill="url(#hsReflect)" />
              <rect x="12" y="14" width="55" height="3.2" rx="1" fill="var(--hero-scene-code-1)" opacity="0.8" />
              <rect x="12" y="24" width="38" height="3.2" rx="1" fill="var(--hero-scene-code-3)" opacity="0.7" />
              <rect x="12" y="34" width="68" height="3.2" rx="1" fill="var(--hero-scene-code-2)" opacity="0.65" />
              <rect x="12" y="44" width="28" height="3.2" rx="1" fill="var(--hero-scene-line)" opacity="0.6" />
              <rect x="12" y="54" width="48" height="3.2" rx="1" fill="var(--hero-scene-accent)" opacity="0.55" />
            </g>
          </g>
        </g>

        {/* Cloud / node — left */}
        <g transform="translate(90 500)">
          <g className="hero-scene-float" style={{ animationDelay: "1.6s" }}>
            <ellipse
              cx="36"
              cy="26"
              rx="36"
              ry="16"
              fill="var(--hero-scene-face-mid)"
              stroke="var(--hero-scene-accent)"
              strokeWidth="1.1"
            />
            <ellipse cx="16" cy="20" rx="15" ry="11" fill="var(--hero-scene-face-top)" />
            <ellipse cx="48" cy="16" rx="13" ry="10" fill="var(--hero-scene-face-top)" />
            <circle className="hero-scene-led" cx="36" cy="26" r="2.4" fill="var(--hero-scene-line)" />
          </g>
        </g>

        {/* DB cylinder — left of laptop */}
        <g transform="translate(190 700)">
          <g className="hero-scene-float" style={{ animationDelay: "0.2s" }}>
            <ellipse cx="24" cy="8" rx="24" ry="8" fill="var(--hero-scene-face-top)" />
            <rect x="0" y="8" width="48" height="30" fill="url(#hsFront)" />
            <ellipse cx="24" cy="38" rx="24" ry="8" fill="var(--hero-scene-face-side)" />
            <ellipse
              cx="24"
              cy="8"
              rx="24"
              ry="8"
              fill="none"
              stroke="var(--hero-scene-line-2)"
              strokeWidth="1.2"
            />
            <line x1="6" y1="18" x2="42" y2="18" stroke="var(--hero-scene-line)" strokeWidth="1" opacity="0.45" />
            <line x1="6" y1="26" x2="42" y2="26" stroke="var(--hero-scene-accent)" strokeWidth="1" opacity="0.4" />
            <ellipse cx="24" cy="52" rx="20" ry="5" fill="var(--hero-scene-shadow)" opacity="0.35" />
          </g>
        </g>

        {/* Hex node — right */}
        <g transform="translate(1320 480)">
          <g className="hero-scene-float" style={{ animationDelay: "1s" }}>
            <path
              d="M22 2 L40 13 L40 33 L22 44 L4 33 L4 13 Z"
              fill="url(#hsFront)"
              stroke="var(--hero-scene-line)"
              strokeWidth="1.3"
            />
            <circle className="hero-scene-led" cx="22" cy="23" r="3.2" fill="var(--hero-scene-line-2)" />
          </g>
        </g>

        {/* ——— LAPTOP (left, lower — clear of text) ——— */}
        <g transform="translate(220 610)">
          <ellipse cx="155" cy="186" rx="148" ry="16" fill="var(--hero-scene-shadow)" opacity="0.5" />
          <ellipse cx="155" cy="186" rx="100" ry="8" fill="var(--hero-scene-line)" opacity="0.06" />

          <path d="M52 18 L246 18 L264 112 L70 112 Z" fill="url(#hsSide)" />
          <path
            d="M52 18 L246 18 L240 26 L58 26 Z"
            fill="url(#hsTop)"
            stroke="var(--hero-scene-rim)"
            strokeWidth="0.6"
          />
          <path d="M58 26 L240 26 L252 106 L46 106 Z" fill="url(#hsScreen)" />
          <path
            d="M58 26 L240 26 L252 106 L46 106 Z"
            fill="none"
            stroke="var(--hero-scene-rim)"
            strokeWidth="0.9"
          />
          <path
            d="M62 30 L236 30 L246 102 L52 102 Z"
            fill="var(--hero-scene-line)"
            opacity="0.07"
            filter="url(#hsBlurMid)"
          />
          <path d="M70 32 L140 32 L100 100 L55 100 Z" fill="url(#hsReflect)" />
          <g opacity="0.95">
            <rect x="68" y="40" width="78" height="4" rx="1" fill="var(--hero-scene-code-1)" />
            <rect x="68" y="50" width="52" height="4" rx="1" fill="var(--hero-scene-code-2)" />
            <rect x="68" y="60" width="92" height="4" rx="1" fill="var(--hero-scene-code-3)" />
            <rect x="68" y="70" width="40" height="4" rx="1" fill="var(--hero-scene-code-1)" />
            <rect x="68" y="80" width="68" height="4" rx="1" fill="var(--hero-scene-code-2)" />
            <rect x="68" y="90" width="56" height="4" rx="1" fill="var(--hero-scene-accent)" opacity="0.85" />
            <rect x="176" y="40" width="10" height="4" rx="1" fill="var(--hero-scene-accent)" />
            <rect x="176" y="50" width="32" height="4" rx="1" fill="var(--hero-scene-code-1)" />
            <rect x="176" y="60" width="20" height="4" rx="1" fill="var(--hero-scene-code-3)" />
            <rect x="176" y="70" width="44" height="4" rx="1" fill="var(--hero-scene-code-2)" />
            <rect x="176" y="80" width="24" height="4" rx="1" fill="var(--hero-scene-code-1)" />
          </g>

          <path d="M18 112 L280 112 L302 164 L0 164 Z" fill="url(#hsFront)" />
          <path
            d="M18 112 L280 112 L274 120 L28 120 Z"
            fill="url(#hsTop)"
            stroke="var(--hero-scene-rim)"
            strokeWidth="0.5"
          />
          <path d="M280 112 L302 164 L296 164 L274 120 Z" fill="url(#hsSide)" />
          <path d="M36 126 L260 126 L270 150 L30 150 Z" fill="var(--hero-scene-face-side)" opacity="0.85" />
          <rect
            x="118"
            y="134"
            width="60"
            height="11"
            rx="2"
            fill="var(--hero-scene-face-mid)"
            stroke="var(--hero-scene-line)"
            strokeWidth="0.6"
            opacity="0.75"
          />
          <line
            x1="28"
            y1="112"
            x2="272"
            y2="112"
            stroke="var(--hero-scene-line-2)"
            strokeWidth="1.3"
            opacity="0.4"
          />
        </g>

        {/* ——— SERVER RACK (right, lower) ——— */}
        <g transform="translate(1080 560)">
          <ellipse cx="88" cy="214" rx="90" ry="14" fill="var(--hero-scene-shadow)" opacity="0.48" />
          <ellipse cx="88" cy="214" rx="50" ry="6" fill="var(--hero-scene-line)" opacity="0.05" />

          <path d="M18 16 L155 16 L176 38 L176 200 L40 200 L18 178 Z" fill="url(#hsFront)" />
          <path d="M155 16 L176 38 L176 200 L155 178 Z" fill="url(#hsSide)" />
          <path
            d="M18 16 L155 16 L176 38 L40 38 Z"
            fill="url(#hsTop)"
            stroke="var(--hero-scene-rim)"
            strokeWidth="0.6"
          />
          <path
            d="M18 16 L155 16 L176 38 L40 38 L18 16"
            fill="none"
            stroke="var(--hero-scene-rim)"
            strokeWidth="0.7"
            opacity="0.7"
          />

          {[48, 94, 140].map((ty, ui) => (
            <g key={`u${ui}`} transform={`translate(34 ${ty})`}>
              <rect
                width="112"
                height="38"
                rx="3"
                fill="var(--hero-scene-face-side)"
                stroke="var(--hero-scene-rim)"
                strokeWidth="0.7"
              />
              {[8, 14, 20, 26].map((vy) => (
                <line
                  key={vy}
                  x1="10"
                  y1={vy}
                  x2="62"
                  y2={vy}
                  stroke="var(--hero-scene-line)"
                  strokeWidth="1"
                  opacity={0.22 + (vy % 10) * 0.02}
                />
              ))}
              <rect
                x="10"
                y="10"
                width={48 - ui * 4}
                height="3.5"
                rx="1"
                fill="var(--hero-scene-code-1)"
                opacity="0.55"
              />
              <circle
                className="hero-scene-led"
                cx="88"
                cy="12"
                r="2.5"
                fill="var(--hero-scene-line)"
                filter="url(#hsSoftGlow)"
              />
              <circle
                className="hero-scene-led hero-scene-led-delay"
                cx="97"
                cy="12"
                r="2.5"
                fill="var(--hero-scene-line-2)"
                filter="url(#hsSoftGlow)"
              />
              <circle
                className="hero-scene-led"
                cx="106"
                cy="12"
                r="2.5"
                fill="var(--hero-scene-accent)"
                filter="url(#hsSoftGlow)"
                style={{ animationDelay: `${0.4 + ui * 0.3}s` }}
              />
            </g>
          ))}

          <g stroke="var(--hero-scene-line)" strokeWidth="0.7" opacity="0.28">
            {[56, 68, 80, 116, 128, 164, 176].map((vy) => (
              <line key={vy} x1="164" y1={vy} x2="170" y2={vy + 4} />
            ))}
          </g>
        </g>

        {/* Small node bottom-right */}
        <g transform="translate(1260 780)">
          <g className="hero-scene-float" style={{ animationDelay: "1.4s" }}>
            <circle
              cx="14"
              cy="14"
              r="13"
              fill="url(#hsFront)"
              stroke="var(--hero-scene-accent)"
              strokeWidth="1.2"
            />
            <circle className="hero-scene-led" cx="14" cy="14" r="2.8" fill="var(--hero-scene-accent)" />
            <ellipse cx="14" cy="32" rx="12" ry="3.5" fill="var(--hero-scene-shadow)" opacity="0.3" />
          </g>
        </g>
      </g>
    </svg>
  );
}
