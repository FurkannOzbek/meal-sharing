import styles from "./MealsList.module.css";
import MealCard from "../MealCard/MealCard";
import { useState } from "react";
import StyledButton from "../StyledButton/StyledButton";

export default function MealsList({ meals }) {
  const [visibleCount, setVisibleCount] = useState(4); // State to control the number of visible items

  // Handler to show more items when "See More" is clicked
  const handleSeeMore = (e) => {
    e.preventDefault();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <section id="meals-section">
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
              id={meal.id}
            />
          ))}
        </div>

        {/* Show the "See More" button only if there are more items to show */}
        {visibleCount < meals.length && (
          <div className={styles.buttonContainer}>
            <StyledButton onClick={handleSeeMore} className={styles.seeMoreButton} text="See More">
              {" "}
              <span class={styles.arrow}>↓</span>{" "}
            </StyledButton>
          </div>
        )}
      </div>
    </section>
  );
}
