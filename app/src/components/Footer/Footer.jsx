import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <h2>Meal Sharing</h2>
        </div>
        <div className={styles.footerLinks}>
          <ul>
            <li>See All Meals</li>
            <li>Post A Review</li>
            <li>See Comments About Meals</li>
          </ul>
          <ul>
            <li>Be Host</li>
            <li>Book Reservation</li>
          </ul>

          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Affiliates</li>
            <li>Resources</li>
          </ul>
        </div>
        <div className={styles.footerDivider}></div>
        <div className={styles.footerSocial}>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>

          <a href="#">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="#">
            <i className="fab fa-flickr"></i>
          </a>
        </div>
        <p className={styles.footerCopyright}>&copy; Furkan Özbek 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}
