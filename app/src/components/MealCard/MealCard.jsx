import styles from "./MealCard.module.css"
import { IoMdPeople } from "react-icons/io";

export default function MealCard(){

    return (<><div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.uClearfix}`}>
          <div className={styles.cardBody}>
          <IoMdPeople style={{ marginRight: '5px', verticalAlign: 'middle' }} /> <span className={`${styles.cardNumber} ${styles.cardCircle} ${styles.subtle}`}>01</span>
            <span className={`${styles.cardAuthor} ${styles.subtle}`}> Country</span>
            <h2 className={styles.cardTitle}>Food Title</h2>
            <span className={`${styles.cardDescription} ${styles.subtle}`}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</span>
            <div className={styles.cardRead}>Price$</div>
          
          </div>
          <img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" alt="" className={styles.cardMedia} />
        </div>
        <div className={styles.cardShadow}></div>
      </div>
  <div className={styles.cardContainer}>
    <div className={`${styles.card} ${styles.uClearfix}`}>
      <div className={styles.cardBody}>
      <IoMdPeople style={{ marginRight: '5px', verticalAlign: 'middle' }} /> <span className={`${styles.cardNumber} ${styles.cardCircle} ${styles.subtle}`}>01</span>
        <span className={`${styles.cardAuthor} ${styles.subtle}`}>Country</span>
        <h2 className={styles.cardTitle}>Food Title</h2>
        <span className={`${styles.cardDescription} ${styles.subtle}`}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</span>
        <div className={styles.cardRead}>Price$</div>
      
      </div>
      <img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" alt="" className={styles.cardMedia} />
    </div>
    <div className={styles.cardShadow}></div>
  </div>

    </>)
}



