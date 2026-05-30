import styles from "./PageLoader.module.scss";

export default function PageLoader() {
  return (
    <div
      className={styles.wrap}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner} />
      <span className={styles.text}>Loading…</span>
    </div>
  );
}
