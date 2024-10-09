import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MealsList from "../../components/MealsList/MealsList";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Meals.module.css";

export default function Meals() {
  const url = `${import.meta.env.VITE_API_URL}/meals`;

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
          id: meal.id,
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

      <MealsList meals={meals} />
      <Footer></Footer>
    </>
  );
}
