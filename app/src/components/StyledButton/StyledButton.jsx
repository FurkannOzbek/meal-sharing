import styles from "./StyledButton.module.css";

export default function StyledButton({ text, onClick, disabled }) {
  return (
    <>
      <button className={`${styles.button} ${styles.typeC} `} onClick={onClick} disabled={disabled}>
        <div className={styles.buttonLine}></div>
        <div className={styles.buttonLine}></div>
        <span className={styles.buttonText}>{text}</span>
      </button>
    </>
  );
}
