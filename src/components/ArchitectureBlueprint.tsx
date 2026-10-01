type FlowNode = {
  id: string;
  label: string;
  sub?: string;
};

type ArchitectureBlueprintProps = {
  title?: string;
  caption?: string;
  nodes: FlowNode[];
  className?: string;
};

const TEAL = "#2DD4BF";
const CYAN = "#67E8F9";
const WHITE = "#F8FAFC";
const MUTED = "#94A3B8";
const BG = "#121212";
const PANEL = "#161616";
const LINE = "#2A2A2A";

/**
 * Dark-mode technical blueprint: Input → processing → state → renderer.
 * Flat vector, ultra-thin paths, neon teal / cyan / white — no gradients.
 */
export function ArchitectureBlueprint({
  title = "System architecture",
  caption,
  nodes,
  className = "",
}: ArchitectureBlueprintProps) {
  const count = Math.max(nodes.length, 1);
  const viewW = 960;
  const viewH = 280;
  const padX = 48;
  const nodeW = 168;
  const nodeH = 72;
  const gap =
    count > 1 ? (viewW - padX * 2 - nodeW * count) / (count - 1) : 0;
  const cy = viewH / 2;

  const positions = nodes.map((_, i) => ({
    x: padX + i * (nodeW + gap),
    y: cy - nodeH / 2,
  }));

  return (
    <figure
      className={`architecture-blueprint overflow-hidden rounded-[1.35rem] border border-white/[0.08] ${className}`}
      style={{ background: BG }}
    >
      <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#2DD4BF]">
            Blueprint
          </p>
          <figcaption className="mt-1 font-display text-lg tracking-tight text-white sm:text-xl">
            {title}
          </figcaption>
        </div>
        {caption ? (
          <p className="hidden max-w-[28ch] text-right text-xs leading-relaxed text-[#94A3B8] sm:block">
            {caption}
          </p>
        ) : null}
      </div>

      <div className="relative px-2 py-6 sm:px-4 sm:py-8">
        {/* subtle grid — flat, no glow */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="arch-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke={LINE}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>

        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="relative z-[1] mx-auto block h-auto w-full max-w-[960px]"
          role="img"
          aria-label={nodes.map((n) => n.label).join(" to ")}
        >
          <defs>
            <marker
              id="arch-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6" fill="none" stroke={TEAL} strokeWidth="1" />
            </marker>
          </defs>

          {/* loop return path (data loop) */}
          {count >= 2 ? (
            <>
              <path
                d={`M ${positions[count - 1].x + nodeW / 2} ${positions[count - 1].y + nodeH + 18}
                    V ${viewH - 36}
                    H ${positions[0].x + nodeW / 2}
                    V ${positions[0].y + nodeH + 18}`}
                fill="none"
                stroke={CYAN}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.55"
              />
              <text
                x={viewW / 2}
                y={viewH - 42}
                textAnchor="middle"
                fill={MUTED}
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="0.12em"
              >
                DATA LOOP
              </text>
            </>
          ) : null}

          {/* connectors */}
          {positions.slice(0, -1).map((from, i) => {
            const to = positions[i + 1];
            const x1 = from.x + nodeW;
            const x2 = to.x;
            const y = from.y + nodeH / 2;
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={x1 + 2}
                  y1={y}
                  x2={x2 - 10}
                  y2={y}
                  stroke={TEAL}
                  strokeWidth="1"
                  markerEnd="url(#arch-arrow)"
                />
                {/* micro tick marks for blueprint feel */}
                <line
                  x1={(x1 + x2) / 2}
                  y1={y - 4}
                  x2={(x1 + x2) / 2}
                  y2={y + 4}
                  stroke={WHITE}
                  strokeWidth="1"
                  opacity="0.35"
                />
              </g>
            );
          })}

          {/* nodes */}
          {nodes.map((node, i) => {
            const { x, y } = positions[i];
            const accent = i === 0 || i === count - 1 ? TEAL : CYAN;
            return (
              <g key={node.id}>
                <rect
                  x={x}
                  y={y}
                  width={nodeW}
                  height={nodeH}
                  rx="2"
                  fill={PANEL}
                  stroke={accent}
                  strokeWidth="1"
                />
                {/* corner brackets */}
                <path
                  d={`M ${x + 8} ${y} V ${y + 8} M ${x} ${y + 8}`}
                  fill="none"
                  stroke={WHITE}
                  strokeWidth="1"
                  opacity="0.45"
                />
                <path
                  d={`M ${x + nodeW - 8} ${y} V ${y + 8} M ${x + nodeW} ${y + 8}`}
                  fill="none"
                  stroke={WHITE}
                  strokeWidth="1"
                  opacity="0.45"
                />
                <path
                  d={`M ${x + 8} ${y + nodeH} V ${y + nodeH - 8} M ${x} ${y + nodeH - 8}`}
                  fill="none"
                  stroke={WHITE}
                  strokeWidth="1"
                  opacity="0.45"
                />
                <path
                  d={`M ${x + nodeW - 8} ${y + nodeH} V ${y + nodeH - 8} M ${x + nodeW} ${y + nodeH - 8}`}
                  fill="none"
                  stroke={WHITE}
                  strokeWidth="1"
                  opacity="0.45"
                />
                <text
                  x={x + nodeW / 2}
                  y={node.sub ? y + 30 : y + 40}
                  textAnchor="middle"
                  fill={WHITE}
                  fontSize="13"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  fontWeight="600"
                >
                  {node.label}
                </text>
                {node.sub ? (
                  <text
                    x={x + nodeW / 2}
                    y={y + 48}
                    textAnchor="middle"
                    fill={MUTED}
                    fontSize="10"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  >
                    {node.sub}
                  </text>
                ) : null}
                <text
                  x={x + 10}
                  y={y + 16}
                  fill={accent}
                  fontSize="9"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="0.08em"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
