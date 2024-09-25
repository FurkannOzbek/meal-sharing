import React, { useEffect } from "react";
import hyfLogo from "../../assets/hyf.svg";
import MealsList from "../MealsList/MealsList";
import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Parallax, Background } from "react-parallax";
import image from "../../assets/food.jpg";
import styles from "./HomePage.module.css";

function HomePage() {
  const url = "http://localhost:3001/api/all-meals";

  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();

        const formattedMeals = jsonData.map((meal) => ({
          max_reservation: meal.max_reservations,
          location: meal.location,
          title: meal.title,
          description: meal.description,
          price: meal.price,
          img_url: meal.img_url,
        }));

        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header> </Header>
      <Parallax bgImage={image} strength={200}>
        <div style={{ height: 700 }}>
          <div className={styles.parallaxContent}></div>
        </div>
      </Parallax>

      <MealsList meals={meals} />
      <Footer></Footer>
    </>
  );
}

export default HomePage;
