import styles from "./StyledButton.module.css";

export default function StyledButton({ text, onClick }) {
  return (
    <>
      <a href="#" className={`${styles.button} ${styles.typeC} `} onClick={onClick}>
        <div className={styles.buttonLine}></div>
        <div className={styles.buttonLine}></div>
        <span className={styles.buttonText}>{text}</span>
      </a>
    </>
  );
}
