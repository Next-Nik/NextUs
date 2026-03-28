import { useEffect, useRef, useState } from "react";
import styles from "./ContributeModal.module.css";

const PATHS = [
  {
    id: "horizon-goal",
    label: "Contribute a Horizon Goal",
    description: "You have demonstrated expertise in this domain. Help shape what thriving looks like at subdomain or field level.",
    emailSubject: (domain) => `Horizon Goal Contribution: ${domain}`,
    emailBody: (domain, userData) =>
      `I would like to contribute to the Horizon Goal process for ${domain}.\n\nMy domain expertise: \nMy relevant work: \n\n${userData ? `Purpose Piece: ${userData.archetype} in ${userData.domain} at ${userData.scale} scale.` : ""}`,
  },
  {
    id: "submit-actor",
    label: "Submit an actor",
    description: "Know an organisation, project, or community group doing significant work in this domain? Add them to the map.",
    emailSubject: (domain) => `Actor Submission: ${domain}`,
    emailBody: (domain, userData) =>
      `I would like to submit an actor for the ${domain} domain.\n\nOrganisation name: \nWhat they do: \nURL: \nScale: \nWhy they belong on the map: \n\n${userData ? `Purpose Piece: ${userData.archetype} in ${userData.domain} at ${userData.scale} scale.` : ""}`,
  },
  {
    id: "da-session",
    label: "Join a Decision Analytics session",
    description: "Participate in evaluating approaches in your domain. Help build the Standards of Excellence that determine best practice.",
    emailSubject: (domain) => `Decision Analytics Interest: ${domain}`,
    emailBody: (domain, userData) =>
      `I am interested in participating in a Decision Analytics session for the ${domain} domain.\n\nMy domain expertise: \nMy relevant work: \n\n${userData ? `Purpose Piece: ${userData.archetype} in ${userData.domain} at ${userData.scale} scale.` : ""}`,
  },
];

export default function ContributeModal({ isOpen, onClose, domainName, userData }) {
  const overlayRef = useRef(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPath(null);
      setEmail("");
    }
  }, [isOpen]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedPath || !email) return;
    const path = PATHS.find(p => p.id === selectedPath);
    if (!path) return;
    window.location.href = `mailto:hello@nextus.world?subject=${encodeURIComponent(path.emailSubject(domainName))}&body=${encodeURIComponent(path.emailBody(domainName, userData) + `\n\nEmail: ${email}`)}`;
  }

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label="Contribute to this domain"
    >
      <div className={`${styles.modal} ${isOpen ? styles.modalOpen : ""}`}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>

        <p className={styles.eyebrow}>NEXTUS · CONTRIBUTE</p>

        <h2 className={styles.title}>
          {domainName}<br />
          <em>— your entry point</em>
        </h2>

        <div className={styles.divider} />

        {/* Purpose Piece context */}
        {userData && (
          <div className={styles.ppContext}>
            <span className={styles.ppContextDot} />
            <p className={styles.ppContextText}>
              {userData.archetype} · {userData.domain} · {userData.scale} scale
            </p>
          </div>
        )}

        <p className={styles.body}>
          Contribution to NextUs is earned through demonstrated domain expertise, not just interest. Choose the path that fits where you are.
        </p>

        {/* Three paths */}
        <div className={styles.paths}>
          {PATHS.map(path => (
            <label
              key={path.id}
              className={`${styles.pathOption} ${selectedPath === path.id ? styles.pathSelected : ""}`}
            >
              <input
                type="radio"
                name="contributePath"
                value={path.id}
                checked={selectedPath === path.id}
                onChange={() => setSelectedPath(path.id)}
              />
              <div>
                <strong>{path.label}</strong>
                <span>{path.description}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Email */}
        {selectedPath && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="contribute-email">Your email</label>
            <div className={styles.inputRow}>
              <input
                id="contribute-email"
                type="email"
                className={styles.input}
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Express interest →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
