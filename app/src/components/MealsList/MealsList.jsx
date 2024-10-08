import styles from "./MealsList.module.css";
import MealCard from "../MealCard/MealCard";
import { useState } from "react";
import StyledButton from "../StyledButton/StyledButton";
import { TextField } from "@mui/material";

export default function MealsList({ meals }) {
  const [visibleCount, setVisibleCount] = useState(4); // State to control the number of visible items
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  }

  // Filter meals based on the search input
  const filteredMeals = meals.filter(
    (meal) => meal.title.toLowerCase().includes(searchInput) // Check if meal title includes the search input
  );

  // Handler to show more items when "See More" is clicked
  const handleSeeMore = (e) => {
    e.preventDefault();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <section id="meals-section">
      <div className={styles.list}>
        <h1 className={styles.title}>Meals List</h1>
        <TextField
          id="outlined-basic"
          value={searchInput}
          label="Search Meal"
          variant="outlined"
          onChange={handleSearchInputChange}
          className={styles.searchArea}
        />

        <div className={styles.gridContainer}>
          {filteredMeals.slice(0, visibleCount).map((meal, index) => (
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
        {visibleCount < filteredMeals.length && (
          <div className={styles.buttonContainer}>
            <StyledButton onClick={handleSeeMore} className={styles.seeMoreButton} text="See More">
              {" "}
              <span className={styles.arrow}>↓</span>{" "}
            </StyledButton>
          </div>
        )}
      </div>
    </section>
  );
}
