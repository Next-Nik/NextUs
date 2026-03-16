import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Heptagon.module.css";

const N = 7;
const CX = 260;
const CY = 260;
const RADIUS = 185;
const NODE_R_DEFAULT = 28;
const NODE_R_ACTIVE = 36;
const INTRO_SPIN_DEG_PER_SEC = 60;  // speed during intro
const INTRO_SPIN_DURATION_MS = 2400; // spin for 2.4s then land

function getNodePos(index, rotationDeg = 0) {
  const angleDeg = index * (360 / N) - 90 + rotationDeg;
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + RADIUS * Math.cos(rad),
    y: CY + RADIUS * Math.sin(rad),
  };
}

function getRotationToTop(index, currentRot) {
  const raw = -(index * (360 / N));
  let diff = ((raw - (currentRot % 360)) + 540) % 360 - 180;
  return currentRot + diff;
}

export default function Heptagon({ domains, activeIndex, onSelect, isIdle }) {
  // phase: "spinning" | "landing" | "settled" | "navigating"
  const [phase, setPhase] = useState("spinning");
  const [displayRot, setDisplayRot] = useState(0);
  const rotRef = useRef(0);
  const targetRotRef = useRef(null);
  const landingIndexRef = useRef(null);
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);
  const spinStartRef = useRef(Date.now());

  // Pick random landing domain on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * N);
    landingIndexRef.current = randomIndex;
  }, []);

  // When activeIndex changes after settled, navigate to it
  useEffect(() => {
    if (phase === "settled" || phase === "navigating") {
      if (activeIndex !== null) {
        targetRotRef.current = getRotationToTop(activeIndex, rotRef.current);
        setPhase("navigating");
      }
    }
  }, [activeIndex]);

  const cancelSpinAndSelect = useCallback((index) => {
    // Immediately stop intro spin and land on clicked domain
    landingIndexRef.current = index;
    targetRotRef.current = getRotationToTop(index, rotRef.current);
    setPhase("landing");
    onSelect(index);
  }, [onSelect]);

  useEffect(() => {
    function animate(time) {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      if (phase === "spinning") {
        const elapsed = Date.now() - spinStartRef.current;
        rotRef.current += INTRO_SPIN_DEG_PER_SEC * dt;
        setDisplayRot(rotRef.current);

        if (elapsed >= INTRO_SPIN_DURATION_MS) {
          // Start landing on random domain
          targetRotRef.current = getRotationToTop(landingIndexRef.current, rotRef.current);
          setPhase("landing");
          onSelect(landingIndexRef.current);
        }
      } else if (phase === "landing" || phase === "navigating") {
        const target = targetRotRef.current;
        const diff = target - rotRef.current;
        if (Math.abs(diff) < 0.2) {
          rotRef.current = target;
          setDisplayRot(target);
          setPhase("settled");
        } else {
          const speed = phase === "navigating" ? 4.5 : 3.5;
          rotRef.current += diff * Math.min(1, dt * speed);
          setDisplayRot(rotRef.current);
        }
      }
      // "settled" — no animation needed, just hold

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, onSelect]);

  const isSpinning = phase === "spinning" || phase === "landing";

  const polygonPoints = Array.from({ length: N }, (_, i) => {
    const p = getNodePos(i, displayRot);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NextUs Seven Domains Heptagon"
    >
      <circle cx={CX} cy={CY} r={RADIUS + 42} fill="none" stroke="rgba(200,146,42,0.06)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={RADIUS + 22} fill="none" stroke="rgba(200,146,42,0.09)" strokeWidth="0.5" />

      <polygon
        points={polygonPoints}
        fill="rgba(200,146,42,0.04)"
        stroke="rgba(200,146,42,0.22)"
        strokeWidth="1"
      />

      {Array.from({ length: N }, (_, i) => {
        const p = getNodePos(i, displayRot);
        return (
          <line key={`spoke-${i}`} x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke="rgba(200,146,42,0.10)" strokeWidth="0.5" />
        );
      })}

      {domains.map((domain, i) => {
        const p = getNodePos(i, displayRot);
        const isActive = !isSpinning && !isIdle && i === activeIndex;
        const r = isActive ? NODE_R_ACTIVE : NODE_R_DEFAULT;

        return (
          <g
            key={domain.id}
            className={styles.nodeGroup}
            onClick={() => {
              if (isSpinning) {
                cancelSpinAndSelect(i);
              } else {
                onSelect(i);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Select domain: ${domain.name}`}
            onKeyDown={(e) => e.key === "Enter" && (isSpinning ? cancelSpinAndSelect(i) : onSelect(i))}
          >
            {isActive && (
              <circle cx={p.x} cy={p.y} r={r + 16} fill="rgba(200,146,42,0.12)" />
            )}

            <circle
              cx={p.x} cy={p.y} r={r}
              fill={isActive ? "rgba(200,146,42,0.18)" : "rgba(250,248,244,0.92)"}
              stroke={isActive ? "#C8922A" : "rgba(200,146,42,0.35)"}
              strokeWidth={isActive ? 1.5 : 1}
              className={styles.nodeCircle}
            />

            <text
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="middle"
              fill={isSpinning ? "rgba(74,74,74,0.45)" : isActive ? "#C8922A" : "rgba(74,74,74,0.75)"}
              fontSize={isActive ? "9.5" : "8.5"}
              fontFamily="'Cormorant SC', serif"
              fontWeight={isActive ? "500" : "300"}
              letterSpacing="0.04em"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {domain.name.split(" ").map((word, wi) => (
                <tspan key={wi} x={p.x}
                  dy={wi === 0 ? (domain.name.split(" ").length > 1 ? "-0.6em" : "0") : "1.25em"}>
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      <circle cx={CX} cy={CY} r={60}
        fill="rgba(250,248,244,0.95)"
        stroke="rgba(200,146,42,0.18)"
        strokeWidth="1"
      />
    </svg>
  );
}
