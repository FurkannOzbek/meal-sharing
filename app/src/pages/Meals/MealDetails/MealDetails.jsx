import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../../../components/MealCard/MealCard";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "./MealDetails.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./MealDetails.module.css";

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentDatas, setCommentDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meals/${id}`);
        const jsonData = await response.json();
        setMeal(jsonData[0]);

        const responseComment = await fetch(`http://localhost:3001/api/reviews/meal/${id}`);
        const jsonCommentDatas = await responseComment.json();

        setCommentDatas(Array.isArray(jsonCommentDatas) ? jsonCommentDatas : []);
      } catch (error) {
        console.error("Error fetching meals data:", error);
        setCommentDatas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(maxStars - rating);
    return (
      <span className={styles.stars}>
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  if (loading) return <p>Loading...</p>;

  if (!meal) return <p>Meal not found.</p>;

  const maxReservation = meal.max_reservations || 0;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  // Group comments in sets of 3
  const groupedComments = [];
  for (let i = 0; i < commentDatas.length; i += 3) {
    groupedComments.push(commentDatas.slice(i, i + 3));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.cardWithComments}>
          {/* Meal Card Section */}
          <div className={styles.mealCardSection}>
            <MealCard
              key={meal.id}
              max_reservation={maxReservation}
              location={meal.location}
              title={meal.title}
              description={meal.description}
              price={meal.price}
              img_url={meal.img_url}
              id={meal.id}
            />
          </div>

          {/* Comment Slider Section */}
          <div className={styles.commentSection}>
            {commentDatas.length === 0 ? (
              <p>No comments available</p>
            ) : (
              <div className={styles.sliderContainer}>
                <Slider {...sliderSettings}>
                  {groupedComments.map((commentGroup, index) => (
                    <div key={index} className={styles.commentGroup}>
                      {commentGroup.map((commentData) => (
                        <div key={commentData.id} className={styles.commentCard}>
                          <p>{commentData.title}</p>
                          <p>{commentData.description}</p>
                          <p>{renderStars(commentData.stars)}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
