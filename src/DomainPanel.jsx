import { useState } from "react";
import { CURRENT_STATE, SCALE_LABELS, getQualitativeBand, DATA_STATUS } from "./currentState";
import styles from "./DomainPanel.module.css";

export default function DomainPanel({
  item,
  parentLabel,
  breadcrumb,
  onExploreSubDomains,
  onBack,
  onContribute,
  onPrev,
  onNext,
  level,
  isVisible,
  userData, // Purpose Piece data: { archetype, domain, scale }
}) {
  const [fieldExpanded, setFieldExpanded] = useState(false);
  const isPlaceholder = item.horizonGoal === "placeholder";

  // Get Current State data for this domain (level 0 only)
  const cs = level === 0 && item.id ? CURRENT_STATE[item.id] : null;

  // Personalisation
  const isUserDomain = userData?.domain === item.id;
  const userScale = userData?.scale;
  const userArchetype = userData?.archetype;

  // Entry point — personalised if we have archetype data
  const entryPoint = cs
    ? (userArchetype && cs.entryPoints[userArchetype]) || cs.entryPoints.default
    : null;

  // Filter actors by user's scale first if personalised
  const actors = cs ? (
    isUserDomain && userScale
      ? [
          ...cs.actors.filter(a => a.scale === userScale),
          ...cs.actors.filter(a => a.scale !== userScale),
        ]
      : cs.actors
  ) : [];

  const gapDistance = cs ? (10 - cs.score).toFixed(1) : null;
  const fillPct = cs ? `${(cs.score / 10 * 100).toFixed(1)}%` : "0%";
  const band = cs ? getQualitativeBand(cs.score) : null;
  const isIllustrative = DATA_STATUS === "illustrative";

  return (
    <div className={`${styles.panel} ${isVisible ? styles.visible : ""}`}>

      {/* Back button */}
      {onBack && (
        <button className={styles.backBtn} onClick={onBack}>
          <span className={styles.backArrow}>←</span> {parentLabel}
        </button>
      )}

      {/* Breadcrumb */}
      {breadcrumb.length > 1 && (
        <nav className={styles.breadcrumb} aria-label="Navigation path">
          {breadcrumb.map((crumb, i) => (
            <span key={i}>
              {i > 0 && <span className={styles.breadcrumbSep}>·</span>}
              <span className={i === breadcrumb.length - 1 ? styles.breadcrumbCurrent : styles.breadcrumbItem}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      )}

      {/* User's domain badge */}
      {isUserDomain && userData && (
        <div className={styles.yourDomainBadge}>
          <span className={styles.yourDomainDot} />
          <span>Your domain · {userData.archetype} · {SCALE_LABELS[userData.scale] || userData.scale}</span>
        </div>
      )}

      {/* Domain name */}
      <h2 className={styles.domainName}>{item.name}</h2>

      {/* Explore button */}
      {level < 4 ? (
        <button className={styles.exploreBtnTop} onClick={onExploreSubDomains}>
          Explore {item.name}
          <span className={styles.arrow}>→</span>
        </button>
      ) : (
        <p className={styles.comingSoonTop}>This level is being mapped —</p>
      )}

      {/* Horizon goal */}
      <p className={styles.horizonGoal}>
        {isPlaceholder ? (
          <span className={styles.comingSoon}>Horizon goal being mapped —</span>
        ) : (
          <>
            <span className={styles.goalLabel}>Horizon goal —</span>{" "}
            {item.horizonGoal}
          </>
        )}
      </p>

      {/* Description */}
      {item.description && item.description !== "placeholder" && (
        <p className={styles.description}>{item.description}</p>
      )}

      {/* ── CURRENT STATE LAYER (domain level only) ── */}
      {cs && (
        <div className={styles.currentState}>
          <div className={styles.currentStateDivider} />

          {/* Gap Signal */}
          {cs.gapSignal && (
            <div className={styles.gapSignal}>
              <div className={styles.gapSignalDot} />
              <span className={styles.gapSignalLabel}>Gap Signal Active</span>
              {cs.gapReason && (
                <span className={styles.gapSignalReason}> — {cs.gapReason}</span>
              )}
            </div>
          )}

          {/* Score + bar — qualitative when illustrative */}
          <div className={styles.scoreRow}>
            <div>
              {isIllustrative ? (
                <div className={styles.scoreNumber} style={{ fontSize: "28px", letterSpacing: "0.02em" }}>
                  {band?.label}
                </div>
              ) : (
                <div className={styles.scoreNumber}>
                  {cs.score}<span className={styles.scoreDenom}>/10</span>
                </div>
              )}
              <div className={styles.scoreLabel}>
                {isIllustrative ? "Current State — being mapped" : "Current State"}
              </div>
            </div>
            <div className={styles.scoreMeta}>
              <div className={styles.gapDistanceLabel}>
                {isIllustrative
                  ? band?.description
                  : `${gapDistance} points to horizon`}
              </div>
            </div>
          </div>

          <div className={styles.gapBarWrap}>
            <div className={styles.gapBarLabels}>
              <span>Where we are</span>
              <span>Horizon Goal</span>
            </div>
            <div className={styles.gapBarTrack}>
              <div
                className={styles.gapBarFill}
                style={{ width: fillPct, opacity: isIllustrative ? 0.65 : 1 }}
              />
              <div className={styles.gapBarHorizon} />
            </div>
            {isIllustrative && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "12px",
                fontStyle: "italic",
                color: "var(--meta)",
                marginTop: "8px",
                opacity: 0.75,
              }}>
                Directional — precise figures arrive when this domain completes Decision Analytics.
              </p>
            )}
          </div>

          {/* Indicators */}
          {cs.indicators && cs.indicators.length > 0 && (
            <div className={styles.indicators}>
              {cs.indicators.map((ind, i) => (
                <div key={i} className={styles.indicator}>
                  <span className={styles.indicatorLabel}>{ind.label}</span>
                  <span className={`${styles.indicatorValue} ${styles[`trend_${ind.trend}`]}`}>
                    {ind.value}
                    <span className={styles.trendArrow}>
                      {ind.trend === "up" ? " ↑" : ind.trend === "down" ? " ↓" : " →"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Narrative */}
          <p className={styles.csNarrative}>{cs.narrative}</p>

          {/* In the Field */}
          <div className={styles.inField}>
            <p className={styles.inFieldLabel}>In the Field</p>

            {isUserDomain && userScale && (
              <p className={styles.inFieldPersonalised}>
                Showing {SCALE_LABELS[userScale]} actors first — your scale
              </p>
            )}

            <div className={styles.actorsRow}>
              {actors.slice(0, fieldExpanded ? actors.length : 4).map((actor, i) => (
                <div
                  key={i}
                  className={`${styles.actorChip} ${actor.scale === userScale ? styles.actorChipHighlighted : ""} ${!actor.winning ? styles.actorChipMuted : ""}`}
                >
                  <div className={`${styles.actorDot} ${actor.winning ? styles.actorDotWinning : styles.actorDotMuted}`} />
                  <span className={styles.actorName}>{actor.name}</span>
                  <span className={styles.actorScale}>· {SCALE_LABELS[actor.scale] || actor.scale}</span>
                </div>
              ))}
            </div>

            <div className={styles.actorsFooter}>
              {actors.length > 4 && (
                <button
                  className={styles.seeAllBtn}
                  onClick={() => setFieldExpanded(!fieldExpanded)}
                >
                  {fieldExpanded ? "Show less" : `See all ${cs.totalActors} actors →`}
                </button>
              )}
            </div>
          </div>

          {/* Entry point */}
          {entryPoint && (
            <div className={styles.entryPoint}>
              <p className={styles.entryPointText}>{entryPoint}</p>
              <button className={styles.entryBtn} onClick={onContribute}>
                Find your entry →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className={styles.divider} />

      {/* Mailing list CTA */}
      <div className={styles.mailingList}>
        <p className={styles.mailingLabel}>Join us — stay up to date as we build.</p>
        <form
          className={styles.mailingForm}
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            if (email) {
              window.location.href = `mailto:hello@nextus.world?subject=Keep me informed: ${item.name}&body=Please keep me informed about ${item.name} on NextUs. My email: ${email}`;
            }
          }}
        >
          <input
            type="email"
            name="email"
            className={styles.mailingInput}
            placeholder="your@email.com"
            required
          />
          <button type="submit" className={styles.mailingBtn}>
            Stay informed →
          </button>
        </form>
      </div>

      {/* Prev / Next */}
      <div className={styles.navArrows}>
        <button className={styles.navBtn} onClick={onPrev} aria-label="Previous domain">‹</button>
        <button className={styles.navBtn} onClick={onNext} aria-label="Next domain">›</button>
      </div>
    </div>
  );
}
