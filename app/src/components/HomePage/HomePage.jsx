import React, { useEffect } from "react";
import hyfLogo from "../../assets/hyf.svg";
import "./HomePage.css";
import MealsList from "../MealsList/MealsList";
import { useState } from "react";






function HomePage() {

  const url = "http://localhost:3001/api/all-meals"

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
          img_url : meal.img_url,               
        }));
       
        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error fetching meals data:", error); 
      }
      
    }
  fetchData()}, []);
  
  return (
    <>
      <MealsList meals = {meals}/>
    </>
  );
}

export default HomePage;
