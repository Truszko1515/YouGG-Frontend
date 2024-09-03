import React, { useState } from "react";
import emailjs from 'emailjs-com';
import styles from "../../CSS/Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // EmailJS configuration
    emailjs.send('service_t4w2adt', 'template_yyyyr9o', {
      from_email: formData.email,
      message: formData.message,
    }, 'rzpxzlcc5elV-4mV1')
      .then((result) => {
        console.log(result.text);
        setStatus('Message sent successfully!');
        setFormData({
          email: '',
          message: '',
        });
      }, (error) => {
        console.log(error.text);
        setStatus('Failed to send message.');
      });
  };

  return (
    <div className={styles.body}>
      <h3>Contact Us</h3><br></br>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label>
          <span>Your email:</span>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </label>
        <label>
          <span>Your message:</span>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button className={styles.btnContact} type="submit">Submit</button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}
