import styles from "./MealCard.module.css";
import { IoMdPeople } from "react-icons/io";
import StyledButton from "../StyledButton/StyledButton";

export default function MealCard({
  title,
  description,
  price,
  location,
  max_reservation,
  img_url,
}) {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.uClearfix}`}>
          <div className="test">
            <div className={styles.cardBody}>
              <IoMdPeople style={{ marginRight: "5px", verticalAlign: "middle" }} />{" "}
              <span className={`${styles.cardNumber} ${styles.cardCircle} ${styles.subtle}`}>
                {max_reservation}
              </span>
              <span className={`${styles.cardAuthor} ${styles.subtle}`}> {location}</span>
              <h2 className={styles.cardTitle}>{title}</h2>
              <span className={`${styles.cardDescription} ${styles.subtle}`}>{description}</span>
            </div>
            <img src={img_url} alt="" className={styles.cardMedia} />
          </div>
          <div className="test2">
            <div className={styles.container}>
              <StyledButton text="Book Meal" />
              <StyledButton text="Rate Meal ★" />
            </div>
          </div>
        </div>
        <div className={styles.cardShadow}></div>
      </div>
    </>
  );
}
