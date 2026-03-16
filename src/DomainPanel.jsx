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

      {/* Back button — top of panel */}
      {onBack && (
        <button className={styles.backBtn} onClick={onBack}>
          <span className={styles.backArrow}>←</span> Back to {parentLabel}
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

      {/* Domain name */}
      <h2 className={styles.domainName}>{item.name}</h2>

      {/* Explore button — right under the title */}
      {hasSubDomains ? (
        <button className={styles.exploreBtnTop} onClick={onExploreSubDomains}>
          {level < 2 ? "Explore sub-domains" : "Explore deeper"}
          <span className={styles.arrow}>→</span>
        </button>
      ) : (
        <p className={styles.comingSoonTop}>Sub-domains being mapped —</p>
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

      {/* Divider */}
      <div className={styles.divider} />

      {/* Mailing list CTA */}
      <div className={styles.mailingList}>
        <p className={styles.mailingLabel}>Stay informed as this domain is mapped.</p>
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

      {/* Prev / Next navigation */}
      <div className={styles.navArrows}>
        <button className={styles.navBtn} onClick={onPrev} aria-label="Previous domain">‹</button>
        <button className={styles.navBtn} onClick={onNext} aria-label="Next domain">›</button>
      </div>

    </div>
  );
}
