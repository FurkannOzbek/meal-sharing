import styles from "./StarRating.module.css";

export default function StarRating({ rating, setRating }) {
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleStarClick(starValue)}
            style={{
              cursor: "pointer",
              color: starValue <= rating ? "#ffc107" : "#e4e5e9",
              fontSize: "3rem",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
