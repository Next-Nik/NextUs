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
}) {
  const hasSubDomains =
    item.subDomains && item.subDomains.length > 0 && item.subDomains[0].name !== "Placeholder";
  const isPlaceholder = item.horizonGoal === "placeholder";
  return (
    <div className={`${styles.panel} ${isVisible ? styles.visible : ""}`}>
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

      {/* Domain name */}
      <h2 className={styles.domainName}>{item.name}</h2>

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

      {/* Divider */}
      <div className={styles.divider} />

      {/* Actions */}
      <div className={styles.actions}>
        {hasSubDomains ? (
          <button className={styles.exploreBtn} onClick={onExploreSubDomains}>
            {level < 2 ? "Explore sub-domains" : "Explore deeper"}
            <span className={styles.arrow}>→</span>
          </button>
        ) : (
          <p className={styles.comingSoon}>Sub-domains being mapped —</p>
        )}

        <button className={styles.contributeLink} onClick={onContribute}>
          Contribute to this vision →
        </button>
      </div>

      {/* Back */}
      {onBack && (
        <button className={styles.backBtn} onClick={onBack}>
          <span className={styles.backArrow}>←</span> Back to {parentLabel}
        </button>
      )}

      {/* Prev / Next navigation */}
      <div className={styles.navArrows}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          aria-label="Previous domain"
          title="Previous (←)"
        >
          ‹
        </button>
        <button
          className={styles.navBtn}
          onClick={onNext}
          aria-label="Next domain"
          title="Next (→)"
        >
          ›
        </button>
      </div>
    </div>
  );
}
