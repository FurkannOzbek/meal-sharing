import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import styles from "./About.module.css";
import image from "../src/assets/spices.jpg";

export default function About() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.heroSection}>
        <img className={styles.backgroundImage} src={image} alt="About Us Background" />
        <div className={styles.gridOverlay}>
          {/* First Section - Top Left */}
          <div className={styles.section}>
            <h3 className={styles.header}>Our Path to Sharing Meals</h3>
            <p className={styles.text}>
              At [Your App Name], we believe that food is more than just nourishment—it’s a powerful
              way to connect people, share cultures, and create memories. From our humble
              beginnings, we set out with a vision to transform the way people experience dining by
              bringing together hosts and guests in unique, home-based settings.
            </p>
          </div>

          {/* Second Section - Top Right */}
          <div className={styles.section}>
            <h3 className={styles.header}>Connecting Through Meals</h3>
            <p className={styles.text}>
              Our platform empowers individuals to open their homes and kitchens, sharing their
              culinary skills and personal stories with guests from all walks of life. Whether
              you're a foodie seeking new flavors, a traveler looking for an authentic local
              experience, or a passionate home cook eager to showcase your dishes, [Your App Name]
              bridges the gap, making every meal an opportunity to connect.
            </p>
          </div>

          {/* Third Section - Bottom Left */}
          <div className={styles.section}>
            <h3 className={styles.header}>Building a Global Community</h3>
            <p className={styles.text}>
              We’re not just a meal-sharing app—we’re a community of people who love food, culture,
              and conversation. By hosting or attending meals, our users become part of a global
              network that celebrates diversity, fosters new friendships, and supports a more
              sustainable way of dining.
            </p>
          </div>

          {/* Fourth Section - Bottom Right */}
          <div className={styles.section}>
            <h3 className={styles.header}>Join Us on This Journey</h3>
            <p className={styles.text}>
              Whether you're a host or a guest, we invite you to be part of this incredible journey.
              Discover new tastes, make lasting connections, and share in the joy of a good meal.
              Together, we’re redefining what it means to dine.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
