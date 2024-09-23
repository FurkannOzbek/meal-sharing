import styles from './MealsList.module.css';
import MealCard from '../MealCard/MealCard';
export default function MealsList() {
    return <div className={styles.list}> <h1 className={styles.title}>Meals List</h1> 
    <div className={styles.gridContainer}> <MealCard/></div>
    </div>
}