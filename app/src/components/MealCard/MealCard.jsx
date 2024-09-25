import styles from "./MealCard.module.css"
import { IoMdPeople } from "react-icons/io";


export default function MealCard({ title, description, price, location, max_reservation, img_url}){

 

    return (<><div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.uClearfix}`}>
          <div className={styles.cardBody}>
          <IoMdPeople style={{ marginRight: '5px', verticalAlign: 'middle' }} /> <span className={`${styles.cardNumber} ${styles.cardCircle} ${styles.subtle}`}>{max_reservation}</span>
            <span className={`${styles.cardAuthor} ${styles.subtle}`}> {location}</span>
            <h2 className={styles.cardTitle}>{title}</h2>
            <span className={`${styles.cardDescription} ${styles.subtle}`}>{description}</span>
            <div className={styles.cardRead}>{price}</div>
          
          </div>
          <img src={img_url} alt="" className={styles.cardMedia} />
        </div>
        <div className={styles.cardShadow}></div>
      </div>
  

    </>)
}



