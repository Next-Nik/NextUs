import { useState, useEffect, useCallback } from "react";
import Heptagon from "./Heptagon";
import DomainPanel from "./DomainPanel";
import ContributeModal from "./ContributeModal";
import { domains, TOP_LEVEL_GOAL } from "./data";
import styles from "./App.module.css";

const OVERVIEW_TEXT = `The Overview Effect is what astronauts report when they first see Earth from space — a sudden, irreversible recognition of the whole. The boundaries dissolve. The fragmentation that seemed permanent from inside it becomes obviously contingent from outside it.

NextUs is built from that vantage point.

Seven domains. Every scale. One map of what humanity is working on — and what still needs attention.`;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [levelPath, setLevelPath] = useState([]);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);

  const isIdle = activeIndex === null;

  function getNavigationState() {
    if (levelPath.length === 0) {
      return {
        currentList: domains,
        selectedItem: activeIndex !== null ? domains[activeIndex] : null,
        breadcrumb: ["NextUs"],
        level: 0,
        parentLabel: null,
      };
    }

    let list = domains;
    let breadcrumb = ["NextUs"];
    let item = null;

    for (let i = 0; i < levelPath.length; i++) {
      const entry = levelPath[i];
      item = list[entry.index];
      breadcrumb.push(item.name);
      if (i < levelPath.length - 1) {
        list = item.subDomains;
      }
    }

    const currentList = levelPath.length === 1
      ? domains[levelPath[0].index].subDomains
      : getItemAtPath(levelPath.slice(0, -1)).subDomains;

    return {
      currentList,
      selectedItem: activeIndex !== null ? currentList[activeIndex] : null,
      breadcrumb,
      level: levelPath.length,
      parentLabel: levelPath.length > 0
        ? (getItemAtPath(levelPath.slice(0, -1))?.name ?? "NextUs")
        : "NextUs",
    };
  }

  function getItemAtPath(path) {
    if (path.length === 0) return null;
    let list = domains;
    let item = null;
    for (const entry of path) {
      item = list[entry.index];
      list = item.subDomains || [];
    }
    return item;
  }

  const navState = getNavigationState();

  // Derive centre label — what level are we on?
  function getCentreLabel() {
    if (levelPath.length === 0) return "Our Planet";
    const parentItem = getItemAtPath(levelPath);
    return parentItem?.name ?? "Our Planet";
  }

  function handleCentreClick() {
    if (levelPath.length === 0) {
      // Top level — toggle Overview Effect panel
      setOverviewOpen((prev) => !prev);
    } else {
      // Domain/sub-domain level — show horizon goal for this level
      // (handled in the panel, just close any selected domain)
      setActiveIndex(null);
    }
  }

  const handleKey = useCallback((e) => {
    if (contributeOpen || overviewOpen) return;
    const len = navState.currentList.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => prev === null ? 0 : (prev + 1) % len);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => prev === null ? len - 1 : (prev - 1 + len) % len);
    } else if (e.key === "Escape") {
      if (overviewOpen) { setOverviewOpen(false); return; }
      if (activeIndex !== null) setActiveIndex(null);
    }
  }, [isIdle, navState.currentList.length, activeIndex, contributeOpen, overviewOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleSelect(index) {
    setActiveIndex(index);
    setOverviewOpen(false);
  }

  function handlePrev() {
    const len = navState.currentList.length;
    setActiveIndex((prev) => prev === null ? len - 1 : (prev - 1 + len) % len);
  }

  function handleNext() {
    const len = navState.currentList.length;
    setActiveIndex((prev) => prev === null ? 0 : (prev + 1) % len);
  }

  function handleExploreSubDomains() {
    if (activeIndex === null) return;
    const currentItem = navState.currentList[activeIndex];
    if (!currentItem.subDomains || currentItem.subDomains.length === 0) return;
    setLevelPath((prev) => [...prev, { index: activeIndex }]);
    setActiveIndex(null);
  }

  function handleBack() {
    if (levelPath.length === 0) return;
    const prevIndex = levelPath[levelPath.length - 1].index;
    setLevelPath((prev) => prev.slice(0, -1));
    setActiveIndex(prevIndex);
  }

  const selectedItem = activeIndex !== null ? navState.currentList[activeIndex] : null;
  const centreLabel = getCentreLabel();

  return (
    <div className={styles.app}>
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.header}>
        <p className={styles.eyebrow}>NEXTUS · THE SEVEN DOMAINS</p>
      </header>

      <main className={styles.main}>
        {/* Heptagon column */}
        <div className={styles.heptagonCol}>
          <div className={styles.heptagonWrapper}>
            <Heptagon
              domains={navState.currentList}
              activeIndex={activeIndex ?? 0}
              onSelect={handleSelect}
              isIdle={isIdle}
              centreLabel={centreLabel}
              onCentreClick={handleCentreClick}
            />
          </div>
        </div>

        {/* Panel column */}
        <div className={styles.panelCol}>

          {/* Overview Effect panel */}
          {overviewOpen && (
            <div className={`${styles.overviewPanel} ${overviewOpen ? styles.overviewVisible : ""}`}>
              <p className={styles.overviewEyebrow}>NEXTUS · OUR PLANET</p>
              <h2 className={styles.overviewTitle}>The Overview Effect</h2>
              <div className={styles.overviewDivider} />
              {OVERVIEW_TEXT.split("\n\n").map((para, i) => (
                <p key={i} className={styles.overviewBody}>{para}</p>
              ))}
              <p className={styles.overviewGoal}>{TOP_LEVEL_GOAL}</p>
              <button className={styles.overviewClose} onClick={() => setOverviewOpen(false)}>
                Close ×
              </button>
            </div>
          )}

          {/* Domain panel */}
          {!overviewOpen && !isIdle && selectedItem ? (
            <DomainPanel
              item={selectedItem}
              parentLabel={navState.parentLabel}
              breadcrumb={navState.breadcrumb.concat(selectedItem.name)}
              onExploreSubDomains={handleExploreSubDomains}
              onBack={levelPath.length > 0 ? handleBack : null}
              onContribute={() => setContributeOpen(true)}
              onPrev={handlePrev}
              onNext={handleNext}
              level={navState.level}
              isVisible={!isIdle}
            />
          ) : !overviewOpen && (
            <div className={styles.idlePanel}>
              <div className={styles.idleDivider} />
              <p className={styles.idleLabel}>
                {levelPath.length === 0
                  ? "Our Planet — seven domains of collective life"
                  : `${getCentreLabel()} — sub-domains`}
              </p>
              <ul className={styles.idleList}>
                {navState.currentList.map((d, i) => (
                  <li key={d.id}>
                    <button
                      className={styles.idleListItem}
                      onClick={() => handleSelect(i)}
                    >
                      <span className={styles.idleNum}>0{i + 1}</span>
                      <span>{d.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <ContributeModal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        domainName={selectedItem?.name ?? "this domain"}
      />
    </div>
  );
}
