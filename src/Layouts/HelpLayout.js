import { NavLink, Outlet } from "react-router-dom";
import styles from "../CSS/HelpLayout.module.css";

export default function HelpLayout() {
  return (
    <div className="help-layout">

      <h2>Website Help</h2>
      <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quas debitis quibusdam deserunt repellat hic molestias ipsum commodi aut odit!</p>

      <nav>
        <NavLink to="faq">View the FAQ</NavLink>
        <NavLink to="contact">Contact Us</NavLink>
      </nav>

      <Outlet />

    </div>
  )
}

/* export default function HelpLayout() {
  return (
    <div className={styles.helpLayout}>
      <h2>Website Help</h2>
      <p className="paragraph">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quas
        debitis quibusdam deserunt repellat hic molestias ipsum commodi aut
        odit!
      </p>

      <nav className={styles.nav}>
        <NavLink to="faq" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>View the FAQ</NavLink>
        <NavLink to="contact" className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}>Contact Us</NavLink>
      </nav>
     
      <Outlet />
    </div>
  );
} */
