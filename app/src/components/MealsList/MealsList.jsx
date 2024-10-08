import styles from "./MealsList.module.css";
import MealCard from "../MealCard/MealCard";
import { useState, useEffect } from "react";
import StyledButton from "../StyledButton/StyledButton";
import { TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function MealsList({ meals }) {
  const [visibleCount, setVisibleCount] = useState(4); // State to control the number of visible items
  const [searchInput, setSearchInput] = useState("");
  const [sortKey, setSortKey] = useState("title"); // Default sort by title
  const [sortDir, setSortDir] = useState("asc"); // Default sort direction: ascending

  // Handle search input change
  function handleSearchInputChange(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  // Handle sort key change
  function handleSortKeyChange(e) {
    setSortKey(e.target.value);
  }

  // Handle sort direction change
  function handleSortDirChange(e) {
    setSortDir(e.target.value);
  }

  // Handler to show more items when "See More" is clicked
  const handleSeeMore = (e) => {
    e.preventDefault();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Sort meals based on sortKey and sortDir
  const sortedMeals = meals
    .filter(
      (meal) => meal.title.toLowerCase().includes(searchInput) // Filter meals based on search input
    )
    .sort((a, b) => {
      if (sortDir === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

  return (
    <section id="meals-section">
      <div className={styles.list}>
        <h1 className={styles.title}>Meals List</h1>

        <div className={styles.controls}>
          {/* Search Input */}
          <TextField
            id="outlined-basic"
            value={searchInput}
            label="Search Meal"
            variant="outlined"
            onChange={handleSearchInputChange}
            className={styles.searchArea}
          />

          {/* Sort Key Dropdown */}
          <FormControl className={styles.formControl} variant="filled">
            <InputLabel id="sortKey-label">Sort By</InputLabel>
            <Select labelId="sortKey-label" value={sortKey} onChange={handleSortKeyChange}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="location">Location</MenuItem>
            </Select>
          </FormControl>

          {/* Sort Direction Dropdown */}
          <FormControl className={styles.formControl} variant="filled">
            <InputLabel id="sortDir-label">Sort Direction</InputLabel>
            <Select labelId="sortDir-label" value={sortDir} onChange={handleSortDirChange}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Meals Grid */}
        <div className={styles.gridContainer}>
          {sortedMeals.slice(0, visibleCount).map((meal, index) => (
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
        {visibleCount < sortedMeals.length && (
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
