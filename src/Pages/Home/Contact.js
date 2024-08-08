import React from "react";
import styles from "../../CSS/Contact.module.css";

export default function Contact() {
  return (
    <div className="body">
      <h3>Contact Us</h3>
      <form className="contact-form">
        <label>
          <span>Your email:</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Your message:</span>
          <textarea name="message" required></textarea>
        </label>
        <button className="btn-contact">Submit</button>
      </form>
    </div>
  );
}

/* export default function Contact() {
  return (
    <div className={styles.contact}>
      <h3>Contact Us</h3>
      <form className={styles.form}>
        <label>
          <span className={styles.labelSpan}>Your email:</span>
          <input
            type="email"
            name="email"
            required
            className={styles.input}
          />
        </label>
        <label>
          <span className={styles.labelSpan}>Your message:</span>
          <textarea
            name="message"
            required
            className={styles.textarea}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
} */