import { useState, useEffect, useCallback } from "react";
import Heptagon from "./Heptagon";
import DomainPanel from "./DomainPanel";
import ContributeModal from "./ContributeModal";
import { domains, TOP_LEVEL_GOAL } from "./data";
import styles from "./App.module.css";

export default function App() {
  // Navigation state
  const [activeIndex, setActiveIndex] = useState(null); // null = idle/all visible
  const [levelPath, setLevelPath] = useState([]); // array of { domainIndex, subIndex } for drill-down
  const [contributeOpen, setContributeOpen] = useState(false);

  const isIdle = activeIndex === null;

  // Derive current domain list and selected item based on levelPath
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

    // The current list is the subDomains of the last item in levelPath except the innermost
    const lastEntry = levelPath[levelPath.length - 1];
    const parentItem = levelPath.length > 1
      ? getItemAtPath(levelPath.slice(0, -1))
      : null;
    const currentList = levelPath.length === 1
      ? domains[levelPath[0].index].subDomains
      : getItemAtPath(levelPath.slice(0, -1)).subDomains;

    return {
      currentList,
      selectedItem: activeIndex !== null ? currentList[activeIndex] : null,
      breadcrumb,
      level: levelPath.length,
      parentLabel: levelPath.length > 0 ? getItemAtPath(levelPath.slice(0, -1))?.name ?? "NextUs" : "NextUs",
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

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (contributeOpen) return;

      const len = navState.currentList.length;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isIdle) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => (prev + 1) % len);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isIdle) {
          setActiveIndex(len - 1);
        } else {
          setActiveIndex((prev) => (prev - 1 + len) % len);
        }
      } else if (e.key === "Escape") {
        if (activeIndex !== null) {
          setActiveIndex(null);
        }
      }
    },
    [isIdle, navState.currentList.length, activeIndex, contributeOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleSelect(index) {
    setActiveIndex(index);
  }

  function handlePrev() {
    const len = navState.currentList.length;
    if (isIdle) {
      setActiveIndex(len - 1);
    } else {
      setActiveIndex((prev) => (prev - 1 + len) % len);
    }
  }

  function handleNext() {
    const len = navState.currentList.length;
    if (isIdle) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => (prev + 1) % len);
    }
  }

  function handleExploreSubDomains() {
    if (activeIndex === null) return;
    const currentItem = navState.currentList[activeIndex];
    if (!currentItem.subDomains || currentItem.subDomains.length === 0) return;

    // Push current selection onto path
    setLevelPath((prev) => [...prev, { index: activeIndex }]);
    setActiveIndex(null); // reset to idle at new level
  }

  function handleBack() {
    if (levelPath.length === 0) return;
    const newPath = levelPath.slice(0, -1);
    const prevIndex = levelPath[levelPath.length - 1].index;
    setLevelPath(newPath);
    setActiveIndex(prevIndex); // return to the parent item that was selected
  }

  function handleIdleClick() {
    setActiveIndex(null);
    if (levelPath.length === 0) return;
  }

  const selectedItem = activeIndex !== null ? navState.currentList[activeIndex] : null;

  return (
    <div className={styles.app}>
      {/* Subtle grain texture overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Header */}
      <header className={styles.header}>
        <p className={styles.eyebrow}>NEXTUS · THE SEVEN DOMAINS</p>
      </header>

      <main className={styles.main}>
        {/* Left / Heptagon column */}
        <div className={styles.heptagonCol}>
          {/* Centre text inside heptagon — positioned absolutely over SVG */}
          <div className={styles.heptagonWrapper}>
            <Heptagon
              domains={navState.currentList}
              activeIndex={activeIndex ?? 0}
              onSelect={handleSelect}
              isIdle={isIdle}
            />

            {/* Centre overlay */}
            <div
              className={`${styles.centre} ${isIdle ? styles.centreIdle : styles.centreDomain}`}
              onClick={isIdle ? undefined : () => setActiveIndex(null)}
            >
              {isIdle ? (
                <p className={styles.centreGoal}>{TOP_LEVEL_GOAL}</p>
              ) : (
                <p className={styles.centreActive}>
                  {navState.currentList[activeIndex]?.name}
                </p>
              )}
            </div>
          </div>

          {/* Idle instruction */}
          {isIdle && (
            <p className={styles.instruction}>
              Click any domain — or let it land
            </p>
          )}
        </div>

        {/* Right / Panel column */}
        <div className={styles.panelCol}>
          {!isIdle && selectedItem ? (
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
          ) : (
            <div className={styles.idlePanel}>
              <div className={styles.idleDivider} />
              <p className={styles.idleLabel}>Seven domains of collective life</p>
              <ul className={styles.idleList}>
                {domains.map((d, i) => (
                  <li key={d.id}>
                    <button
                      className={styles.idleListItem}
                      onClick={() => {
                        if (levelPath.length > 0) {
                          setLevelPath([]);
                        }
                        setActiveIndex(i);
                      }}
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
