
import styles from './MealsList.module.css';
import MealCard from '../MealCard/MealCard';
import { useState } from 'react';

export default function MealsList({ meals }) {
  const [visibleCount, setVisibleCount] = useState(4); // State to control the number of visible items

  // Handler to show more items when "See More" is clicked
  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className={styles.list}>
      <h1 className={styles.title}>Meals List</h1>
      <div className={styles.gridContainer}>
        {meals.slice(0, visibleCount).map((meal, index) => (
          <MealCard
            key={index}
            max_reservation={meal.max_reservation}
            location={meal.location}
            title={meal.title}
            description={meal.description}
            price={meal.price}
            img_url={meal.img_url}
          />
        ))}
      </div>

      {/* Show the "See More" button only if there are more items to show */}
      {visibleCount < meals.length && (
        <div className={styles.buttonContainer}>
          <button onClick={handleSeeMore} className={styles.seeMoreButton}>
            See More
            
            <span class={styles.arrow}>↓</span>
          </button>
        </div>
      )}
    </div>
  );
}