import { NavLink } from "react-router-dom";
import styles from "../../CSS/NotFound.module.css";

export default function NotFound() {
  return (
    <div className="body">
      <h2>Page not found!</h2>
      <p className="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias
        cupiditate ad nostrum doloribus iste tempora quisquam excepturi
        repellat, fugit cumque dolore magni possimus inventore neque provident!
        Sunt, quo eos?
      </p>

      <p className="paragraph">
        Go to the <NavLink to="/">Homepage</NavLink>.
      </p>
    </div>
  );
}

/* export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h2>Page not found!</h2>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias
        cupiditate ad nostrum doloribus iste tempora quisquam excepturi
        repellat, fugit cumque dolore magni possimus inventore neque provident!
        Sunt, quo eos?
      </p>

      <p className={styles.paragraph}>
        Go to the <NavLink to="/">Homepage</NavLink>.
      </p>
    </div>
  );
} */
