import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import { useState } from "react";
import image from "../src/assets/spices.jpg";
import styles from "./BeHost.module.css"; // Ensure correct import of CSS module
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import InputAdornment from "@mui/material/InputAdornment";
import StyledButton from "../src/components/StyledButton/StyledButton";
import axios from "axios"; // Import Axios

export default function BeHost() {
  const [price, setPrice] = useState("");
  const [foodTitle, setFoodTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxRes, setMaxRes] = useState("");
  const [date, setDate] = useState(null);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  function handleNameInput(e) {
    setFoodTitle(e.target.value);
  }
  function handlePriceInput(e) {
    const newValue = e.target.value.replace(/\D/g, "");
    setPrice(newValue);
  }
  function handleLocationInput(e) {
    setLocation(e.target.value);
  }
  function handleMaxResInput(e) {
    let newValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(newValue, 10);
    if ((numericValue >= 1 && numericValue <= 20) || newValue === "") {
      setMaxRes(newValue);
    }
  }
  function handleDateInput(newDate) {
    setDate(newDate);
  }
  function handleDescInput(e) {
    if (e.target.value.length <= 160) {
      setDesc(e.target.value);
    }
  }
  function handleImgInput(e) {
    setImg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare the data to be sent to the backend
    const formData = {
      title: foodTitle,
      description: desc,
      location: location,
      when: date,
      max_reservations: maxRes,
      price: price,
      img_url: img,
    };

    // Send a POST request to backend API
    axios
      .post("http://localhost:3001/api/meals/add", formData)
      .then((response) => {
        console.log("Meal added successfully:", response.data);
        alert("Meal added successfully!"); // Optional: alert the user or redirect
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
        alert("Error adding meal: " + error.message); // Display an error message
      });
  }

  return (
    <div className={styles.container}>
      <Header />
      <img className={styles.beHostImage} src={image} alt="Spices" />
      <div className={styles.formContainer}>
        <form className={styles.form}>
          {/* Left Section for Information */}
          <div className={styles.leftSection}>
            <h2>Become a Host</h2>
            <p>
              Hosting with us opens doors to a world of opportunities. As a host, you'll have the
              chance to:
            </p>
            <ul className={styles.benefitsList}>
              <li>
                🛋️ <strong>Earn Extra Income</strong>: Monetize your space by welcoming guests from
                around the globe.
              </li>
              <li>
                🌐 <strong>Connect Globally</strong>: Meet people from different cultures and build
                lasting relationships.
              </li>
              <li>
                🏠 <strong>Flexible Hosting</strong>: Host on your terms – you decide when and how
                often to welcome guests.
              </li>
            </ul>
            <div className={styles.calloutBox}>
              <h4>“Hospitality isn’t just a job; it’s a way of making people feel at home.”</h4>
            </div>
            <p>
              Ready to get started? Simply fill out the form on the right to become a host. Share a
              few details about your food, set your availability, and you’re on your way!
            </p>
            <p>
              Your journey to becoming a host starts here. Join our community today and make every
              guest experience memorable.
            </p>
          </div>

          {/* Right Section for Form Inputs */}
          <div className={styles.rightSection}>
            <h3>Host Details</h3>

            {/* First line: Food Title and Price */}
            <div className={styles.inlineFields}>
              <TextField
                fullWidth
                label="Food Title"
                variant="filled"
                value={foodTitle}
                onChange={handleNameInput}
                sx={{
                  input: { backgroundColor: "#f0f0f0" },
                }}
              />
              <TextField
                fullWidth
                label="Max Reservation (1-20)"
                variant="filled"
                value={maxRes}
                onChange={handleMaxResInput}
                className={styles.maxReservationField}
                sx={{
                  input: { backgroundColor: "#f0f0f0" },
                }}
              />
            </div>

            {/* Second line: Location and Max Reservation */}
            <div className={styles.inlineFields2}>
              <TextField
                fullWidth
                value={location}
                onChange={handleLocationInput}
                label="Location"
                variant="filled"
                className={styles.locationField2}
                sx={{
                  input: { backgroundColor: "#f0f0f0" },
                }}
              />
              <TextField
                fullWidth
                label="Price"
                variant="filled"
                value={price}
                onChange={handlePriceInput}
                InputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",

                  endAdornment: <InputAdornment position="end">DKK</InputAdornment>,
                }}
                sx={{
                  input: { backgroundColor: "#f0f0f0" },
                  // Hide endAdornment when the screen width is less than 768px
                  "& .MuiInputAdornment-root": {
                    "@media (max-width: 768px)": {
                      display: "none",
                    },
                  },
                }}
              />
            </div>

            {/* Third line: Price and Date */}
            <div className={styles.inlineFields}>
              <TextField
                fullWidth
                label="Image Url"
                variant="filled"
                value={img}
                onChange={handleImgInput}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{
                  input: { backgroundColor: "#f0f0f0" },
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    label="Date"
                    variant="filled"
                    value={date}
                    onChange={handleDateInput}
                    fullWidth
                    sx={{ backgroundColor: "#f0f0f0" }}
                    InputProps={{
                      sx: {
                        padding: "0px",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {/* Fourth line: Description */}
            <TextField
              fullWidth
              label="Description"
              variant="filled"
              multiline
              value={desc}
              onChange={handleDescInput}
              rows={4}
              inputProps={{
                maxLength: 160,
              }}
              helperText={`${desc.length}/160 characters`}
              sx={{
                "& .MuiInputBase-input": {
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiFilledInput-root": {
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiFilledInput-root:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiFilledInput-root.Mui-focused": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
            <div className={styles.buttonContainer}>
              <StyledButton
                text="Submit"
                onClick={handleSubmit}
                className={styles.submitButton}
                type="submit"
              ></StyledButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
