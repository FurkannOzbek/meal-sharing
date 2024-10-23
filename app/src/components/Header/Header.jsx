// Header.js
import styles from "./Header.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        {" "}
        <a href="/">Meal Sharing</a>
      </div>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItems}>
          Home
        </a>
        <a href="/meals" className={styles.navItems}>
          Meals
        </a>
        <a href="/behost" className={styles.navItems}>
          Be Host
        </a>
        <a href="/about" className={styles.navItems}>
          About
        </a>
      </nav>
      {/* Ensure hamburger toggles open class */}
      <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Ensure mobile navigation toggles open class */}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`}>
        <a href="#">Home</a>
        <a href="#">Meals</a>
        <a href="#">Be Host</a>
        <a href="#">About</a>
      </nav>
    </header>
  );
}
