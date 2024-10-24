import styles from "./MealCard.module.css";
import { IoMdPeople } from "react-icons/io";
import StyledButton from "../StyledButton/StyledButton";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import StarRating from "../StarRating/StarRating.jsx";

export default function MealCard({
  title,
  description,
  price,
  location,
  max_reservation,
  img_url,
  id,
}) {
  const fetchReservationData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reservations/meal/${id}`)
      .then((response) => {
        const formattedData = response.data.totalReserved || 0;
        setTotalReservations(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching reservation data:", error);
      });
  };

  useEffect(() => {
    fetchReservationData();
  }, [id]);

  const [totalReservations, setTotalReservations] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showRatePop, setShowRatePop] = useState(false);
  const [contactName, setContactName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Rating state variables
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingTitle, setRatingTitle] = useState("");

  const spotsLeft = max_reservation - totalReservations;
  const handleNameInput = (e) => {
    setContactName(e.target.value);
  };
  const handleGuestNumberInput = (e) => {
    setNumberOfGuests(Number(e.target.value));
  };
  const handlePhoneInput = (e) => {
    let input = e.target.value;

    // Allow only numbers and the '+' character
    let sanitizedInput = input.replace(/[^0-9+]/g, "");

    // Check if the number starts with '+45' (for international numbers)
    if (sanitizedInput.startsWith("+45")) {
      // Limit to 11 characters total (+45 and 8 digits)
      if (sanitizedInput.length > 11) {
        sanitizedInput = sanitizedInput.slice(0, 11);
      }
    } else {
      // Limit to 8 digits for local Danish numbers
      if (sanitizedInput.length > 8) {
        sanitizedInput = sanitizedInput.slice(0, 8);
      }
    }

    setContactPhoneNumber(sanitizedInput);
  };
  const handleEmailInput = (e) => {
    setContactEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    axios
      .post(`${import.meta.env.VITE_API_URL}/reservations/add`, formData)
      .then((response) => {
        console.log("Reservation added successfully:", response.data);
        alert("Reservation added successfully!");
        fetchReservationData();
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
        alert("Error adding meal: " + error.response.data.error);
      });
  };

  const handleRatingCommentInput = (e) => {
    setRatingComment(e.target.value);
  };

  const handleRatingTitleInput = (e) => {
    setRatingTitle(e.target.value);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    setShowRatePop(false);

    axios
      .post(`${import.meta.env.VITE_API_URL}/reviews/add`, ratingData)
      .then((response) => {
        console.log("Rating added successfully:", response.data);
        alert("Rating added successfully!");
      })
      .catch((error) => {
        console.error("Error adding rating:", error);
        alert("Error adding rating: " + error.message);
      });
  };

  const formData = {
    contact_name: contactName,
    number_of_guests: numberOfGuests,
    contact_phonenumber: contactPhoneNumber,
    contact_email: contactEmail,
    meal_id: id,
  };

  const ratingData = {
    meal_id: id,
    stars: rating,
    description: ratingComment,
    title: ratingTitle,
  };

  const formatPhoneNumber = (phoneNumber) => {
    const sanitizedNumber = phoneNumber.replace(/\s+/g, "");

    // Local Danish number format: 12 34 56 78 (only 8 digits)
    if (/^\d{8}$/.test(sanitizedNumber)) {
      return sanitizedNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
    }

    // International Danish number format: +45 12 34 56 78
    if (/^\+45\d{8}$/.test(sanitizedNumber)) {
      return sanitizedNumber.replace(/(\+45)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
    }

    return phoneNumber; // Return unformatted if it's invalid
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.uClearfix}`}>
          <div className={styles.cardBody}>
            <div className={styles.row}>
              <IoMdPeople style={{ marginRight: "5px", verticalAlign: "middle" }} />
              <span className={`${styles.cardNumber} ${styles.subtle}`}>
                {spotsLeft >= 0 ? spotsLeft : "0"} spot{spotsLeft === 1 ? "" : "s"} left
              </span>
            </div>
            <span className={`${styles.cardAuthor} ${styles.subtle}`}>{location}</span>
            <h2 className={styles.cardTitle}>
              <a href={`/meals/${id}`}>{title}</a>
            </h2>
            <span className={`${styles.cardDescription} ${styles.subtle}`}>{description}</span>
          </div>
          <a href={`/meals/${id}`}>
            <img src={img_url} alt={title} className={styles.cardMedia} />
          </a>

          <div className="buttonsContainer">
            <div className={styles.container}>
              <StyledButton
                text={spotsLeft <= 0 ? "No spots left" : "Book Meal"}
                onClick={() => setShowPopup(true)}
                disabled={spotsLeft <= 0}
              />
              <StyledButton text="Rate Meal ★" onClick={() => setShowRatePop(true)} />
            </div>
          </div>
        </div>
        <div className={styles.cardShadow}></div>
      </div>

      {/* Popup form for booking */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <h2>Book Your Meal : {title}</h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <TextField
                onChange={handleNameInput}
                variant="filled"
                name="name"
                label="Your Name"
                value={contactName}
              />
              <TextField
                onChange={handleGuestNumberInput}
                variant="filled"
                name="number_of_guests"
                type="number"
                label="How many people"
                value={numberOfGuests}
                inputProps={{ min: 0, max: 20 }}
              />
              <TextField
                onChange={handlePhoneInput}
                variant="filled"
                name="phone"
                label="Contact Phone Number"
                value={formatPhoneNumber(contactPhoneNumber)}
              />
              <TextField
                onChange={handleEmailInput}
                variant="filled"
                name="email"
                label="Contact E-mail"
                value={contactEmail}
              />
              <div className={styles.bookButton}>
                <StyledButton text="Book Now" type="submit" className={styles.submitButton} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup form for rating */}
      {showRatePop && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowRatePop(false)}>
              &times;
            </button>
            <h2>Rate The Meal : {title}</h2>
            <form onSubmit={handleRatingSubmit} className={styles.form}>
              <StarRating rating={rating} setRating={setRating} />
              <TextField
                onChange={handleRatingTitleInput}
                variant="filled"
                name="title"
                label="Title"
                value={ratingTitle}
                multiline
              />
              <TextField
                onChange={handleRatingCommentInput}
                variant="filled"
                name="comment"
                label="Comments"
                value={ratingComment}
                multiline
                rows={4}
              />
              <div className={styles.bookButton}>
                <StyledButton text="Submit Rating" type="submit" className={styles.submitButton} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
